var RunewordProfile = {
	runes: {
		stock: true, // pre-stock runes before finding base
		stockAllRecipes: false // pre-stock runes for each runeword recipe
	},
	// Character runewords
	character: {
		// Shields
		"shield": {
			// Rhyme
			"normal_rhyme": {
				runeword: Runeword.Rhyme,
				sockets: 2,
				bases: ["Kite Shield", "Large Shield", "Bone Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 25 && [lightresist] >= 25",
				tier: 250,
				skipIf: ""
			},
			// Ancient's Pledge
			"normal_ancients_pledge": {
				runeword: Runeword.AncientsPledge,
				sockets: 3,
				bases: ["Kite Shield", "Large Shield", "Bone Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 5000,
				skipIf: ""
			},
			// Spirit
			"low_spirit_monarch": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Monarch"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] >= 25",
				tier: 10000,
				skipIf: ""
			},
			// Spirit
			"medium_spirit_monarch": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Monarch"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] >= 30",
				tier: 11000,
				skipIf: ""
			},
			// Spirit
			"high_spirit_monarch": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Monarch"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 35",
				tier: 12000,
				skipIf: ""
			}
		},
		// Weapons
		"weapon": {
			// Spirit
			"spirit_sword": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Broad Sword", "Crystal Sword"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[type] == sword",
				qualityCondition: "[quality] <= superior",
				statCondition: "[itemallskills] == 2",
				tier: 10000,
				skipIf: ""
			},
			// Heart of the Oak
			"hoto": {
				runeword: Runeword.HeartoftheOak,
				sockets: 4,
				bases: ["Flail"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == flail",
				qualityCondition: "[quality] <= superior",
				statCondition: "[itemallskills] == 3",
				tier: 13000,
				skipIf: ""
			}
		},
		// Armors
		"armor": {
			// Stealth
			"normal_stealth": {
				runeword: Runeword.Stealth,
				sockets: 2,
				bases: ["Breast Plate", "Light Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 25",
				tier: 250,
				skipIf: ""
			},
			// Stealth
			"nm_stealth": {
				runeword: Runeword.Stealth,
				sockets: 2,
				bases: ["Ghost Armor", "Serpentskin Armor", "Demonhide Armor", "Cuirass", "Mage Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 25",
				tier: 350,
				skipIf: ""
			},
			// Stealth
			"hell_stealth": {
				runeword: Runeword.Stealth,
				sockets: 2,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Balrog Skin", "Archon Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 25",
				tier: 450,
				skipIf: ""
			},
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