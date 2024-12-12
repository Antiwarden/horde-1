/**
*	@filename	Party.js
*	@author		Adpist
*	@desc		Party management and syncro
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var Party = {
	lowestAct: 0,
	invalidParty: 65535,

	init: function () {
		this.lowestAct = 0;
	},

	leaveParty: function () {
		getScript("tools/Party.js").pause(); // Pausing Party thread

		let player = getParty();

		if (player) {
			let myParty = player.partyid;

			if (myParty !== this.invalidParty) {
				clickParty(player, 3);
				delay(me.ping * 2 + 250);
			}
		}
	},

	joinHordeParty: function () {
		getScript("tools/Party.js").resume(); // Resume Party thread

		let player = getParty();

		if (player) {
			let myParty = player.partyid;

			if (myParty === this.invalidParty) {
				while (player.getNext()) {
					if (HordeSystem.isTeammate(player.name)) {
						if (player.partyflag === 2) {
							clickParty(player, 2);
							delay(me.ping * 2 + 250);
							
							if (getParty().partyid !== this.invalidParty) {
								return true;
							}
						}
					}
				}
			}

			if (getParty().partyid !== this.invalidParty) return true;
		}

		return false;
	},

	findPartyMember: function (profile) {
		let player = getParty();
		let playerCharName = HordeSystem.team.profiles[profile].character;

		if (player) {
			let myParty = player.partyid;

			if (myParty !== this.invalidParty) {
				while (player.getNext()) {
					if (player.name === playerCharName) {
						return player;
					}
				}
			}
		}

		return false;
	},

	isInMyParty: function (profile) {
		let player = getParty();
		let targetPlayer = this.findPartyMember(profile);

		if (!!player && !!targetPlayer) {
			return targetPlayer.partyid === player.partyid;
		}

		return false;
	},

	inviteTeammate: function (profile) {
		let targetPlayer = this.findPartyMember(profile);

		if (!!targetPlayer) {
			if (targetPlayer.partyflag !== 4) clickParty(targetPlayer, 2);
		}
	},

	// Counts all the players in game. If the number of players is
	// below TeamSize, either return false or quit game depending on input.
	wholeTeamInGame: function (stayInGame) {
		let count = 0;

		if (stayInGame === undefined) {
			stayInGame = false;
		}

		for (let i = 0; i < 30; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			let player = getParty();

			if (player) {
				do {
					count += 1;
				} while (player.getNext());
				break;
			}

			delay(250);
		}

		if (count < HordeSystem.teamSize) {
			if (!stayInGame) {
				HordeDebug.logScriptError("Party", "Teammates are missing from game (" + count + "/" + HordeSystem.teamSize + ") - leaving game");
				HordeSystem.onToolThreadQuit();
			}

			return stayInGame ? false : quit(); // Return false if stayInGame is true, otherwise leave game.
		}

		return true;
	},

	waitWholeTeamJoined: function () {
		let tick = getTickCount();

		while (!Party.wholeTeamInGame(true)) { // Wait for the Horde Team to join.
			delay(1000);

			// Leave the game after x minutes of waiting
			if (getTickCount() - tick > HordeSettings.maxWaitTimeMinutes * 6e4) {
				HordeDebug.logCriticalError("Party", "Team didn't join the game within " + HordeSettings.maxWaitTimeMinutes + " minutes.");
				quit();
			}
		}
	},

	hasReachedLevel: function (level) {
		if (!level) {
			level = me.charlvl;
		}

		for (let i = 0; i < 30; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			let player = getParty();

			if (player) {
				do {
					if (player.level < level) {
						return false; // Player is not ready
					}
				} while (player.getNext());

				return true;
			}

			delay(250);
		}

		return false;
	},

	// Cycles thru getParty() and returns the lowest Act (i.e., 1-5) the partied characters are in.
	// Quits if noone is partied. Returns false is someone isn't in a Town.
	getLowestAct: function () {
		let lowestAct = [-1, 1, 40, 75, 103, 109].indexOf(me.area);

		if (HordeSystem.teamSize === 1) {
			return lowestAct;
		}

		for (let i = 0; i < 30; i += 1) { // Try 30 times because getParty(); can fail once in a while.
			let player = getParty();

			if (player) {
				let myPartyID = player.partyid;

				if (myPartyID === 65535) { // Noone in my Party. Probably a good idea to quit. . .
					for (let j = 0; j < 60; j += 1) {
						player = getParty();
						myPartyID = player.partyid;

						if (myPartyID !== 65535) {
							break;
						}

						this.joinHordeParty();
					}
				}

				while (player.getNext()) {
					if (player.partyid === myPartyID) { // Only check characters in a Party with me.
						let area = [-1, 1, 40, 75, 103, 109].indexOf(player.area);
						// Player isn't in a Town
						if (area === -1) {
							return false;
						}

						if (area < lowestAct) {
							lowestAct = area;
						}
					}
				}

				break;
			}

			delay(250);
		}

		return lowestAct;
	},

	allPlayersInArea: function (area, expectedPlayers) {
		if (!area) {
			area = me.area;
		}

		if (expectedPlayers === undefined) {
			expectedPlayers = HordeSystem.teamSize;
		}

		let count = 1;
		let party = getParty(); // This is actually counting in game players (you included), not in party

		if (party) {
			do { // counting players rdy
				if (party.area === area) {
					count += 1;
				}
			} while (party.getNext());
		}

		if (count < expectedPlayers) {
			return false;
		}

		return true;
	},

	waitForMembers: function (area, nextArea) {
		if (HordeSystem.teamSize === 1) {
			return;
		}

		if (arguments.length < 1) {
			area = me.area;
		}

		if (arguments.length < 2) {
			nextArea = area;
		}

		if (!this.secureWaitSynchro("secure_area_" + area, HordeSettings.maxWaitTimeMinutes * 60 * 1000, area)) {
			quit();
		}
	},

	waitForMembersByWaypoint: function () {

		if (HordeSystem.teamSize === 1) {
			return;
		}

		print("[ÿc9Party.jsÿc0] Waiting for team members at WP");

		if (!this.secureWaitSynchro("secure_waypoint")) {
			quit();
		}
	},

	secureWaitSynchro: function (synchroType, timeout, area) {
		let tick = getTickCount();
		let clearResult = false;
		let sentReady = false;

		if (area === undefined) {
			area = me.area;
		}

		if (HordeSystem.teamSize == 1) {
			return true;
		}

		Party.wholeTeamInGame();

		if (me.area != area) {
			Pather.journeyTo(area);
		}

		if (timeout === undefined) {
			timeout = HordeSettings.maxWaitTimeMinutes * 6e4;
		}

		let orgx = me.x;
		let orgy = me.y;

		delay(me.ping * 2 + 250);

		if (HordeSettings.Debug.Verbose.synchro) {
			print("[ÿc:Debugÿc0] Start secure wait team ready " + synchroType + " (timeout: " + (timeout / 1000) + "s)");
		}

		if (me.inTown) {
			clearResult = true;
		}

		Precast.doPrecast(true);

		let lastPrecast = getTickCount();

		while (!Communication.Synchro.isTeamReady(synchroType) && getTickCount() - tick <= timeout) {
			if (!me.inTown) {
				clearResult = Attack.clear(15);

				if (me.area != area) {
					Pather.journeyTo(area);
				}

				Pather.moveTo(orgx, orgy, 1, true);
			}

			if (clearResult && !sentReady) {
				Communication.Synchro.sayReady(synchroType);
				sentReady = true;
			}

			if (getTickCount() - lastPrecast > 10000) {
				Precast.doPrecast(true);
				lastPrecast = getTickCount();
			}

			Communication.Synchro.askMissingReady(synchroType);
			delay(me.ping * 2 + 250);

			Party.wholeTeamInGame();
		}

		let success = (getTickCount() - tick) <= timeout;

		if (success) {
			delay(me.ping + 50);
		}

		Communication.Synchro.flushTeamReady(synchroType);

		if (HordeSettings.Debug.Verbose.synchro) {
			if (success) {
				print("[ÿc9Party.jsÿc0] Team secured and is ready for " + synchroType);
			} else {
				HordeDebug.logScriptError("Synchro", "Team synchro " + synchroType + " failed");
			}
		}

		return success;
	},

	waitSynchro: function (synchroType, timeout) {
		let tick = getTickCount();

		if (timeout === undefined) {
			timeout = HordeSettings.maxWaitTimeMinutes * 6e4;
		}

		if (HordeSystem.teamSize == 1) {
			return true;
		}

		if (me.ingame) {
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.synchro) {
			print("[ÿc9Party.jsÿc0] Wait team ready " + synchroType + " (timeout: " + (timeout / 1000) + "s)");
		}

		Communication.Synchro.sayReady(synchroType);

		while (!Communication.Synchro.isTeamReady(synchroType) && getTickCount() - tick <= timeout) {
			Communication.Synchro.askMissingReady(synchroType);
			delay(me.ping * 2 + 250);

			if (me.ingame) {
				Party.wholeTeamInGame();
			}
		}

		let success = (getTickCount() - tick) <= timeout;

		if (success) {
			delay(me.ping + 50);
		}

		Communication.Synchro.flushTeamReady(synchroType);

		if (HordeSettings.Debug.Verbose.synchro) {
			if (success) {
				print("[ÿc9Party.jsÿc0] Team is ready for " + synchroType);
			} else {
				HordeDebug.logScriptError("Synchro", "team synchro " + synchroType + " failed");
			}
		}

		return success;
	},

	updateLowestAct: function () {
		let timeout = HordeSettings.maxWaitTimeMinutes * 6e4;

		if (!this.waitSynchro("update_lowest_act")) {
			HordeDebug.logCriticalError("prerun", "Initial synchro failed: Team wasn't ready within " + (timeout / 1000) + " seconds");
			quit();
		}

		delay(me.ping * 2 + 250);

		while (!this.lowestAct) { // Wait for everyone to get back to their Town, then record the lowest Town.
			this.lowestAct = Party.getLowestAct();

			delay(50);
			Party.wholeTeamInGame();
		}

		print("Lowest act: " + this.lowestAct);
	}
};