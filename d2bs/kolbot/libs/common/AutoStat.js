/**
*	@filename	AutoStat.js
*	@author		IMBA
*	@desc		Automatically allocate stat points
*/

var AutoStat = new function () {
	this.statBuildOrder = [];
	this.save = 0;
	this.block = 0;
	this.bulkStat = true;

	/*	statBuildOrder - array of stat points to spend in order
		save - remaining stat points that will not be spent and saved.
		block - an integer value set to desired block chance. This is ignored in classic.
		bulkStat - set true to spend multiple stat points at once (up to 100), or false to spend 1 point at a time.

		statBuildOrder Settings
		The script will stat in the order of precedence. You may want to stat strength or dexterity first.

		Set stats to desired integer value, and it will stat *hard points up to the desired value.
		You can also set to string value "all", and it will spend all the remaining points.
		Dexterity can be set to "block" and it will stat dexterity up the the desired block value specified in arguemnt (ignored in classic).

		statBuildOrder = [
			["strength", 25], ["energy", 75], ["vitality", 75],
			["strength", 55], ["vitality", "all"]
		];
	*/

	this.getBlock = function () {
		let shield = false;
		let item = me.getItem(-1, 1);

		// Make sure character has shield equipped
		if (item) {
			do {
				if ([4, 5].indexOf(item.bodylocation) > -1 && [2, 51, 69, 70].indexOf(item.itemType) > -1) {
					shield = true;
				}
			} while (item.getNext());
		}

		if (!shield) {
			return this.block;
		}

		// Cast Holy Shield if available
		if (me.getSkill(117, 0) && !me.getState(101)) {
			if (Precast.precastSkill(117)) {
				delay(1000);
			} else {
				return this.block;
			}
		}

		if (me.gametype === 0) { // Classic
			return Math.floor(me.getStat(20) + getBaseStat(15, me.classid, 23));
		}

		return Math.min(75, Math.floor((me.getStat(20) + getBaseStat(15, me.classid, 23)) * (me.getStat(2) - 15) / (me.charlvl * 2)));
	};

	// This check may not be necessary with this.validItem(), but consider it double check
	this.verifySetStats = function (unit, type, stats) { // Verify that the set bonuses are there
		let string;

		if (type === 0) {
			string = 3473 // To strength
		} else {
			string = 3474 // To dexterity
		}

		if (unit) {
			let temp = unit.description.split("\n");

			for (let i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(string), "i")) {
					if (parseInt(temp[i].replace(/(y|ÿ)c[0-9!"+<;.*]/, ""), 10) === stats) {
						return true;
					}
				}
			}
		}

		return false;
	};

	this.validItem = function (item) {
		// Ignore item bonuses from secondary weapon slot
		if (me.gametype === 1 && [11, 12].indexOf(item.bodylocation) > -1) {
			return false;
		}

		// Check if character meets str, dex, and level requirement since stat bonuses only apply when they are active
		return me.getStat(0) >= item.strreq && me.getStat(2) >= item.dexreq && me.charlvl >= item.lvlreq;
	};

	this.setBonus = function (type) { // Get stats from set bonuses
		if (type === 1 || type === 3) { // Set bonuses do not have energy or vitality (we can ignore this)
			return 0;
		}

		var sets = { // These are the only sets with possible stat bonuses
			"angelic": [], "artic": [], "civerb": [], "iratha": [],
			"isenhart": [], "vidala": [], "cowking": [], "disciple": [],
			"griswold": [], "mavina": [], "naj": [], "orphan": []
		};

		let j;
		let setStat = 0;
		let items = me.getItems();

		if (items) {
			for (let i = 0; i < items.length; i += 1) {
				if (items[i].mode === 1 && items[i].quality === 5 && this.validItem(items[i])) {
					idSwitch:
					switch (items[i].classid) {
					case 311: // Crown
						if (items[i].getStat(41) === 30) { // Light resist
							sets.iratha.push(items[i]);
						}

						break;
					case 337: // Light Gauntlets
						if (items[i].getStat(7) === 20) { // Life
							sets.artic.push(items[i]);
						} else if (items[i].getStat(43) === 30) { // Cold resist
							sets.iratha.push(items[i]);
						}

						break;
					case 340: // Heavy Boots
						if (items[i].getStat(2) === 20) { // Dexterity
							sets.cowking.push(items[i]);
						}

						break;
					case 347: // Heavy Nelt
						if (items[i].getStat(21) === 5) { // Min damage
							sets.iratha.push(items[i]);
						}

						break;
					case 520: // Amulet
						if (items[i].getStat(114) === 20) { // Damage to mana
							sets.angelic.push(items[i]);
						} else if (items[i].getStat(74) === 4) { // Replenish life
							sets.civerb.push(items[i]);
						} else if (items[i].getStat(110) === 75) { // Poison length reduced
							sets.iratha.push(items[i]);
						} else if (items[i].getStat(43) === 20) { // Cold resist
							sets.vidala.push(items[i]);
						} else if (items[i].getStat(43) === 18) { // Cold resist
							sets.disciple.push(items[i]);
						}

						break;
					case 522: // Ring
						if (items[i].getStat(74) === 6) { // Replenish life
							for (j = 0; j < sets.angelic.length; j += 1) { // Do not count ring twice
								if (sets.angelic[j].classid === items[i].classid) {
									break idSwitch;
								}
							}

							sets.angelic.push(items[i]);
						}

						break;
					case 27: // Sabre
						for (j = 0; j < sets.angelic.length; j += 1) { // Do not count twice in case of dual wield
							if (sets.angelic[j].classid === items[i].classid) {
								break idSwitch;
							}
						}

						sets.angelic.push(items[i]);

						break;
					case 317: // Ring Mail
						sets.angelic.push(items[i]);

						break;
					case 74: // Short War Bow
					case 313: // Quilted Armor
					case 345: // Light Belt
						sets.artic.push(items[i]);

						break;
					case 16: // Grand Scepter
						for (j = 0; j < sets.civerb.length; j += 1) { // Do not count twice in case of dual wield
							if (sets.civerb[j].classid === items[i].classid) {
								break idSwitch;
							}
						}

						sets.civerb.push(items[i]);

						break;
					case 330:
						sets.civerb.push(items[i]);

						break;
					case 30: // Broad Sword
						for (j = 0; j < sets.isenhart.length; j += 1) { // Do not count twice in case of dual wield
							if (sets.isenhart[j].classid === items[i].classid) {
								break idSwitch;
							}
						}

						sets.isenhart.push(items[i]);

						break;
					case 309: // Full Helm
					case 320: // Breast Plate
					case 333: // Gothic Shield
						sets.isenhart.push(items[i]);

						break;
					case 73: // Long Battle Bow
					case 314: // Leather Armor
					case 342: // Light Plated Boots
						sets.vidala.push(items[i]);

						break;
					case 316: // Studded Leather
					case 352: // War hat
						sets.cowking.push(items[i]);

						break;
					case 385: // Demonhide Boots
					case 429: // Dusk Shroud
					case 450: // Bramble Mitts (Laying Hands)
					case 462: // Mithril Coil
						sets.disciple.push(items[i]);

						break;
					case 213: // Caduceus
						for (j = 0; j < sets.griswold.length; j += 1) { // Do not count twice in case of dual wield
							if (sets.griswold[j].classid === items[i].classid) {
								break idSwitch;
							}
						}

						sets.griswold.push(items[i]);

						break;
					case 372: // Ornate Plate
					case 427: // Corona
					case 502: // Vortex Shield
						sets.griswold.push(items[i]);

						break;
					case 302: // Grand Matron Bow
					case 383: // Battle Gauntlets
					case 391: // Sharkskin Belt
					case 421: // Diadem
					case 439: // Kraken Shell
						sets.mavina.push(items[i]);

						break;
					case 261: // Elder Staff
					case 418: // Circlet
					case 438: // Hellforge Plate
						sets.naj.push(items[i]);

						break;
					case 356: // Winged Helm (Guillaumes' Face)
					case 375: // Round Shield
					case 381: // Sharkskin Gloves
					case 393: // Battle Belt
						sets.orphan.push(items[i]);

						break;
					}
				}
			}
		}

		for (i in sets) {
			if (sets.hasOwnProperty(i)) {
				MainSwitch:
				switch (i) {
				case "angelic":
					if (sets[i].length >= 2 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					break;
				case "artic":
					if (sets[i].length >= 2 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 5)) {
								break MainSwitch;
							}
						}

						setStat += 5;
					}

					break;
				case "civerb":
					if (sets[i].length === 3 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 15)) {
								break MainSwitch;
							}
						}

						setStat += 15;
					}

					break;
				case "iratha":
					if (sets[i].length === 4 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 15)) {
								break MainSwitch;
							}
						}

						setStat += 15;
					}

					break;
				case "isenhart":
					if (sets[i].length >= 2 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					if (sets[i].length >= 3 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					break;
				case "vidala":
					if (sets[i].length >= 3 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 15)) {
								break MainSwitch;
							}
						}

						setStat += 15;
					}

					if (sets[i].length === 4 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					break;
				case "cowking":
					if (sets[i].length === 3 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 20)) {
								break MainSwitch;
							}
						}

						setStat += 20;
					}

					break;
				case "disciple":
					if (sets[i].length >= 4 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					break;
				case "griswold":
					if (sets[i].length >= 2 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 20)) {
								break MainSwitch;
							}
						}

						setStat += 20;
					}

					if (sets[i].length >= 3 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 30)) {
								break MainSwitch;
							}
						}

						setStat += 30;
					}

					break;
				case "mavina":
					if (sets[i].length >= 2 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 20)) {
								break MainSwitch;
							}
						}

						setStat += 20;
					}

					if (sets[i].length >= 3 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 30)) {
								break MainSwitch;
							}
						}

						setStat += 30;
					}

					break;
				case "naj":
					if (sets[i].length === 3 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 15)) {
								break MainSwitch;
							}
						}

						setStat += 15;
					}

					if (sets[i].length === 3 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 20)) {
								break MainSwitch;
							}
						}

						setStat += 20;
					}

					break;
				case "orphan":
					if (sets[i].length === 4 && type === 2) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 10)) {
								break MainSwitch;
							}
						}

						setStat += 10;
					}

					if (sets[i].length === 4 && type === 0) {
						for (j = 0; j < sets[i].length; j += 1) {
							if (!this.verifySetStats(sets[i][j], type, 20)) {
								break MainSwitch;
							}
						}

						setStat += 20;
					}

					break;
				}
			}
		}

		return setStat;
	};

	// Return stat values excluding stat bonuses from sets and/or items
	this.getHardStats = function (type) {
		let statID;

		switch (type) {
		case 0: // Strength
			type = 0;
			statID = 220;

			break;
		case 1: // Energy
			type = 1;
			statID = 222;

			break;
		case 2: // Dexterity
			type = 2;
			statID = 221;

			break;
		case 3: // Vitality
			type = 3;
			statID = 223;

			break;
		}

		let addedStat = 0;
		let items = me.getItems();

		if (items) {
			for (let i = 0; i < items.length; i += 1) {
				// items equipped or charms in inventory
				if ((items[i].mode === 1 || (items[i].location === 3 && [82, 83, 84].indexOf(items[i].itemType) > -1)) && this.validItem(items[i])) {
					// stats
					if (items[i].getStat(type)) {
						addedStat += items[i].getStat(type);
					}

					// stats per level
					if (items[i].getStat(statID)) {
						addedStat += Math.floor(items[i].getStat(statID) / 8 * me.charlvl);
					}
				}
			}
		}

		return (me.getStat(type) - addedStat - this.setBonus(type));
	};

	this.requiredDex = function () {
		let set = false;
		let inactiveDex = 0;
		let items = me.getItems();

		if (items) {
			for (let i = 0; i < items.length; i += 1) {
				// Items equipped but inactive (these are possible dex sources unseen by me.getStat(2))
				if (items[i].mode === 1 && [11, 12].indexOf(items[i].bodylocation) === -1 && !this.validItem(items[i])) {
					if (items[i].quality === 5) {
						set = true;

						break;
					}

					// Stats
					if (items[i].getStat(2)) {
						inactiveDex += items[i].getStat(2);
					}

					// Stats per level
					if (items[i].getStat(221)) {
						inactiveDex += Math.floor(items[i].getStat(221) / 8 * me.charlvl);
					}
				}
			}
		}

		// Just stat 1 at a time if there's set item (there could be dex bonus for currently inactive set)
		if (set) {
			return 1;
		}

		// Returns amount of dexterity required to get the desired block chance
		return Math.ceil((2 * me.charlvl * this.block) / (me.getStat(20) + getBaseStat(15, me.classid, 23)) + 15) - me.getStat(2) - inactiveDex;
	};

	this.useStats = function (type, goal = false) {
		let currStat = me.getStat(4);
		let tick = getTickCount();

		// Use 0x3a packet to spend multiple stat points at once (up to 100)
		if (this.bulkStat) {
			if (goal) {
				sendPacket(1, 0x3a, 1, type, 1, Math.min(me.getStat(4) - this.save - 1, goal - 1, 99));
			} else {
				sendPacket(1, 0x3a, 1, type, 1, Math.min(me.getStat(4) - this.save - 1, 99));
			}
		} else {
			useStatPoint(type);
		}

		while (getTickCount() - tick < 3000) {
			if (currStat > me.getStat(4)) {
				let statIDToString = [getLocaleString(4060), getLocaleString(4069), getLocaleString(4062), getLocaleString(4066)];
				print("[ÿc7AutoStat.jsÿc0] Using " + (currStat - me.getStat(4)) + " stat points in " + statIDToString[type]);
				return true;
			}

			delay(100);
		}

		return false;
	};

	this.addStatPoint = function () {
		let hardStats;
		this.remaining = me.getStat(4);

		for (let i = 0; i < this.statBuildOrder.length; i += 1) {
			switch (this.statBuildOrder[i][0]) {
			case 0:
			case "s":
			case "str":
			case "strength":
				if (typeof this.statBuildOrder[i][1] === "string") {
					switch (this.statBuildOrder[i][1]) {
					case "all":
						return this.useStats(0);
					default:
						break;
					}
				} else {
					hardStats = this.getHardStats(0);

					if (hardStats < this.statBuildOrder[i][1]) {
						return this.useStats(0, this.statBuildOrder[i][1] - hardStats);
					}
				}

				break;
			case 1:
			case "e":
			case "enr":
			case "energy":
				if (typeof this.statBuildOrder[i][1] === "string") {
					switch (this.statBuildOrder[i][1]) {
					case "all":
						return this.useStats(1);
					default:
						break;
					}
				} else {
					hardStats = this.getHardStats(1);

					if (hardStats < this.statBuildOrder[i][1]) {
						return this.useStats(1, this.statBuildOrder[i][1] - hardStats);
					}
				}

				break;
			case 2:
			case "d":
			case "dex":
			case "dexterity":
				if (typeof this.statBuildOrder[i][1] === "string") {
					switch (this.statBuildOrder[i][1]) {
					case "block":
						if (me.gametype === 1) {
							if (this.getBlock() < this.block) {
								return this.useStats(2, this.requiredDex());
							}
						}

						break;
					case "all":
						return this.useStats(2);
					default:
						break;
					}
				} else {
					hardStats = this.getHardStats(2);

					if (hardStats < this.statBuildOrder[i][1]) {
						return this.useStats(2, this.statBuildOrder[i][1] - hardStats);
					}
				}

				break;
			case 3:
			case "v":
			case "vit":
			case "vitality":
				if (typeof this.statBuildOrder[i][1] === "string") {
					switch (this.statBuildOrder[i][1]) {
					case "all":
						return this.useStats(3);
					default:
						break;
					}
				} else {
					hardStats = this.getHardStats(3);

					if (hardStats < this.statBuildOrder[i][1]) {
						return this.useStats(3, this.statBuildOrder[i][1] - hardStats);
					}
				}

				break;
			}
		}

		return false;
	};

	this.remaining = 0;
	this.count = 0;

	this.init = function (statBuildOrder, save = 0, block = 0, bulkStat = true) {
		this.statBuildOrder = statBuildOrder;
		this.save = save;
		this.block = block;
		this.bulkStat = bulkStat;

		if (!this.statBuildOrder || !this.statBuildOrder.length) {
			print("[ÿc7AutoStat.jsÿc0] No build array specified");

			return false;
		}

		while (me.getStat(4) > this.save) {
			this.addStatPoint();
			delay(150 + me.ping); // Spending multiple single stat at a time with short delay may cause r/d

			// Break out of loop if we have stat points available but finished allocating as configured
			if (me.getStat(4) === this.remaining) {
				this.count += 1;
			}

			if (this.count > 2) {
				break;
			}
		}

		print("[ÿc7AutoStat.jsÿc0] Finished allocating stat points");

		return true;
	};

	return true;
};