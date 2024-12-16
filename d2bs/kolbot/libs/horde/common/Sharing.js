/**
*	@filename	Sharing.js
*	@author		Adpist
*	@desc		  Sharing stuff between party
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var Sharing = {
	goldAnswers: [],

	hasGearPriority: function (profile) {
		let myPrio = HordeSystem.team.profiles[me.profile].gearPriority;
		let otherPrio = HordeSystem.team.profiles[profile].gearPriority;

		if (!myPrio && !!otherPrio) {
			return false;
		} else if (!!myPrio && !!otherPrio && otherPrio < myPrio) {
			return false;
		}

		return true;
	},

	onReceiveCommand: function (nick, msg) {
		/*
		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] " + nick + " sent " + msg);
		} */

		let args = msg.split(' ');

		if (args.length >= 2) {
			if (args[1] === "gold") {
				if (args.length === 3) this.onReceiveGoldCommand(nick, args[2]);
			} else if (args[1] === "gear") {
				if (args.length >= 3) {
					if (args[2] === "have") {
						if (args.length === 4) this.onReceiveProfileGearCount(nick, parseInt(args[3]));
					} else if (args[2] === "offer") {
						let tier = parseFloat(args[3]);
						let mercTier = parseFloat(args[4]);
						let lvlReq = parseInt(args[5]);
						let json = "";

						for (let i = 6; i < args.length; i++) {
							if (i > 6) {
								json += " ";
							}

							json += args[i];
						}

						this.onReceiveGearOffer(nick, tier, mercTier, lvlReq, json);

					} else if (args[2] === "result") {
						this.onReceiveGearResult(nick, args);
					} else if (args[2] === "pick") {
						if (args.length === 3) {
							this.receiveItem(nick);
						} else if (args.length === 4 && args[3] == "done") {
							this.receivedPickDone = true;
						}
					}
				}
			} else if (args[1] === "rune") {
				if (args.length >= 4) {
					let json = "";

					for (let i = 3; i < args.length; i++) {
						if (i > 3) {
							json += " ";
						}

						json += args[i];
					}

					if (args[2] === "need") {
						this.onReceiveRuneNeedList(nick, JSON.parse(json));
					} else if (args[2] === "offer") {
						this.onReceiveRuneOfferList(nick, JSON.parse(json));
					} else if (args[2] === "drop") {
						if (args[3] === "done") {
							this.runeDropDone = true;
						} else {
							this.onReceiveRuneDropList(nick, JSON.parse(json));
						}
					} else if (args[2] === "pick") {
						if (args[3] === "done") this.runePickDone = true;
					}
				}
			}
		}
	},

	onReceiveGoldCommand: function (profile, arg) {
		let found = false;

		for (let i = 0; i < this.goldAnswers.length; i++) {
			if (this.goldAnswers[i].profile === profile) {
				this.goldAnswers[i].cmd = arg;
				found = true;
			}
		}

		if (!found) {
			this.goldAnswers.push({ profile: profile, cmd: arg });
		}

		if (profile === me.profile) {
			Communication.sendToList(HordeSystem.allTeamProfiles, "sharing gold " + arg);
		}
	},

	getProfileCommand: function (profile) {
		for (let i = 0; i < this.goldAnswers.length; i++) {
			if (this.goldAnswers[i].profile === profile) {
				return this.goldAnswers[i].cmd;
			}
		}

		return "";
	},

	getProfilesForGoldCommand: function (cmd) {
		let profiles = [];

		for (let i = 0; i < this.goldAnswers.length; i++) {
			if (this.goldAnswers[i].cmd === cmd) {
				profiles.push(this.goldAnswers[i].profile);
			}
		}

		return profiles;
	},

	receiveGold: function () {
		if (me.getStat(14)) {
			Town.openStash();

			gold(me.getStat(14), 3); // Stash my Gold to make sure I have room to pick more up.
			delay(me.ping + 50);

			me.cancel();
		}

		let goldPile = getUnit(4, 523, 3);

		if (goldPile) {
			Pickit.pickItem(goldPile);
		}

		delay(me.ping * 2 + 50);

		if (Role.isMediumGold()) {
			this.onReceiveGoldCommand(me.profile, "good");
		}
	},

	giveGold: function () {
		let dropAmmount = (me.gold - (Config.LowGold * 2)) / 2; // Keep some Gold for myself.
		let maxDropAmmount = me.charlvl * 1e4; // The maximum ammount of Gold that can be dropped at once.

		Town.openStash();

		gold(me.getStat(14), 3); // Stash my Gold.

		delay(me.ping + 50);

		dropAmmount = dropAmmount > maxDropAmmount ? maxDropAmmount : dropAmmount; // If dropAmmount is greater than maxDropAmmount override it.
		dropAmmount = dropAmmount + me.getStat(14) > maxDropAmmount ? maxDropAmmount - me.getStat(14) : dropAmmount; // Handle residual Gold in Inventory screen (shouldn't ever be an issue, but let's be cautious).

		gold(Math.round(dropAmmount), 4); // Remove Gold from Stash (must be a round number).
		
		/*
		for (let i = 0 ; i < 50 ; i++) { // Wait up to two seconds. SiC-666 TODO: Does this not wait long enough and lead to C/I sometimes?
			delay(40);

			if (me.getStat(14)) { // Once Gold has moved to Inventory, exit loop.
				break;
			}
		}
		*/

		delay(me.ping * 2 + 500);

		while (me.getStat(14) && this.getProfilesForGoldCommand("need").length > 0) {
			gold(me.getStat(14)); // Drop Gold
			delay(me.ping * 2 + 500);
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			HordeDebug.logScriptInfo("GoldSharing", me.profile + " dropped " + dropAmmount + " gold");
		}

		me.cancel();

		this.onReceiveGoldCommand(me.profile, "good");
	},

	shareGold: function () {
		if (HordeSystem.teamSize === 1) {
			return;
		}

		let need = Role.isLowGold();
		let offer = Role.isHighGold();

		this.goldAnswers = [];

		if (!Party.waitSynchro("begin_gold")) {
			HordeDebug.logCriticalError("gold sharing", "begin_gold synchro failed");
			quit();
		}

		if (need) { /*
			if (HordeSettings.Debug.Verbose.sharing) { */
				print("[ÿc9shareGoldÿc0] " + me.profile + " needs gold"); /*
			} */

			this.onReceiveGoldCommand(me.profile, "need");

		} else if (offer) {
			this.onReceiveGoldCommand(me.profile, "offer");
		} else {
			this.onReceiveGoldCommand(me.profile, "good");
		}

		while (this.goldAnswers.length < HordeSystem.teamSize) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			for (let i = 0; i < this.goldAnswers.length; i++) {
				print("[ÿc8shareGoldÿc0] " + this.goldAnswers[i].profile + " " + this.goldAnswers[i].cmd + " gold");
			}
		}

		let notifiedStartSharing = false;

		if (this.getProfilesForGoldCommand("need").length > 0 && this.getProfilesForGoldCommand("offer").length > 0) {
			if (Role.isLeader && HordeSettings.Debug.Verbose.sharing && !notifiedStartSharing) {
				HordeDebug.logScriptInfo("GoldSharing", me.profile + " starts shareGold: Need " + this.getProfilesForGoldCommand("need").length + "; offer " + this.getProfilesForGoldCommand("offer").length);
				notifiedStartSharing = true;
			}

			Town.goToTown(Party.lowestAct);
			Town.move("stash");

			while (this.getProfilesForGoldCommand("need").length > 0 && this.getProfilesForGoldCommand("offer").length > 0) {
				if (this.getProfileCommand(me.profile) === "need") {
					this.receiveGold();
				} else if (this.getProfileCommand(me.profile) === "offer") {
					this.giveGold();
				} else {
					delay(50);
					Party.wholeTeamInGame();
				}
			}
		}

		let goldPile = getUnit(4, 523, 3);

		while (goldPile && me.gold < Config.LowGold * 2) {
			Pickit.pickItem(goldPile);
			delay(me.ping + 50);

			goldPile = getUnit(4, 523, 3);
		}

		Pickit.pickItems();
	},

	giveTP: function (nick) {
		print("[ÿc5Sharing.jsÿc0] Giving TP");

		if (!this.nickList) {
			this.nickList = {};
		}

		if (!this.nickList[nick]) {
			this.nickList[nick] = {
				timer: 0
			};
		}

		if (getTickCount() - this.nickList[nick].timer < 60000) {
			Communication.sendToList(HordeSystem.allTeamProfiles, "I can only make one Tp per minute :(");
			return false;
		}

		Communication.sendToList(HordeSystem.allTeamProfiles, "Here you go :)");

		if (me.area !== 120) {
			if (!Pather.makePortal()) throw new Error("giveTP: Failed to make TP");
			this.nickList[nick].timer = getTickCount();
		}

		return true;
	},

	announceSharingSequence: function () {
		if (Role.boChar && me.charlvl >= 24) { // Announce Battle Orders
			Communication.sendToList(HordeSystem.allTeamProfiles, "bo");
		}
	},

	// Gear sharing
	gearAnswers: {},
	offeredGearAnswers: {},
	offerSelfResult: {},
	sharableGear: [],
	offeredGearHistory: [],
	fieldSharing: false,
	receivedPickDone: false,

	clearGearSharingData: function () {
		this.gearAnswers = {};
		this.offeredGearAnswers = {};
		this.offerSelfResult = {};
		this.sharableGear = [];
		this.fieldSharing = false;
		this.receivedPickDone = false;
	},

	onReceiveProfileGearCount: function (profile, gearCount) {
		if (!!this.gearAnswers[profile]) {
			this.gearAnswers[profile].count = gearCount;
			this.gearAnswers[profile].status = gearCount > 0 ? "offer" : "done";
		} else {
			this.gearAnswers[profile] = { count: gearCount, status: gearCount > 0 ? "offer" : "done" };
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] Received " + profile + " gear sharing - status: " + this.gearAnswers[profile].status + " - Items: " + this.gearAnswers[profile].count);
		}

		if (profile === me.profile) {
			Communication.sendToList(HordeSystem.allTeamProfiles, "sharing gear have " + gearCount);
		}
	},

	onReceiveGearOffer: function (nick, tier, mercTier, lvlReq, json) {
		let sentItem = JSON.parse(json);
		let resultStr = "";

		if (Item.autoEquipCheckTier(sentItem, lvlReq, tier)) {
			resultStr += "1 tier " + tier;
		} else if (Item.autoEquipCheckMercTier(sentItem, lvlReq, mercTier)) {
			resultStr += "1 merctier " + mercTier;
		} else {
			resultStr += "0";
		}

		Communication.sendToProfile(nick, "sharing gear result " + resultStr);

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] Sending gear result for " + sentItem.name + " to " + nick + ": " + resultStr);
		}
	},

	onReceiveGearResult: function (nick, args) {
		if (args.length === 6) {
			this.offeredGearAnswers[nick] = { result: parseInt(args[3]), type: args[4], tier: parseInt(args[5]) };
		} else if (args.length === 4) {
			this.offeredGearAnswers[nick] = { result: parseInt(args[3]) };
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("Received gear result from " + nick + ": " + JSON.stringify(this.offeredGearAnswers[nick]));
		}
	},

	hasReceivedAllProfilesGear: function () {
		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			if (!this.gearAnswers[HordeSystem.allTeamProfiles[i]]) return false;
		}

		return true;
	},

	getSharingProfile: function () {
		let lowestPrioProfile = false;
		let lowestPrio = 100;

		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			let profile = HordeSystem.allTeamProfiles[i];

			if (this.gearAnswers[profile].status !== "done") {
				if (!!HordeSystem.team.profiles[profile].gearPriority) {
					if (lowestPrio > HordeSystem.team.profiles[profile].gearPriority) {
						lowestPrio = HordeSystem.team.profiles[profile].gearPriority;
						lowestPrioProfile = profile;
					}
				}
			}
		}

		return lowestPrioProfile;
	},

	getHigherPriorityProfiles: function () {
		let targetProfiles = [];
		let myPriority = HordeSystem.team.profiles[me.profile].gearPriority;

		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			let profile = HordeSystem.allTeamProfiles[i];

			if (profile !== me.profile) {
				if (HordeSystem.team.profiles[profile].gearPriority < myPriority) targetProfiles.push(profile);
			}
		}

		return targetProfiles;
	},

	hasReceivedAllGearAnswers: function (profiles) {
		for (let i = 0; i < profiles.length; i++) {
			let profile = profiles[i];

			if (profile !== me.profile) {
				if (!this.offeredGearAnswers[profile]) {
					return false;
				}
			}
		}

		return true;
	},

	getOfferWinner: function (profiles, myResult) {
		let winnerProfile = false;
		let highestPrio = 100000;
		let winnerResult = {}; // What's the point of this?

		for (let i = 0; i < profiles.length; i++) {
			let profile = profiles[i];

			if (profile !== me.profile && HordeSystem.team.profiles[profile].gearPriority < highestPrio) {
				let profileResult = this.offeredGearAnswers[profile];

				if (profileResult.result > 0) {
					let shouldKeep = false;

					if (profileResult.result === 1) {
						if (profileResult.type === "merctier" && myResult.result === 1 && !!myResult.tier) {
							shouldKeep = true; // He needs for merc & I need for char
						}
					}

					if (!shouldKeep) {
						winnerProfile = profile;
						highestPrio = HordeSystem.team.profiles[profile].gearPriority;
					}
				}
			}
		}

		return winnerProfile;
	},

	offerItem: function (item, targetProfiles) {
		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] Offering " + Pickit.itemColor(item) + item.name.trim() + " (gid : " + item.gid + ")");
		}

		for (let i = 0; i < targetProfiles.length; i++) {
			let profile = targetProfiles[i];

			if (profile !== me.profile) {
				let tier = NTIP.GetTierEx(item, "Tier", TeamData.profilesGearPickits[profile].checkList);
				let mercTier = NTIP.GetTierEx(item, "MercTier", TeamData.profilesGearPickits[profile].checkList);

				if (HordeSettings.Debug.Verbose.sharing) {
					print("[ÿc5Sharing.jsÿc0] :: Sending " + Pickit.itemColor(item) + item.name.trim() + " to " + profile + " (tier: " + tier + " - merc tier: " + mercTier + ")");
				}

				let convertedItem = JSON.parse(JSON.stringify(item));

				convertedItem.dexreq = item.dexreq;
				convertedItem.strreq = item.strreq;

				Communication.sendToProfile(targetProfiles[i], "sharing gear offer " + tier + " " + mercTier + " " + item.getStat(92) + " " + JSON.stringify(convertedItem));
			}
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] :: Waiting all gear answers for " + Pickit.itemColor(item) + item.name.trim() + " (gid: " + item.gid + ")");
		}

		while (!this.hasReceivedAllGearAnswers(targetProfiles)) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] :: Received all gear answers for " + Pickit.itemColor(item) + item.name.trim() + " (gid : " + item.gid + ")");
		}
	},

	giveItem: function (profile, item) {
		if (HordeSettings.Debug.Verbose.sharing) {
      HordeDebug.logScriptInfo("GearSharing", "dropping " + item.name + " for " + profile);
    }

		this.receivedPickDone = false;

		Town.goToTown(Party.lowestAct);
		Town.move("stash");

		item.drop();
		delay(me.ping * 2 + 250);

		Communication.sendToProfile(profile, "sharing gear pick");

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] :: Wait receive pick done");
		}

		while (!this.receivedPickDone) {
			delay(50);
			Party.wholeTeamInGame();
		}

		this.receivedPickDone = false;

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] :: Received pick done");
		}
	},

	receiveItem: function (profile) {
		if (HordeSettings.Debug.Verbose.sharing) {
      HordeDebug.logScriptInfo("GearSharing", "picking item from " + profile);
    }

		Town.goToTown(Party.lowestAct);

		Town.move("stash");
		delay(me.ping * 2 + 250);

		Pickit.pickItems();
		delay(me.ping + 50);

		Item.autoEquip();
		Item.autoEquipMerc();
		delay(me.ping + 50);

		this.sharableGear = this.getGearToShare(this.fieldSharing);
		this.onReceiveProfileGearCount(me.profile, this.sharableGear.length);

		Communication.sendToProfile(profile, "sharing gear pick done");
	},

	isInOfferedGearHistory: function (item) {
		for (let i = 0; i < this.offeredGearHistory.length; i++) {
			if (item.gid === this.offeredGearHistory[i].gid && item.classid === this.offeredGearHistory[i].classid) {
				return true;
			}
		}

		return false;
	},

	isGearSharingEnabled: function () {
		return eval(HordeSystem.team.enableGearSharing);
	},

	shareGear: function (fieldSharing) {
		if (HordeSystem.teamSize === 1 || !this.isGearSharingEnabled()) {
			return;
		}

		if (fieldSharing === undefined) {
			fieldSharing = false;
		}

		this.clearGearSharingData();
		this.fieldSharing = fieldSharing;

		Pickit.pickItems();

		if (!Party.waitSynchro("begin_gear")) {
			HordeDebug.logCriticalError("gear sharing", "begin_gear synchro failed");
			quit();
		}

    /*
		if (HordeSettings.Debug.Verbose.sharing) { */
			print("[ÿc2Start shareGearÿc0] :: Starting gear sharing"); /*
		} */

		this.sharableGear = this.getGearToShare(fieldSharing);
		this.onReceiveProfileGearCount(me.profile, this.sharableGear.length);

		// Wait all answers
		while (!this.hasReceivedAllProfilesGear()) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc8shareGearÿc0] :: Received all profiles gear offers");
		}

		let sharingProfile = this.getSharingProfile();

		if (sharingProfile) {
			do {
				if (sharingProfile === me.profile) {
					if (HordeSettings.Debug.Verbose.sharing) {
            print("[ÿc2shareGearÿc0] :: Offering " + this.sharableGear.length + " items");
          }

					for (let i = 0; i < this.sharableGear.length; i++) {
						let itemToShare = this.sharableGear[i];
						let checkResult = Pickit.checkItem(itemToShare);
						let targetProfiles = checkResult.result === 1 && (!!checkResult.tier || !!checkResult.merctier)
            ? this.getHigherPriorityProfiles()
            : HordeSystem.allTeamProfiles;

						this.offeredGearAnswers = {};

						this.offerItem(itemToShare, targetProfiles);

						let winner = this.getOfferWinner(targetProfiles, checkResult);

						if (winner) {
							if (itemToShare.location === 7) {
								if (Storage.Inventory.CanFit(itemToShare)) {
                  Storage.Inventory.MoveTo(itemToShare);
                }
							}

              print("[ÿc2shareGearÿc0] :: ÿc4" + JSON.stringify(winner) + "ÿc0 needs " + Pickit.itemColor(itemToShare) + itemToShare.name.trim());

							this.giveItem(winner, itemToShare);
						} else { /*
							if (HordeSettings.Debug.Verbose.sharing) { */
								print("[ÿc8shareGearÿc0] :: Nobody needs " + Pickit.itemColor(itemToShare) + itemToShare.name.trim()); /*
							} */
						}

						Pickit.pickItems();

						this.offeredGearHistory.push({ gid: itemToShare.gid, classid: itemToShare.classid });
					}

					delay(me.ping + 50);

					Item.autoEquip();
					Item.autoEquipMerc();
					delay(me.ping + 50);

					this.sharableGear = this.getGearToShare(fieldSharing);
					this.onReceiveProfileGearCount(me.profile, this.sharableGear.length);

					if (this.sharableGear.length == 0) {
						if (HordeSettings.Debug.Verbose.sharing) {
							print("[ÿc1shareGearÿc0] Finished offering gear");
						}

						sharingProfile = this.getSharingProfile();
					} else if (HordeSettings.Debug.Verbose.sharing) {
						print("[ÿc2shareGearÿc0] Still have " + this.sharableGear.length + " items to offer");
					}
				} else {
					if (HordeSettings.Debug.Verbose.sharing) {
						print("[ÿc8shareGearÿc0] Waiting for " + sharingProfile + " to offer items ... ");
					}

					while (this.gearAnswers[sharingProfile].status !== "done") {
						delay(50);
						Party.wholeTeamInGame();
					}

					sharingProfile = this.getSharingProfile();
				}

			} while (sharingProfile)

			if (HordeSettings.Debug.Verbose.sharing) {
				print("[ÿc2shareGearÿc0] All offers processed");
			}
		} else {
			if (HordeSettings.Debug.Verbose.sharing) {
				print("[ÿc8shareGearÿc0] No gear to share");
			}
		}

    /*
		if (HordeSettings.Debug.Verbose.sharing) { */
			print("[ÿc1End shareGearÿc0] :: Gear sharing done"); /*
		} */

		this.clearGearSharingData();

		Pickit.pickItems();
	},

	getGearToShare: function (fieldSharing) {
		let sharableItems = [];
		let item = me.getItem();
		let locationsToCheck = fieldSharing ? [3] : [3, 7];

		const itemTypesToShare = [
			2, // Shields
			3, // Armors
			10, // Rings
			12, // Amulets
			//13, // Charms
			15, // Boots
			16, // Gloves
			19, // Belts
			24, // Scepters
			25, // Wands
			26, // Staffs
			27, // Bows
			28, // Axes
			29, // Clubs
			30, // Swords
			31, // Hammers
			32, // Knifes
			33, // Spears
			34, // Polearms
			35, // Crossbows
			36, // Maces
			37, // Helms
			42, // Throwing Knives
			43, // Throwing Axes
			44, // Javelins
			45, // Weapons
			46, // Melee Weapons
			47, // Missile Weapons
			48, // Thrown Weapons
			49, // Combo Weapons
			50, // Any Armor
			51, // Any Shield
			55, // Staves and Rods
			59, // Class specific
			60, // Amazon
			61, // Barbarian
			62, // Necromancer
			63, // Paladin
			64, // Sorceress
			65, // Assassin
			66, // Druid
			68, // Orbs
			69, // Voodoo Heads
			70, // Auric Shields
			71, // Primal Helms
			72, // Pelt
			73, // Cloak
			75, // Circlets
			//82, // Small Charm
			//83, // Medium Charm
			//84, // Large Charm
			85, // Amazon Bows
			86, // Amazon Spears
			87, // Amazon Javelins
			88 // Assassin Claws
		];

		do {
			if (locationsToCheck.indexOf(item.location) !== -1) {
				if (itemTypesToShare.indexOf(item.itemType) !== -1) {
					if (!this.isInOfferedGearHistory(item)) {
						let pickResult = Pickit.checkItem(item);

						if (pickResult.result === 0 || pickResult.result === 1) {
							//if (!AutoMule.isIngredient(item)) {
							if (HordeSettings.Debug.Verbose.sharing) {
								print("[ÿc5Sharing.jsÿc0] Can share " + Pickit.itemColor(item) + item.name.trim() + " (gid: " + item.gid + " - result: " + pickResult.result + " - line: " + pickResult.line);
							}

							sharableItems.push(copyUnit(item));
							/*
							} else if (HordeSettings.Debug.Verbose.sharing) {
								print("Skipping ingredient: " + Pickit.itemColor(item) + item.name.trim() + " (gid: " + item.gid + ")");
							} */
						}
					}
				}
			}
		} while (item.getNext());

		return sharableItems;
	},

	runeNeeds: {},
	runeOffers: {},
	runeDropDone: false,
	runePickDone: false,

	clearRuneSharingData: function () {
		this.runeNeeds = {};
		this.runeOffers = {};
		this.runeDropDone = false;
		this.runePickDone = false;
	},

	onReceiveRuneNeedList: function (profile, runes) {
		this.runeNeeds[profile] = { runes: runes, status: runes.length > 0 ? "need" : "done" };

		if (profile === me.profile) {
			if (HordeSettings.Debug.Verbose.sharing) print("[ÿc5Sharing.jsÿc0] Sending need " + JSON.stringify(runes));
			Communication.sendToList(HordeSystem.allTeamProfiles, "sharing rune need " + JSON.stringify(runes));
		}
	},

	onReceiveRuneOfferList: function (profile, runes) {
		this.runeOffers[profile] = runes;
	},

	onReceiveRuneDropList: function (profile, runes) {
		this.dropRune(profile, runes);
	},

	isRuneSharingEnabled: function () {
		if (HordeSystem.team.enableRuneSharing !== undefined) return eval(HordeSystem.team.enableRuneSharing);

		return this.isGearSharingEnabled(); // Fallback on gear sharing activation
	},

	hasReceivedAllProfilesNeedList: function () {
		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			if (!this.runeNeeds[HordeSystem.allTeamProfiles[i]]) return false;
		}

		return true;
	},

	hasReceivedAllProfilesOfferList: function () {
		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			if (HordeSystem.allTeamProfiles[i] !== me.profile) {
				if (!this.runeOffers[HordeSystem.allTeamProfiles[i]]) return false;
			}
		}

		return true;
	},

	getRuneRequestProfile: function () {
		let lowestPrioProfile = false;
		let lowestPrio = 100;

		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			let profile = HordeSystem.allTeamProfiles[i];

			if (this.runeNeeds[profile].status !== "done") {
				if (!!HordeSystem.team.profiles[profile].gearPriority) {
					if (lowestPrio > HordeSystem.team.profiles[profile].gearPriority) {
						lowestPrio = HordeSystem.team.profiles[profile].gearPriority;
						lowestPrioProfile = profile;
					}
				}
			}
		}
		return lowestPrioProfile;
	},

	getOfferList: function (requestProfile, needList) {
		let item = me.getItem();
		let offerList = [];

		if (!!item) {
			do {
				if ([3, 7].indexOf(item.location) !== -1 && (!AutoMule.isIngredient(item) || !this.hasGearPriority(requestProfile))) {
					let runeListIndex = needList.indexOf(item.classid);

					if (runeListIndex !== -1) {
						offerList.push(item.classid);
					}
				}
			} while (item.getNext());
		}

		return offerList;
	},

	processOfferList: function () {
		let keyNeeds = Role.uberChar ? Role.getKeysNeeds() : false;

		for (let i = 0; i < HordeSystem.allTeamProfiles.length; i++) {
			let profile = HordeSystem.allTeamProfiles[i];

			if (profile != me.profile) {
				let requestedRunes = [];

				if (this.runeOffers[profile].length > 0) {
					for (let j = 0; j < this.runeOffers[profile].length; j++) {

						// Accept runewords ingredient
						if (Runewords.needList.indexOf(this.runeOffers[profile][j]) !== -1) {
							requestedRunes.push(this.runeOffers[profile][j]);

              // Accept cubing ingredients
						}	else if (this.isInCubingNeedlist(this.runeOffers[profile][j])) {
							requestedRunes.push(this.runeOffers[profile][j]);

              // Accept keys
						}	else if (Role.uberChar && [647, 648, 649].indexOf(this.runeOffers[profile][j]) !== -1) {
							switch (this.runeOffers[profile][j]) {
							case 647:
								if (keyNeeds.terror > 0) {
									keyNeeds.terror--;
									requestedRunes.push(647);
								}

								break;
							case 648:
								if (keyNeeds.hate > 0) {
									keyNeeds.hate--;
									requestedRunes.push(648);
								}

								break;
							case 649:
								if (keyNeeds.dest > 0) {
									keyNeeds.dest--;
									requestedRunes.push(649);
								}
								
								break;
							}
						}
					}
				}

				if (requestedRunes.length > 0) {
					this.requestDropRune(profile, requestedRunes);
				}
			}
		}

		this.onReceiveRuneNeedList(me.profile, []);
	},

	requestDropRune: function (profile, runeList) {
		if (HordeSettings.Debug.Verbose.sharing) {
			HordeDebug.logScriptInfo("RuneSharing", "requesting " + profile + " to drop " + JSON.stringify(runeList));
		}

		this.runeDropDone = false;

		Communication.sendToProfile(profile, "sharing rune drop " + JSON.stringify(runeList));

		Town.goToTown(Party.lowestAct);
		Town.move("stash");

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] Waiting " + profile + " to drop " + runeList.length + " runes");
		}

		while (!this.runeDropDone) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc5Sharing.jsÿc0] Picking runes from " + profile);
		}

		delay(me.ping + 50);
		Pickit.pickItems();

		Communication.sendToProfile(profile, "sharing rune pick done");
	},

	dropRune: function (profile, runeList) {
		if (HordeSettings.Debug.Verbose.sharing) print("[ÿc5Sharing.jsÿc0] Dropping " + JSON.stringify(runeList) + " for " + profile);

		Town.goToTown(Party.lowestAct);
		Town.move("stash");

		let item = me.getItem();
		let itemsToDrop = [];

		do {
			if ([3, 7].indexOf(item.location) !== -1) {
				let runeListIndex = runeList.indexOf(item.classid);

				if (runeListIndex !== -1) {
					itemsToDrop.push(copyUnit(item));
					runeList.splice(runeListIndex, 1);
				}
			}
		} while (item.getNext());

		for (var i = 0; i < itemsToDrop.length; i++) {
			if (HordeSettings.Debug.Verbose.sharing) {
				HordeDebug.logScriptInfo("RuneSharing", "dropping " + itemsToDrop[i].name + " for " + profile);
			}
			itemsToDrop[i].drop();
		}

		delay(me.ping + 50);

		this.runePickDone = false;

		Communication.sendToProfile(profile, "sharing rune drop done");

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc4dropRuneÿc0] Waiting for " + profile + " to pick " + itemsToDrop.length + " runes");
		}

		while (!this.runePickDone) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc4dropRuneÿc0] Runes picked by " + profile);
		}

		delay(me.ping + 50);
		Pickit.pickItems();
	},

	isInCubingNeedlist: function (classid) {
		for (let i = 0; i < Cubing.neededIngredients.length; i++) {
			if (Cubing.neededIngredients[i].classid === classid) return true;
		}

		return false;
	},

	getCraftingNeedList: function () {
		let needList = [];

		for (let i = 0; i < Runewords.needList.length; i++) {
			if (needList.indexOf(Runewords.needList[i]) === -1) needList.push(Runewords.needList[i]);
		}

		for (let i = 0; i < Cubing.neededIngredients.length; i++) {
			let ingredientClassId = Cubing.neededIngredients[i].classid;

			if ((ingredientClassId >= 610 && ingredientClassId <= 642) // Runes
				|| (ingredientClassId >= 557 && ingredientClassId <= 586) // Gems
				|| (ingredientClassId >= 597 && ingredientClassId <= 601)) { // Skulls
				if (needList.indexOf(ingredientClassId) === -1) {
					needList.push(ingredientClassId);
				}
			}
		}

		if (Role.uberChar) {
			var keyNeeds = Role.getKeysNeeds();

      // Terror Keys
			if (keyNeeds.terror > 0) {
				needList.push(647);
			}

      // Hate Keys
			if (keyNeeds.hate > 0) {
				needList.push(648);
			}

      // Destruction Keys
			if (keyNeeds.dest > 0) {
				needList.push(649);
			}
		}

		return needList;
	},

	shareRunes: function () {
		if (HordeSystem.teamSize === 1 || !this.isRuneSharingEnabled()) {
      return;
    }

		this.clearRuneSharingData();

		if (!Party.waitSynchro("begin_runes")) {
			HordeDebug.logCriticalError("rune sharing", "begin_runes synchro failed");
			quit();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
			print("[ÿc2Start shareRunesÿc0] :: Start rune sharing");
		}

		this.onReceiveRuneNeedList(me.profile, this.getCraftingNeedList());

		while (!this.hasReceivedAllProfilesNeedList()) {
			delay(50);
			Party.wholeTeamInGame();
		}

		if (HordeSettings.Debug.Verbose.sharing) {
      print("[ÿc8shareRunesÿc0] Received all rune need lists");
    }

		var requestProfile = this.getRuneRequestProfile();

		if (requestProfile) {
			do {
				if (requestProfile === me.profile) {
					if (HordeSettings.Debug.Verbose.sharing) print("[ÿc2shareRunesÿc0] Waiting offer list ... ");
					while (!this.hasReceivedAllProfilesOfferList()) {
						delay(50);
						Party.wholeTeamInGame();
					}

					if (HordeSettings.Debug.Verbose.sharing) {
            print("[ÿc8shareRunesÿc0] Processing offer list ... ");
          }

					this.processOfferList();

				} else {
					if (HordeSettings.Debug.Verbose.sharing) {
            print("[ÿc2shareRunesÿc0] Sending offers to " + requestProfile);
          }

					Communication.sendToProfile(requestProfile, "sharing rune offer " + JSON.stringify(this.getOfferList(requestProfile, this.runeNeeds[requestProfile].runes)));

					if (HordeSettings.Debug.Verbose.sharing) {
						print("[ÿc8shareRunesÿc0] Waiting " + requestProfile + " to process need list ... ");
					}

					while (this.runeNeeds[requestProfile].status !== "done") {
						delay(50);
						Party.wholeTeamInGame();
					}
				}

				requestProfile = this.getRuneRequestProfile();
			} while (requestProfile);
		}

		if (HordeSettings.Debug.Verbose.sharing) {
      print("[ÿc8shareRunesÿc0] Waiting for all profiles to finish rune sharing ... ");
    }

		Party.waitSynchro("end_rune");

		if (HordeSettings.Debug.Verbose.sharing) {
      print("[ÿc1End shareRunesÿc0] :: Rune sharing done");
    }

		this.clearRuneSharingData();

		Pickit.pickItems();
	}
};