const HordeTeam = {
	profiles: {
		"profile1": {
			account: "",
			character: "",
			className: "sorceress",
			role: "teleport",
			build: "meteorb",
			runewordsProfile: "CasterRunewords",
			gearPriority: 1
		},
		"profile2": {
			account: "",
			character: "",
			className: "paladin",
			role: "follower",
			build: "hammerconcentration",
			runewordsProfile: "HammerRunewords",
			gearPriority: 2
		},
		"profile3": {
			account: "",
			character: "",
			className: "druid",
			role: "follower",
			build: "wind",
			runewordsProfile: "CasterRunewords",
			gearPriority: 3
		},
		"profile4": {
			account: "",
			character: "",
			className: "barbarian",
			role: "bo",
			build: "whirlbo",
			runewordsProfile: "PhysicalMaulRunewords",
			gearPriority: 4
		}
	},

	/** Next difficulty */
	difficulties: {
		// Normal
		0: { stayIf: "TeamData.getLowestLevel() < 42", killBaalIf: "true" },
		// Nightmare
		1: { stayIf: "TeamData.getLowestLevel() < 70", killBaalIf: "true" },
		// Hell
		2: { killBaalIf: "TeamData.getAverageLevel() > 80" }
	},

	/** Pickit settings @see \horde\d2bs\kolbot\pickit */
	commonPickits: [
		{ pickit: "kolton.nip" },
		{ pickit: "horde/pots.scrolls.nip" },
		{ pickit: "horde/common.earlygame.weapon.nip", condition: "me.charlvl <= 18" },
		{ pickit: "horde/merc.act1.normal.xpac.nip", condition: "me.diff == 0 && !me.getQuest(7,0)" }
	],

	/** Team settings */
	ladder: true, // Is ladder team
	hardcore: false, // Is hardcore team
	expansion: true, // Is expansion team
	rushMode: false, // High level characters are rushing other characters
	sequencesProfile: "default_xpac", // The sequence profile to use for this team - @see kolbot\libs\horde\settings\sequences
	enableGearSharing: "Party.hasReachedLevel(18)", // Enable gear sharing
	enableRuneSharing: "true", // Enable rune sharing
	enableAutoStats: "true", // Enable automatic allocation of status points (mandatory for leveling)
	enableAutoSkills: "true", // Enable automatic allocation of skill points (mandatory for leveling)
	enableAutoEquip: "true", // Enable automatic equipping of gear (mandatory for leveling)
	clearInventoryBeforeSharing: "Party.hasReachedLevel(90)", // Enable selling inventory stuff before sharing. Speeds up town chores but might be selling items not in pickit that would improve other characters stuff
	endgame: "Party.hasReachedLevel(90)", // Activates endgame sequences optimizations
	skipFirstBo: false, // Skip first game BO (in case the first sequence of the run already does the BO
	disableMercRebuy: true, // Disable merc rebuy to improve its level
	minGameTime: 420, // Minimum game time in seconds
	maxGameTime: 3600, // Maximum game time in seconds
	quitList: true, // Quit when any team mate leave the game
	instantQuitList: false, // Set this to true if you want all bots to leave instantly when a quit is triggered (ex: quitList on chicken in hardcore)
	manualPlay: false, // Use manual teleporter/follower script on others
	debug: false // Debug mode
};
