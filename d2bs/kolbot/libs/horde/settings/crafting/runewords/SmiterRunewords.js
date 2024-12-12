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
				tier: 9000,
				skipIf: ""
			},
			// Enigma
			"enigma": {
				runeword: Runeword.Enigma,
				sockets: 3,
				bases: ["Dusk Shroud", "Mage Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[itemallskills] == 2 && [itemhealafterkill] == 14 ",
				tier: 50000,
				skipIf: ""
			},
		},
		// Weapons
		"weapon": {
			// Black
			"black": {
				runeword: Runeword.Black,
				sockets: 3,
				bases: ["Flail"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == flail",
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] == 15",
				tier: 10000,
				skipIf: ""
			},
			// Grief
			"grief": {
				runeword: Runeword.Grief,
				sockets: 5,
				bases: ["Phase Blade"],
				cubeBase: false,
				roll: Roll.NonEth,
				typeCondition: "[name] == phaseblade",
				qualityCondition: "[quality] <= superior",
				statCondition: "[ias] >= 30",
				tier: 15000,
				skipIf: ""
			}
		},
		// Auric shields
		"auricshields": {
			// Rhyme
			"normal_rhyme": {
				runeword: Runeword.Rhyme,
				sockets: 2,
				bases: ["Targe", "Rondache", "Aerin Shield", "Crown Shield", "Heraldic Shield", "Aerin Shield"],
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
				bases: ["Targe", "Rondache", "Aerin Shield", "Crown Shield", "Heraldic Shield", "Aerin Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 40 && [lightresist] >= 40",
				tier: 5000,
				skipIf: ""
			},
			// Ancient's Pledge
			"nightmare_ancients_pledge": {
				runeword: Runeword.AncientsPledge,
				sockets: 3,
				bases: ["Royal Shield", "Akaran Targe", "Akaran Rondache", "Protector Shield", "Gilded Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 40 && [lightresist] >= 40",
				tier: 6000,
				skipIf: ""
			},
			// Ancient's Pledge
			"hell_ancients_pledge": {
				runeword: Runeword.AncientsPledge,
				sockets: 3,
				bases: ["Sacred Targe", "Sacred Rondache"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 40 && [lightresist] >= 40",
				tier: 7000,
				skipIf: ""
			},
			// Rhyme
			"hell_rhyme": {
				runeword: Runeword.Rhyme,
				sockets: 2,
				bases: ["Sacred Targe"],
				cubeBase: false,
				roll: Roll.NonEth,
				baseCondition: "[fireresist] >= 25",
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 50 && [lightresist] >= 50",
				tier: 8000,
				skipIf: ""
			},
			// Rhyme
			"good_hell_rhyme": {
				runeword: Runeword.Rhyme,
				sockets: 2,
				bases: ["Sacred Targe"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				baseCondition: "[fireresist] >= 40",
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 65 && [lightresist] >= 65",
				tier: 10000,
				skipIf: ""
			},
			// Exile
			"exile": {
				runeword: Runeword.Exile,
				sockets: 4,
				bases: ["Sacred Targe"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.Eth,
				baseCondition: "[fireresist] >= 40",
				qualityCondition: "[quality] <= superior",
				statCondition: "[defianceaura] >= 13",
				tier: 15000,
				skipIf: ""
			},
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