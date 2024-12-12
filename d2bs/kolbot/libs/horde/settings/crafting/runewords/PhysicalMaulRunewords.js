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
			"nm_Smoke": {
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
			"hell_Smoke": {
				runeword: Runeword.Smoke,
				sockets: 2,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Archon Plate"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 2000,
				skipIf: ""
			},
			// Fortitude
			"hell_Fortitude": {
				runeword: Runeword.Fortitude,
				sockets: 4,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Great Hauberk", "Archon Plate"],
				cubeBase: false,
				roll: Roll.All,
				qualityCondition: "[quality] == normal",
				statCondition: "[fireresist] >= 20 && [lightresist] >= 25",
				tier: 25000,
				skipIf: ""
			}
		},
		// Weapons
		"weapon": {
			// Strength
			"normal_Strength": {
				runeword: Runeword.Strength,
				sockets: 2,
				bases: ["Maul"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == maul",
				qualityCondition: "[quality] <= superior",
				statCondition: "[strength] == 20",
				tier: 5000,
				skipIf: ""
			},
			// Strength
			"nm_Strength": {
				runeword: Runeword.Strength,
				sockets: 2,
				bases: ["War Club"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == warclub",
				qualityCondition: "[quality] <= superior",
				statCondition: "[strength] == 20",
				tier: 6000,
				skipIf: ""
			},
			// Strength
			"hell_Strength": {
				runeword: Runeword.Strength,
				sockets: 2,
				bases: ["Ogre Maul"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == ogremaul",
				qualityCondition: "[quality] <= superior",
				statCondition: "[strength] == 20",
				tier: 7000,
				skipIf: ""
			},
			// Black
			"normal_Black": {
				runeword: Runeword.Black,
				sockets: 3,
				bases: ["Maul"],
				cubeBase: true,
				recipeType: Recipe.Socket.Weapon,
				roll: Roll.NonEth,
				typeCondition: "[name] == maul",
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 15",
				tier: 5500,
				skipIf: ""
			},
			// Black
			"nm_Black": {
				runeword: Runeword.Black,
				sockets: 3,
				bases: ["War Club"],
				cubeBase: true,
				recipeType: Recipe.Socket.Weapon,
				roll: Roll.NonEth,
				typeCondition: "[name] == warclub",
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 15",
				tier: 6500,
				skipIf: ""
			},
			// Black
			"hell_Black": {
				runeword: Runeword.Black,
				sockets: 3,
				bases: ["Ogre Maul"],
				cubeBase: true,
				recipeType: Recipe.Socket.Weapon,
				roll: Roll.NonEth,
				typeCondition: "[name] == ogremaul",
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 15",
				tier: 7500,
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
				tier: 120,
				skipIf: ""
			}
		}
	},
	// Mercenary runewords
	merc: {
		// Weapons
		"polearm": {
			// Insight
			"normal_Insight": {
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
			"nm_Insight": {
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
			"hell_Insight": {
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
			"hell_endgame_Insight": {
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
			"noneth_Treachery": {
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
			"eth_Treachery": {
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