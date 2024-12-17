/**
 * @title Paladin.HammerConcentration.js
 * @desc  Loads character configuration settings based on the
 *        character's current level at the beginning of each run.
 * @see   ...\libs\config\Paladin.HordeTemplate.js
 */
js_strict(true);

if (!isIncluded("common/Cubing.js")) include("common/Cubing.js");
if (!isIncluded("common/Prototypes.js")) include("common/Prototypes.js");
if (!isIncluded("common/Runewords.js")) include("common/Runewords.js");

var AutoBuildTemplate = {};

AutoBuildTemplate[1] = {
  //SkillPoints: [-1], // We don't have skill points to spend at lvl 1.
  //StatPoints: [-1,-1,-1,-1,-1], // We don't have stat points to spend at lvl 1.
  Update: function () {
    // Town settings
    Config.TownCheck = false; // Don't go to town for more potions
    Config.StashGold = 200; // Minimum amount of gold to stash.
    Config.HealHP = 90; // Go to a healer if under designated percent of life.
    Config.HealMP = 90; // Go to a healer if under designated percent of mana.

    // Attack settings
    Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
    Config.LowManaSkill = [0, -1]; // Hit stuff when out of Mana.
    Config.BossPriority = false; // Set to true to attack Unique/SuperUnique monsters first when clearing
    Config.ClearType = 0; // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
    Config.PrimarySlot = -1; // Set to use specific weapon slot as primary weapon slot: -1 = disabled, 0 = slot I, 1 = slot II

    Config.FCR = 0; // 0 - disable, 1 to 255 - set value of faster cast rate
    Config.FHR = 0; // 0 - disable, 1 to 255 - set value of faster hit recovery
    Config.FBR = 0; // 0 - disable, 1 to 255 - set value of faster block recovery
    Config.IAS = 0; // 0 - disable, 1 to 255 - set value of increased attack speed

    // Shrine settings
    Config.ScanShrines = [15, 13, 12, 14, 7, 6, 3, 2, 1];

    // Belt settings
    Config.BeltColumn = ["hp", "hp", "hp", "hp"]; // Keep tons of health potions!
    Config.MinColumn = [0, 0, 0, 0];

    // Potion settings
    Config.TownHP = 35; // Go to town if life is under designated percent.
    Config.TownMP = 0; // Go to town if mana is under designated percent.
    Config.HPBuffer = 4; // Number of healing potions to keep in inventory.
    Config.MPBuffer = 0; // Number of healing potions to keep in inventory.
    Config.RejuvBuffer = 4; // Number of rejuvenation potions to keep in inventory.

    // Heal settings
    Config.UseHP = 75; // Drink a healing potion if life is under designated percent.
    Config.UseRejuvHP = 50; // Drink a rejuvenation potion if life is under designated percent.
    Config.UseMP = 35; // Drink a mana potion if mana is under designated percent.
    Config.UseRejuvMP = 0; // Drink a rejuvenation potion if mana is under designated percent.
    Config.UseMercHP = 40; // Give a healing potion to your merc if his/her life is under designated percent.
    Config.UseMercRejuv = 5; // Give a rejuvenation potion to your merc if his/her life is under designated percent.

    // Merc settings
    Config.UseMerc = true; // Use merc. This is ignored and always false in d2classic.
    Config.MercWatch = false; // Instant merc revive during battle.

    // Dodge settings
    Config.Dodge = true;
    Config.DodgeHP = 75;
    Config.DodgeRange = 5;

    // Chicken settings
    if (me.playertype) {
      Config.LifeChicken = 45; // Exit game if life is less or equal to designated percent.
    } else {
      Config.LifeChicken = 10; // Exit game if life is less or equal to designated percent.
    }

    // Pickit settings
    Config.LowGold = 1000;
    Config.PickRange = 30; // Pick radius
    Config.FastPick = true; // Check and pick items between attacks
    Config.OpenChests = true; // Might as well open em.

    Config.WaypointMenu = true;
  }
};

AutoBuildTemplate[2] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 0, 98, 0, 98, -1, -1]; // Use Might
    Config.LowManaSkill = [0, 98]; // Use Might while hitting stuff

    Config.BeltColumn = ["hp", "hp", "mp", "mp"];
  }
};

AutoBuildTemplate[6] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 0, 98, 0, 98, 101, 98]; // Holy Bolt and Might for Secondary Skill/Aura

    Config.MinColumn = [1, 0, 1, 0]; // Should have a belt by now

    Config.RejuvBuffer = 2;
		Config.HPBuffer = 4;
    Config.MPBuffer = 0;

    Config.StashGold = 1000; // Minimum amount of gold to stash
  }
};

AutoBuildTemplate[10] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 5000;
  }
};

AutoBuildTemplate[12] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 0, 108, 0, 108, 101, 108]; // Use Blessed Aim
    Config.LowManaSkill = [0, 108]; // Use Blessed Aim while hitting stuff.
  }
};

AutoBuildTemplate[16] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.TownCheck = true; // Go to town for more potions
  }
};

AutoBuildTemplate[18] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 112, 113, 112, 113, 101, 113]; // Blessed Hammer and Concentration!
    Config.LowManaSkill = [0, 113]; // Use Concentration while hitting stuff.

    Config.Vigor = true; // Swith to Vigor when running
    Config.Charge = false; // Don't waste mana on charging while walking
  }
};

AutoBuildTemplate[20] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 10000;
    Config.StashGold = 5000;

    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "hp", "mp", "mp"];
    Config.MinColumn = [1, 1, 1, 0];

    Config.RejuvBuffer = 4;
		Config.HPBuffer = 2;
    Config.MPBuffer = 2;

    Config.UseHP = 60;
    Config.DodgeHP = 40;
    Config.UseRejuvHP = 30;
    Config.TownHP = 20;
    Config.LifeChicken = 10;

  }
};

AutoBuildTemplate[24] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 112, 113, 112, 113, 101, 120]; // Holy Bolt and Meditation for Secondary Skill/Aura.
    Config.LowManaSkill = [0, 120]; // Use Meditation while hitting stuff.

    Config.LowGold = 15000;
  }
};

AutoBuildTemplate[30] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.AttackSkill = [-1, 112, 113, 112, 113, 97, 120]; // Holy Bolt and Meditation for Secondary Skill/Aura.
    Config.LowManaSkill = [0, 120]; // Meditation

    Config.LowGold = 20000;

    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "hp", "mp", "rv"];
    Config.MinColumn = [1, 1, 1, 0];

    Config.RejuvBuffer = 4;
		Config.HPBuffer = 2;
    Config.MPBuffer = 2;

    Config.UseHP = 65;
    Config.DodgeHP = 50;
    Config.UseRejuvHP = 40;
    Config.TownHP = 30;
    Config.LifeChicken = 20;
  }
};

AutoBuildTemplate[35] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 30000;
    Config.StashGold = 10000;
  }
};

AutoBuildTemplate[37] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
  }
};

AutoBuildTemplate[40] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 35000;

    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "hp", "mp", "rv"];
    Config.MinColumn = [1, 1, 1, 0];

    Config.UseHP = 70;
    Config.DodgeHP = 60;
    Config.UseRejuvHP = 50;
    Config.TownHP = 40;
    Config.LifeChicken = 30;
  }
};

AutoBuildTemplate[45] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 40000;
  }
};

AutoBuildTemplate[50] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 45000;
    Config.StashGold = 25000;

    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "mp", "rv", "rv"];
    Config.MinColumn = [1, 1, 0, 0];

    Config.RejuvBuffer = 2;
		Config.HPBuffer = 4;
    Config.MPBuffer = 2;

    Config.UseHP = 75;
    Config.DodgeHP = 65;
    Config.UseRejuvHP = 55;
    Config.TownHP = 45;
    Config.LifeChicken = 30;

    Config.Charge = true;
  }
};

AutoBuildTemplate[55] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 50000;
    Config.CainID.MinGold = 50000;

    Config.UseHP = 80;
  }
};

AutoBuildTemplate[60] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 55000;

    Config.Dodge = true;
    Config.DodgeRange = 6;

    Config.BeltColumn = ["hp", "mp", "rv", "rv"];
    Config.MinColumn = [1, 1, 0, 0];

    Config.RejuvBuffer = 4;
		Config.HPBuffer = 4;
    Config.MPBuffer = 4;

    Config.UseHP = 85;
    Config.DodgeHP = 75;
    Config.UseRejuvHP = 65;
    Config.TownHP = 55;
    Config.LifeChicken = 30;
  }
};

AutoBuildTemplate[65] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 60000;
  }
};

AutoBuildTemplate[70] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 100000;
    
    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "mp", "rv", "rv"];
    Config.MinColumn = [1, 1, 0, 0];

    Config.RejuvBuffer = 4;
		Config.HPBuffer = 4;
    Config.MPBuffer = 4;

    Config.UseHP = 90;
    Config.DodgeHP = 65;
    Config.UseRejuvHP = 55;
    Config.TownHP = 45;
    Config.LifeChicken = 30;
  }
};

AutoBuildTemplate[80] = {
  SkillPoints: [-1],
  StatPoints: [-1, -1, -1, -1, -1],
  Update: function () {
    Config.LowGold = 250000;

    Config.Dodge = true;
    Config.DodgeRange = 5;

    Config.BeltColumn = ["hp", "mp", "rv", "rv"];
    Config.MinColumn = [1, 1, 0, 0];

    Config.RejuvBuffer = 4;
		Config.HPBuffer = 4;
    Config.MPBuffer = 4;

    Config.UseHP = 92;
    Config.DodgeHP = 80;
    Config.UseRejuvHP = 58;
    Config.TownHP = 50;
    Config.LifeChicken = 33;
  }
};
