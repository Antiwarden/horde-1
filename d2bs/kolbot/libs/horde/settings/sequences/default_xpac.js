const Sequences = {
	// Quest sequence - Don't remove mandatory quests
	quests: {
		0: { // Normal
			// Act 1
			"den": {},
			"blood": {}, // optional
			"cain": {},
			"countess": {}, // optional
			"smith": {}, // optional
			"andy": { stopAfterIf: "!Party.hasReachedLevel(15)" },

			// Act 2
			"radament": {}, // optional
			"cube": {},
			"amulet": { stopAfterIf: "!Party.hasReachedLevel(18)" },
			"summoner": {},
			"staff": {},
			"duriel": {},

			// Act 3
			"figurine": {}, // optional
			"gidbinn": {}, // optional
			"lamesen": {}, // optional
			"eye": {},
			"heart": {},
			"brain": {},
			"travincal": {},
			"mephisto": { stopAfterIf: "!Party.hasReachedLevel(24)" },

			// Act 4
			"izual": {}, // optional
			"hellforge": {}, // optional
			"diablo": { stopAfterIf: "!Party.hasReachedLevel(25)" },

			// Act 5
			"shenk": {}, // optional
			"barbrescue": {}, // optional
			"anya": {}, // optional
			"nihlathak": {}, // optional
			"ancients": {},
			"baal": {},
		},

		1: { // Nightmare
			// Act 1
			"den": {},
			"blood": {}, // optional
			"cain": {},
			"countess": {}, // optional
			"smith": {}, // optional
			"andy": {},

			// Act 2
			"cube": {},
			"amulet": {},
			"summoner": {},
			"staff": {},
			"radament": {}, // optional
			"duriel": {},

			// Act 3
			"figurine": {}, // optional
			"gidbinn": {}, // optional
			"lamesen": {}, // optional
			"eye": {},
			"heart": {},
			"brain": {},
			"travincal": {},
			"mephisto": {},

			// Act 4
			"izual": {}, // optional
			"hellforge": {}, // optional
			"diablo": { stopAfterIf: "!Party.hasReachedLevel(45)" },

			// Act 5
			"shenk": {}, // optional
			"barbrescue": {}, // optional
			"anya": {}, // optional
			"nihlathak": {}, // optional
			"ancients": {},
			"baal": {},
		},

		2: { // Hell
			// Act 1
			"den": {},
			"blood": {}, // optional
			"cain": {},
			"countess": {}, // optional
			"smith": {}, // optional
			"andy": {},

			// Act 2
			"cube": {},
			"amulet": {},
			"summoner": {},
			"staff": {},
			"radament": {}, // optional
			"duriel": {},

			// Act 3
			"figurine": {}, // optional
			//"gidbinn": {}, // optional
			"lamesen": {}, // optional
			"eye": {},
			"heart": {},
			"brain": {},
			"travincal": {},
			"mephisto": {},

			// Act 4
			"izual": {}, // optional
			"hellforge": { skipIf: "!Party.hasReachedLevel(80)" }, // optional
			"diablo": { stopAfterIf: "!Party.hasReachedLevel(80)" },

			// Act 5
			"shenk": {}, // optional
			"barbrescue": {}, // optional
			"anya": {}, // optional
			//"nihlathak": { skipIf: "!Party.hasReachedLevel(85)" }, // optional
			"ancients": {},
			"baal": {},
		}
	},

	// Play those sequences before the quest sequences when starting a game
	beforeQuests: {
		0: { // Normal
			// Act 1
			"bloodmoor": { skipIf: "Party.hasReachedLevel(2)" }, // Leveling
			"coldplains": { skipIf: "Party.hasReachedLevel(4)" }, // Leveling
			"cave": { skipIf: "Party.hasReachedLevel(6)" }, // Leveling
			"trist": { skipIf: "Party.hasReachedLevel(11)" }, // Leveling
			"countess": { skipIf: "Party.hasReachedLevel(13)" }, // Leveling
			"andy": { skipIf: "Party.hasReachedLevel(15)" }, // Leveling

			// Act 2
			"cube": { skipIf: "Party.hasReachedLevel(18)" }, // Leveling
			"tombs": { skipIf: "Party.hasReachedLevel(20)" }, // Leveling

			// Act 3
			"travincal": { skipIf: "Party.hasReachedLevel(24)" }, // Leveling
			"mephisto": { skipIf: "Party.hasReachedLevel(24)" }, // Leveling

			// Act 4
			"diablo": { skipIf: "Party.hasReachedLevel(26)" }, // Leveling

			// Act 5
			"shenk": {}, // MF
			"pindle": {} // MF
		},

		1: { // Nightmare
			// Act 1
			"countess": {}, // MF
			"andy": {}, // MF

			// Act 2

			// Act 3
			"mephisto": {}, // MF

			// Act 4
			"diablo": { skipIf: "Party.hasReachedLevel(50)" }, // Leveling

			// Act 5
			"shenk": {}, // MF
			"pindle": {} // MF
		},

		2: { // Hell
			// Act 1
			"countess": { skipIf: "Party.hasReachedLevel(85)" }, // MF
			"pits": { skipIf: "!Party.hasReachedLevel(90)" }, // MF
			"andy": {}, // MF

			// Act 2
			"summoner": { skipIf: "Party.hasReachedLevel(85)" }, // MF
			"duriel": { skipIf: "Party.hasReachedLevel(85)" }, // MF

			// Act 3
			"mephisto": {}, // MF

			// Act 5
			"shenk": { skipIf: "Party.hasReachedLevel(90)" }, // MF
			"pindle": { skipIf: "Party.hasReachedLevel(90)" }, // MF
			//"nihlathak": {}, // MF

			// Act 4
			"diablo": {} // MF & Levelling
		}
	},

	// Play those sequences after the quest sequences before finishing a game
	afterQuests: {
		0: { // Normal
			// Act 1

			// Act 2
			"tombs": { skipIf: "Party.hasReachedLevel(24)" }, // Leveling
			"duriel": { skipIf: "Party.hasReachedLevel(24)" }, // Leveling

			// Act 3
			"mephisto": { skipIf: "!Party.hasReachedLevel(30)" },
			// Act 4
			"diablo": { skipIf: "!Party.hasReachedLevel(30)" },
			// Act 5
			"baal": {},
			"cows": { skipIf: "!Party.hasReachedLevel(31)" }
		},

		1: { // Nightmare
			// Act 1
			// Act 2
			// Act 3
			// Act 4

			// Act 5
			"baal": {},
			"cows": { skipIf: "!Party.hasReachedLevel(65)" }
		},

		2: { // Hell
			// Act 1
			// Act 2
			// Act 3
			// Act 4
			
			// Act 5
			"baal": {},
			//"cows": { skipIf: "!Party.hasReachedLevel(90)" }
		}
	}
};