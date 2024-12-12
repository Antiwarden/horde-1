var RunewordProfile = {
	runes: {
		stock: true, // pre-stock runes before finding base
		stockAllRecipes: false // pre-stock runes for each runeword recipe
	},
	// Character runewords
	character: {
		// Armors
		"armor": {
			// Smoke
			"nm_smoke": {
				runeword: Runeword.Smoke,
				sockets: 2,
				bases: ["Ghost Armor", "Serpentskin Armor", "Demonhide Armor", "Cuirass", "Mage Plate"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 1000,
				skipIf: ""
			},
			// Smoke
			"hell_smoke": {
				runeword: Runeword.Smoke,
				sockets: 2,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Archon Plate"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 2000,
				skipIf: ""
			}
		},
		// Helmets
		"helm": {
			// Lore
			"Lore": {
				runeword: Runeword.Lore,
				sockets: 2,
				bases: ["Crown", "Mask", "Bone Helm"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[lightresist] >= 25",
				tier: 75,
				skipIf: ""
			},
			// Lore
			"higher_Lore": {
				runeword: Runeword.Lore,
				sockets: 2,
				bases: ["War Hat", "Grim Helm", "Grand Crown", "Demonhead", "Bone Visage"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[lightresist] >= 25",
				tier: 115,
				skipIf: ""
			}
		}
	},
	// Mercenary runewords
	merc: {
		// Weapons
		"polearm": {
			// Insight
			"normal_insight": {
				runeword: Runeword.Insight,
				sockets: 4,
				bases: ["Poleaxe", "Halberd"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[meditationaura] <= 17",
				tier: 50000000,
				skipIf: ""
			},
			// Insight
			"nm_insight": {
				runeword: Runeword.Insight,
				sockets: 4,
				bases: ["Bill", "Battle Scythe", "Partizan", "Bec De Corbin"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[meditationaura] <= 17",
				tier: 100000000,
				skipIf: ""
			},
			// Insight
			"hell_insight": {
				runeword: Runeword.Insight,
				sockets: 4,
				bases: ["Thresher", "Cryptic Axe", "Great Poleaxe", "Giant Thresher"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[meditationaura] <= 17",
				tier: 150000000,
				skipIf: ""
			},
			// Insight
			"hell_insight_endgame": {
				runeword: Runeword.Insight,
				sockets: 4,
				bases: ["Thresher", "Cryptic Axe", "Great Poleaxe", "Giant Thresher"],
				cubeBase: true,
				recipeType: Recipe.Socket.Weapon,
				roll: Roll.Eth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[meditationaura] == 17",
				tier: 200000000,
				skipIf: ""
			}
		},
		// Armors
		"armor": {
			// Treachery
			"treachery_noneth": {
				runeword: Runeword.Treachery,
				sockets: 3,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Archon Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 45",
				tier: 50000000,
				skipIf: ""
			},
			// Ethereal Treachery
			"treachery_eth": {
				runeword: Runeword.Treachery,
				sockets: 3,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Archon Plate"],
				cubeBase: false,
				roll: Roll.Eth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 45",
				tier: 100000000,
				skipIf: ""
			}
		}
	}
};