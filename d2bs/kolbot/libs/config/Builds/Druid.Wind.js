/**
 * @title Druid.Wind.js
 * @desc  Loads character configuration settings based on the
 *        character's current level at the beginning of each run.
 * @see   ...\libs\config\Druid.HordeTemplate.js
 */
js_strict(true);

if (!isIncluded("common/Cubing.js")) { include("common/Cubing.js"); };
if (!isIncluded("common/Prototypes.js")) { include("common/Prototypes.js"); };
if (!isIncluded("common/Runewords.js")) { include("common/Runewords.js"); };

var AutoBuildTemplate = {

	1: {
		//SkillPoints: [-1], // We don't have skill points to spend at lvl 1.
		//StatPoints: [-1,-1,-1,-1,-1], // We don't have stat points to spend at lvl 1.
		Update: function () {
			Config.AttackSkill = [-1, 0, -1, 0, -1, -1, -1]; // Default attack
			Config.LowManaSkill = [0, -1]; // Default attack

			Config.ScanShrines = [15, 13, 12, 14, 7, 6, 3, 2, 1]; // @see sdk.shrines

			Config.BeltColumn = ["hp", "hp", "hp", "hp"];
			Config.MinColumn = [0, 0, 0, 0];

			Config.TownCheck = false;
			Config.UseHP = 75;

			Config.OpenChests = true; // Might as well open em.
			Config.StashGold = 200; // Minimum amount of gold to stash
		}
	},

	2: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
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

		}
	},

	5: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.ScanShrines = [15, 13, 12];
			Config.MinColumn = [1, 1, 1, 0];
		}
	},

	6: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.SummonSpirit = "Oak Sage"; // 0 = disabled, 1 or "Oak Sage"; 2 or "Heart of Wolverine"; 3 or "Spirit of Barbs"
			Config.SummonAnimal = "Spirit Wolf"; // 0 = disabled, 1 or "Spirit Wolf"; 2 or "Dire Wolf"; 3 or "Grizzly"
		}
	},

	7: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			//Config.PickitFiles.splice(Config.PickitFiles.indexOf("belowlevelseven.nip"), 1); // Will remove index "belowlevel7.nip" from Config.PickitFiles
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
			Config.LowGold = 5000;
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
			Config.TownHP = 40;
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
			//Config.OpenChests = false;
		}
	},

	16: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.TownCheck = true;
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
			Config.AttackSkill = [-1, 240, -1, 240, -1, 0, -1]; // Twister
			Config.SummonAnimal = "Dire Wolf"; // 0 = disabled, 1 or "Spirit Wolf"; 2 or "Dire Wolf"; 3 or "Grizzly"
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
			Config.LowGold = 10000;
			Config.StashGold = 2500;
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
			Config.AttackSkill = [-1, 245, -1, 245, -1, 0, -1]; // Tornado
		}
	},

	25: {
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.LowGold = 15000;
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
			Config.BeltColumn = ["hp", "mp", "mp", "rv"]; // Start keeping rejuvination potions
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
			
			Config.LowGold = 20000;
			Config.StashGold = 5000;

			Config.SummonAnimal = "Grizzly"; // 0 = disabled, 1 or "Spirit Wolf"; 2 or "Dire Wolf"; 3 or "Grizzly"

			Config.HPBuffer = 2;
			Config.MPBuffer = 4;

			Config.TownHP = 45; // Before: 30
			Config.UseHP = 80;
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
			Config.LowGold = 30000;
			Config.StashGold = 10000;
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
			Config.LowGold = 35000;
			Config.StashGold = 12500;

			Config.HPBuffer = 4; // Before: 2
			Config.MPBuffer = 6; // Before: 4

			Config.TownHP = 50; // Before: 45
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
			Config.LowGold = 40000;
			Config.StashGold = 15000;
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
			Config.LowGold = 45000;

			Config.HPBuffer = 6;

			Config.TownHP = 55;
			Config.UseHP = 85;
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
			Config.LowGold = 50000;
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
			Config.LowGold = 55000;

			Config.TownHP = 60;
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
			Config.LowGold = 60000;
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
			Config.LowGold = 100000;

			Config.UseHP = 90;
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
			Config.TownHP = 65;
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
