/**
*	@filename	Quest.js
*	@author		Adpist
*	@desc		Quests management
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var Quest = {
	initialTownArea: 0,

	getQuestItem: function (classid, chestid) { // Accepts classid only or a classid/chestid combination.
		let item;

		if (me.findItem(classid)) { // Don't open "chest" or try picking up item if we already have it.
			return true;
		}

		if (me.inTown) {
			return false;
		}

		if (arguments.length > 1) {
			let chest = getUnit(2, chestid);

			if (chest) {
				Misc.openChest(chest);
			}
		}

		for (let i = 0; i < 50; i += 1) { // Give the quest item plenty of time (up to two seconds) to drop because if it's not detected the function will end.
			item = getUnit(4, classid);

			if (item) {
				break;
			}

			delay(40);
		}

		while (!me.findItem(classid)) { // Try more than once in case someone beats me to it.
			item = getUnit(4, classid);

			if (item) {
				if (Storage.Inventory.CanFit(item)) {
					Pickit.pickItem(item);

					if (me.findItem(classid)) {
						break;
					}

					delay(me.ping * 2 + 500);

				} else {
					if (Pickit.canMakeRoom()) {
						print("[ÿc5Quest.jsÿc0] Trying to make room for " + Pickit.itemColor(item) + item.name.trim());

						Town.visitTown(); // Go to Town and do chores. Will throw an error if it fails to return from Town.
					} else {
						print("[ÿc5Quest.jsÿc0] Not enough room for " + Pickit.itemColor(item) + item.name.trim());

						return false;
					}
				}

			} else {
				return false;
			}
		}

		return true;
	},

	cubeStaff: function () {
		print("[ÿc5Quest.jsÿc0] Cubing Horadric Staff");

		let amulet = me.getItem("vip");
		let staff = me.getItem("msf");

		if (!staff || !amulet) {
			return false;
		}

		Town.move("stash");

		if (!Town.openStash()) {
			Town.openStash();
		}

		Storage.Cube.MoveTo(amulet);
		Storage.Cube.MoveTo(staff);

		Cubing.openCube();
		transmute();

		delay(750 + me.ping);

		Cubing.emptyCube();
		me.cancel();

		return true; // (<3 kolton)
	},

	placeStaff: function () {
		print("[ÿc5Quest.jsÿc0] Placing Horadric Staff");

		var tick = getTickCount();
		var preArea = me.area;

		Town.goToTown();
		Town.move("stash");

		HordeStorage.toInventory(91); // Get Staff

		Town.move("portalspot");

		if (!Pather.usePortal(preArea, me.name)) {
			throw new Error("placeStaff: Failed to take TP");
		}

		delay(1000);
		let orifice = getUnit(2, 152);

		if (!orifice) {
			return false;
		}

		Misc.openChest(orifice);
		let staff = me.getItem(91);

		if (!staff) {
			if (getTickCount() - tick < 500) {
				delay(500);
			}

			return false;
		}

		staff.toCursor();
		submitItem();

		delay(750 + me.ping);

		/*/ unbug cursor
		item = me.findItem(-1, 0, 3);

		if (item && item.toCursor()) {
			while (getUnit(100)) {
				Storage.Inventory.MoveTo(item);

				delay(me.ping * 2 + 500);
			}
		}*/

		return true;
	},

	cubeFlail: function () {
		let eye = me.getItem(553);
		let heart = me.getItem(554);
		let brain = me.getItem(555);
		let flail = me.getItem(173);

		print("[ÿc5Quest.jsÿc0] Cubing Khalim's Flail");

		if (me.getItem(174)) { // Already have the finished Flail.
			return true;
		}

		if (!eye || !heart || !brain || !flail) {
			// Might as well have lost the already cubed flail somewhere and now need someone who needs trav quest done
			print("ÿc9[Warning] :: [ÿc5Quest.jsÿc0] Cannot cube flail due to a missing ingredient.");

			return false;
		}

		Town.move("stash");

		if (!Town.openStash()) {
			Town.openStash();
		}

		Storage.Cube.MoveTo(eye);
		Storage.Cube.MoveTo(heart);
		Storage.Cube.MoveTo(brain);
		Storage.Cube.MoveTo(flail);

		Cubing.openCube();
		transmute();

		delay(750 + me.ping);

		Cubing.emptyCube();
		me.cancel();

		return true;
	},

	equipQuestItem: function (itemId) {
		let questItem = me.getItem(itemId);

		if (questItem) {
			if (!Item.equip(questItem, 4)) {
				Pickit.pickItems();
				throw new Error("HordeSystem.equipQuestitem: Failed to equip item " + itemId);
			}
		} else {
			throw new Error("HordeSystem.equipQuestitem: Lost item " + itemId);
		}

		if (me.itemoncursor) { // Seems like Item.equip() doesn't want to keep whatever the sorc has for a weapon, so lets put it into inventory without checking it against Pickit.
			let cursorItem = getUnit(100);

			if (cursorItem) {
				if (Storage.Inventory.CanFit(cursorItem)) {
					print("[ÿc9Warningÿc0] :: [ÿc5Quest.jsÿc0] Force keeping quest item on cursor.")
					Storage.Inventory.MoveTo(cursorItem);
				} else {
					me.cancel();
					print("[ÿc9Warningÿc0] :: [ÿc5Quest.jsÿc0] Cannot pick quest item.");

					cursorItem.drop();
				}
			}
		}

		delay(me.ping * 2 + 100);
		Pickit.pickItems(); // Will hopefully pick up the character's weapon if it was dropped.

		return true;
	},

	smashPresetUnit: function (presetID) { // SiC-666 TODO: Rename this function to smashOrb, check orb.mode in the loop and stop when it has been smashed.
		let target = getUnit(2, presetID);

		print("[ÿc5Quest.jsÿc0] Smashing quest preset " + presetID);

		if (!target) {
			throw new Error("HordeSystem.smashPresetUnit: Couldn't find target " + presetID);
		}

		Pather.moveToUnit(target, 0, 0, false, false);

		for (let i = 0; i < 5; i += 1) {
			if (target) {
				Skill.cast(0, 0, target);

				delay(500);
			}
		}

		return true;
	},

	checkAndUseConsumable: function (item) {
		if (item === undefined) {
			item = me.getItem(552) ? me.getItem(552) : me.getItem(646); // Book of Skill from Radament or Scroll of Resistance from Malah.
		}

		if (item) {
			if (!Town.openStash()) {
				Town.move("stash");
				Town.openStash();
			}

			clickItem(1, item);
			delay(me.ping > 0 ? me.ping : 50);

			me.cancel();
		}
	},

	goToHighestTown: function () {
		if (!me.getQuest(7, 0) && (me.getQuest(6, 0) || me.getQuest(6, 1))) {
			Travel.changeAct(2);
		}

		if (!me.getQuest(15, 0) && me.getQuest(7, 0)) { // If andy done, but not duriel: say("Here ****** 2");
			Town.goToTown(2);
		}

		if (!me.getQuest(15, 0) && (me.getQuest(14, 0) || me.getQuest(14, 1) || me.getQuest(14, 3) || me.getQuest(14, 4))) {
			Travel.changeAct(3); // getQuest(14, 0) = completed (talked to Meshif), (14, 3) = talked to Tyrael, (14, 4) = talked to Jerhyn
		}

		if (!me.getQuest(23, 0) && me.getQuest(15, 0)) { // If Duriel done, but not Mephisto
			Town.goToTown(3);
		}

		if (!me.getQuest(28, 0) && me.getQuest(23, 0)) { // If Mephisto done, but not Diablo
			Town.goToTown(4);
		}

		if (me.gametype !== 0) { // Expansion only
			if (!me.getQuest(28, 0) && (me.getQuest(26, 0) || me.getQuest(26, 1))) {
				Travel.changeAct(5);
			}

			if (me.getQuest(28, 0)) { // If diablo done
				Town.goToTown(5);
			}
		}

		delay(1000);

		Town.move("waypoint");
		Pather.useWaypoint(null);

		Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5)); // Move off of waypoint so others can reach it.

		this.initialTownArea = me.area;

		// Unclog WP
		if (3 === me.act || 4 === me.act) {
			Town.move("portalspot");
		}
	},

	sequenceToQuest: {
		"den": [1],
		"blood": [2],
		"cain": [4],
		"countess": [5],
		"smith": [3],
		"andy": [6, 7],
		"radament": [9],
		"amulet": [11],
		"summoner": [13],
		"staff": [10],
		"duriel": [14, 15],
		//"figurine": [20], // Skip Golden Bird quest for election for now
		"gidbinn": [19],
		"lamesen": [17],
		"eye": [18],
		"brain": [18],
		"heart": [18],
		"travincal": [21],
		"mephisto": [22, 23],
		"izual": [25],
		"hellforge": [27],
		"diablo": [26, 28],
		"shenk": [35],
		"barbrescue": [36],
		"anya": [37],
		"nihlathak": [38],
		"ancients": [39],
		"baal": [40]
	}
};