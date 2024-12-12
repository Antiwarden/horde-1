/**
 *	@filename Role.js
 *	@desc	  Manages character roles, team coordination, and waypoint synchronization.
 */

var Role = {
	isLeader: false,
	teleportingChar: false,
	boChar: false,
	otherChar: false,
	questDropChar: false,
	uberChar: false,

	// Checks Config settings to determine role.
	initRole: function () {
		if (HordeSystem.questDropProfile === me.profile) {
			this.questDropChar = true;
		}

		if (HordeSystem.teleProfile === me.profile) {
			this.teleportingChar = true;
		} else if (HordeSystem.boProfile === me.profile) {
			this.boChar = true;
		} else if (HordeSystem.uberProfile === me.profile) {
			this.uberChar = true;
		} else {
			for (let i = 0; i < HordeSystem.followerProfiles.length; i += 1) {
				if (HordeSystem.followerProfiles[i] === me.profile) {
					this.otherChar = true;
					break;
				}
			}

			if (!this.otherChar) {
				HordeDebug.logUserError("TeamConfig", "I am not assigned a role in my Config file. Please rectify this omission and restart."); // SiC-666 TODO: Make this red text or throw an error instead.
				while (true) {
					delay(1000);
				}
			}
		}

		let leaderProfile = DataFile.getStats().hordeLeader;

		if (HordeSystem.teamSize > 1) {
			if (leaderProfile !== undefined) {
				this.isLeader = leaderProfile === me.profile;
			} else {
				this.isLeader = this.teleportingChar;
			}
		} else {
			this.isLeader = true;
		}
	},

	getLeaderUnit: function () {
		let player = getUnit(0, HordeSystem.team.profiles[HordeSystem.teleProfile].character);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	},

	goToLeader: function () {
		let leader = this.getLeaderUnit();

		if (leader) {
			if (this.boProfile) { // Why bo only ?
				if (me.area != leader.area) {
					return false;
				}

				let count = 0;

				while (getDistance(me, leader) > 3) {
					if (!Pather.moveTo(leader.x + 1, leader.y, 5)) {
						Pather.moveTo(leader.x, leader.y + 1, 5);
					}

					count += 1;

					if (count > 5) {
						break;
					}
				}
			}

			return true;
		}
		
		return false;
	},

	makeTeamJoinPortal: function () {
		if (HordeSystem.teamSize > 1) {
			Pather.makePortal();
		}
	},

	makeTeamTownPortal: function () {
		if (HordeSystem.teamSize > 1) {
			Pather.makePortal();
		}
	},

	getTownFromAct: function (act) {
		let towns = [1, 40, 75, 103, 109];

		if (act < 1 || act > 5) {
			throw new Error("Role.getTownFromAct: Invalid act");
		}

		return towns[act - 1];
	},

	backToTown: function (force) {
		if (force === undefined) {
			force = true;
		}

		let waitTime = 1000;
		let townNames = {
			0: "None",
			1: "Rogue Encampment",
			40: "Lut Gholein",
			75: "Kurast Docktown",
			103: "The Pandemonium Fortress",
			109: "Harrogath"
		};

		let targetTown = this.getTownFromAct(me.act);

		if (!me.inTown && !me.dead) {
			if (me.area === 136) {
				Pather.moveTo(25105, 5140);
				Pather.usePortal(109);

				return true;
			}

			let townName = townNames[targetTown] || "undefined";

			print("[ÿc2Start backToTownÿc0] Take TP to: " + townName);

			if (Pather.getPortal(targetTown, null)) {
				Pather.usePortal(targetTown, null);

				delay(me.ping * 2 + 250);

				if (me.inTown || me.dead) {
					return true;
				}
			}

			if (this.canCreateTp()) {
				let scrollsCount = this.getTpTome().getStat(70);
				//print("[ÿc:Debugÿc0] backToTown: Have " + scrollsCount + " scrolls");

				if (scrollsCount === 20) {
					waitTime = HordeSystem.getTeamIndex(me.profile) * 50 + 50; // We wait [0;400] depending on our index in the team profiles.
				} else {
					waitTime = 400 + 30 * (20 - scrollsCount); // We're not full of scrolls, wait [400;1000] depending on how many scrolls we have
				}
			}

			while (!me.inTown && !me.dead && waitTime > 0) {
				//print("[ÿc:Debugÿc0] backToTown: Waiting " + waitTime + " ms");
				delay(waitTime);

				if (Pather.getPortal(targetTown, null)) {
					//print("[ÿc:Debugÿc0] backToTown: Try using portal (" + waitTime + " ms)");
					Pather.usePortal(targetTown, null);
					waitTime = waitTime - 100;
				} else if (this.canCreateTp()) {
					//print("[ÿc:Debugÿc0] backToTown: Make portal (" + waitTime + " ms)");
					Pather.makePortal();
					Pather.usePortal(targetTown, null);
				} else waitTime = waitTime - 100;
			}
		} else {
			delay(waitTime);
		}

		Travel.walkMeHome(true);

		if (waitTime > 0 && !me.dead && force) {
			if (!me.inTown) {
				print("[ÿc9Warningÿc0] :: [ÿc:Role.jsÿc0] backToTown failed, forcing back to town.");
				return Town.goToTown();
			}
		}

		print("[ÿc:Debugÿc0] backToTown: " + (waitTime > 0 ? "succeeded" : "failed"));
		return waitTime > 0;
	},

	canCreateTp: function () {
		return this.hasTpScrolls();
	},

	getTpTome: function () {
		return me.findItem("tbk", 0, 3);
	},

	hasTpScrolls: function () {
		var tpTome = this.getTpTome();

		if (tpTome) {
			return tpTome.getStat(70);
		}

		return false;
	},

	getGold: function () {
		return me.getStat(14) + me.getStat(15);
	},

	isHighGold: function () {
		return this.getGold() > Config.LowGold * 2 + 100;
	},

	isMediumGold: function () {
		return this.getGold() > Config.LowGold * 1.5 + 100;
	},

	isLowGold: function () {
		return this.getGold() < Config.LowGold + 100;
	},

	isVeryLowGold: function () {
		return this.getGold() * 2 < Config.LowGold + 100;
	},

	mercCheck: function () {
		if (Party.lowestAct >= 2 || me.act >= 2) {
			var enableMercRebuy = true;
			var hasAct2NightmareMerc = !!HordeSystem.build.mercAct2Nightmare;

			if (HordeSystem.team.disableMercRebuy) {
				enableMercRebuy = false;
			}

			if (me.diff === 0 && (me.charlvl < 45 || !hasAct2NightmareMerc)) {
				MercTools.hireMerc(2, HordeSystem.build.mercAct2Normal, false, 2);

				// Make sure our merc can get levels
				if (Party.lowestAct === 5) {
					let merc = me.getMerc();

					if (merc && merc.charlvl < 25 && me.charlvl >= 28) {
						MercTools.hireMerc(2, HordeSystem.build.mercAct2Normal, enableMercRebuy, 25);
					} else if (merc && merc.charlvl <= me.charlvl - 10 && !hasAct2NightmareMerc) {
						MercTools.hireMerc(2, HordeSystem.build.mercAct2Normal, enableMercRebuy, me.charlvl - 5);
					}
				}
			} else if (me.diff === 1 && hasAct2NightmareMerc) {
				MercTools.hireMerc(2, HordeSystem.build.mercAct2Nightmare, false, 2);

				if (Party.lowestAct === 5) {
					let merc = me.getMerc();

					if (merc && merc.charlvl <= me.charlvl - 10) {
						MercTools.hireMerc(2, HordeSystem.build.mercAct2Nightmare, enableMercRebuy, me.charlvl - 5);
					}
				}
			}
		}
	},

	hasTorch: function () {
		var item = me.getItem("cm2");

		if (item) {
			do {
				if (item.quality === 7 && Pickit.checkItem(item).result === 1) {
					return true;
				}
			} while (item.getNext());
		}

		return false;
	},

	hasOrgSet: function () {
		var horns = me.findItems("dhn");
		var brains = me.findItems("mbr");
		var eyes = me.findItems("bey");

		if (!horns || !brains || !eyes) {
			return false;
		}

		// We just need one set to make a torch
		return horns.length && brains.length && eyes.length;
	},

	hasKeySet: function () {
		var tkeys = me.findItems("pk1", 0).length || 0;
		var hkeys = me.findItems("pk2", 0).length || 0;
		var dkeys = me.findItems("pk3", 0).length || 0;

		//print("[ÿc:Role.jsÿc0] We have keys (Terror: " + tkeys + " - Hate: " + hkeys + " - Destruction: " + dkeys + ")");

		return tkeys >= 3 && hkeys >= 3 && dkeys >= 3;
	},

	getKeysNeeds: function () {
		var tkeys = me.findItems("pk1", 0).length || 0;
		var hkeys = me.findItems("pk2", 0).length || 0;
		var dkeys = me.findItems("pk3", 0).length || 0;

		return { terror: tkeys < 3 ? 3 - tkeys : 0, hate: hkeys < 3 ? 3 - hkeys : 0, dest: dkeys < 3 ? 3 - dkeys : 0 };
	},

	orgTorchCheck: function () {
		if (this.uberChar) {
			if (!this.hasTorch()) {
				return this.hasKeySet() || this.hasOrgSet();
			} else {
				print("[ÿc:Role.jsÿc0] orgTorchCheck: Already have torch");
				if (AutoMule.getInfo() && AutoMule.getInfo().hasOwnProperty("torchMuleInfo")) {
					print("[ÿc:Role.jsÿc0] Muling torch");
					scriptBroadcast("muleTorch");
					quit();
					scriptBroadcast("quit");
					//delay(10000);
				}
			}
		} else {
			print("[ÿc:Role.jsÿc0] orgTorchCheck: We are not an uber char");
		}

		return false;
	}
};
