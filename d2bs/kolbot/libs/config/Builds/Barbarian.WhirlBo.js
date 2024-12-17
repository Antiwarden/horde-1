/**
 * @desc Barbarian (Whirlwind + Battle Orders)
 */
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };
if (!isIncluded("common/Town.js")) { include("common/Town.js"); };

var AutoBuildTemplate = {

	1: {
		//SkillPoints: [-1], // This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1,-1,-1,-1,-1], // This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.LowGold = 500;
			Config.StashGold = 200; // Minimum amount of gold to stash

			Config.AttackSkill = [0, 0, 0, 0, 0];
			Config.LowManaSkill = [0];

			Config.BeltColumn = ["hp", "hp", "hp", "hp"]; // Keep tons of health potions!
			Config.MinColumn = [0, 0, 0, 0];

      Config.ScanShrines = [15, 1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13];

			Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;
			Config.MPBuffer = 0;

			Config.UseHP = 60;
      Config.DodgeHP = 40;
      Config.UseRejuv = 30;
      Config.TownHP = 20;
      Config.LifeChicken = 10;

			Config.TownCheck = false; // Don't go to town for more potions

			Config.Dodge = true;
			Config.DodgeRange = 5;
		}
	},

	2: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	3: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	4: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "hp", "mp"];
		}
	},

	5: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.MinColumn = [1, 1, 1, 1];
			Config.LowGold = 2000;
		}
	},

	6: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	7: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	8: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	9: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	10: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 10000;
			Config.StashGold = 1000;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 2;
			Config.MPBuffer = 0;

      Config.UseHP = 65;
      Config.DodgeHP = 50;
      Config.UseRejuv = 40;
      Config.TownHP = 30;
      Config.LifeChicken = 15;
		}
	},

	11: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	12: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	13: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	14: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	15: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	16: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.TownCheck = true; // Go to town for more potions
		}
	},

	17: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	18: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	19: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	20: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 20000;
			Config.StashGold = 2500;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;
			Config.MPBuffer = 0;

      Config.UseHP = 70;
      Config.DodgeHP = 60;
      Config.UseRejuv = 50;
      Config.TownHP = 40;
      Config.LifeChicken = 20;
		}
	},

	21: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	22: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	23: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	24: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "mp", "rv"]; // Regular potion settings
			Config.MinColumn = [1, 1, 1, 0]; // Regular potion settings
		}
	},

	25: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [149, 0, 0, 0, 0]; // Battle Orders
		}
	},

	26: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	27: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	28: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	29: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	30: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [149, 151, 149, 151, 149]; // Whirlwind: 151; Battle Orders: 149
			Config.LowManaSkill[0] = 151; // Whirlwind

			Config.LowGold = 40000;
			Config.StashGold = 5000;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;
			Config.MPBuffer = 0;

			Config.UseHP = 75;
      Config.DodgeHP = 70;
      Config.UseRejuv = 60;
      Config.TownHP = 50;
      Config.LifeChicken = 25;
		}
	},

	31: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	32: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	33: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	34: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	35: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	36: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	37: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	38: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	39: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	40: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 70000;
			Config.StashGold = 7500;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;
			Config.MPBuffer = 0;

      Config.UseHP = 80;
      Config.DodgeHP = 80;
      Config.UseRejuv = 70;
      Config.TownHP = 55;
      Config.LifeChicken = 27;
		}
	},

	41: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	42: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	43: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	44: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	45: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 80000;
		}
	},

	46: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	47: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	48: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	49: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	50: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 100000;
			Config.StashGold = 10000;

			Config.MinColumn = [1, 1, 1, 0]; // Should have a decent belt by now
			Config.BeltColumn = ["hp", "hp", "mp", "rv"];

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;
			Config.MPBuffer = 0;

			Config.UseHP = 85;
      Config.DodgeHP = 85;
      Config.UseRejuv = 70;
      Config.TownHP = 55;
      Config.LifeChicken = 28;
		}
	},

	51: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	52: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	53: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	54: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	55: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 100000;
		}
	},

	56: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	57: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	58: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	59: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	60: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 150000;
			Config.StashGold = 15000;
      
      Config.MinColumn = [1, 1, 0, 0];
      Config.BeltColumn = ["hp", "hp", "rv", "rv"];

			Config.HPBuffer = 4;
			Config.MPBuffer = 4;

      Config.UseHP = 87;
      Config.DodgeHP = 87;
      Config.UseRejuv = 72;
      Config.TownHP = 55;
      Config.LifeChicken = 29;
		}
	},

	61: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	62: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	63: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	64: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	65: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	66: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	67: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	68: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	69: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	70: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 200000;
			Config.StashGold = 20000;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;

      Config.UseHP = 90;
      Config.DodgeHP = 90;
      Config.UseRejuv = 73;
      Config.TownHP = 55;
      Config.LifeChicken = 30;
		}
	},

	71: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	72: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	73: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	74: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	75: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 250000;
			Config.StashGold = 25000;
		}
	},

	76: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	77: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	78: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	79: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	80: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 300000;
			Config.StashGold = 30000;

      Config.RejuvBuffer = 4;
			Config.HPBuffer = 4;

			Config.UseHP = 93;
      Config.DodgeHP = 95;
      Config.UseRejuv = 74;
      Config.TownHP = 55;
      Config.LifeChicken = 33;
		}
	},

	81: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	82: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	83: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	84: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	85: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	86: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	87: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	88: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	89: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	90: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	91: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	92: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	93: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	94: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	95: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	96: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	97: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	98: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	},

	99: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
		}
	}
};