var RunewordProfile = {
	runes: {
		stock: true, // pre-stock runes before finding base
		stockAllRecipes: true // pre-stock runes for each runeword recipe
	},
	// Character runewords
	character: {
		// Armors
		"armor": {
			// Stealth
			"normal_Stealth": {
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
			"nm_Stealth": {
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
			"hell_Stealth": {
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
			"nm_Smoke": {
				runeword: Runeword.Smoke,
				sockets: 2,
				bases: ["Ghost Armor", "Serpentskin Armor", "Demonhide Armor", "Cuirass", "Mage Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 1000,
				skipIf: ""
			},
			// Smoke
			"hell_Smoke": {
				runeword: Runeword.Smoke,
				sockets: 2,
				bases: ["Dusk Shroud", "Wyrmhide", "Scarab Husk", "Wire Fleece", "Great Hauberk", "Boneweave", "Balrog Skin", "Archon Plate"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] == 50 && [lightresist] == 50",
				tier: 2000,
				skipIf: ""
			},
			// Enigma
			"Enigma": {
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
		// Shields
		"shield": {
			// Ancient's Pledge
			"normal_Ancients_Pledge": {
				runeword: Runeword.AncientsPledge,
				sockets: 3,
				bases: ["Kite Shield", "Large Shield", "Bone Shield", "Monarch"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 40 && [lightresist] >= 40",
				tier: 5000,
				skipIf: ""
			}
		},
		// Auric shields
		"auricshields": {
			// Ancient's Pledge
			"pala_Ancients_Pledge": {
				runeword: Runeword.AncientsPledge,
				sockets: 3,
				bases: ["Targe", "Rondache", "Aerin Shield", "Crown Shield", "Royal Shield", "Heraldic Shield", "Aerin Shield", "Akaran Targe", "Akaran Rondache", "Protector Shield", "Gilded Shield", "Royal Shield", "Sacred Targe", "Sacred Rondache", "Kurast Shield", "Zakarum Shield", "Vortex Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fireresist] >= 40 && [lightresist] >= 40",
				tier: 5500,
				skipIf: ""
			},
			// Spirit
			"pala_Spirit": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Targe", "Rondache", "Aerin Shield", "Crown Shield", "Royal Shield", "Heraldic Shield", "Aerin Shield", "Akaran Targe", "Akaran Rondache", "Protector Shield", "Gilded Shield", "Royal Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] >= 25",
				tier: 13000,
				skipIf: ""
			},
			// Spirit
			"pala_elite_Spirit": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Sacred Targe", "Sacred Rondache", "Kurast Shield", "Zakarum Shield", "Vortex Shield"],
				cubeBase: false,
				roll: Roll.NonEth,
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] >= 25",
				tier: 14000,
				skipIf: ""
			},
			// Spirit
			"pala_endgame_spirit": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Sacred Targe"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				baseCondition: "[fireresist] >= 40",
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 35",
				tier: 16000,
				skipIf: ""
			},
			// Soirit
			"pala_final_Spirit": {
				runeword: Runeword.Spirit,
				sockets: 4,
				bases: ["Sacred Targe"],
				cubeBase: true,
				recipeType: Recipe.Socket.Shield,
				roll: Roll.NonEth,
				baseCondition: "[fireresist] == 45",
				qualityCondition: "[quality] <= superior",
				statCondition: "[fcr] == 35",
				tier: 20000,
				skipIf: ""
			},
		},
		// Weapons
		"weapon": {
			// Spirit
			"spirit": {
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
			"HoTo": {
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