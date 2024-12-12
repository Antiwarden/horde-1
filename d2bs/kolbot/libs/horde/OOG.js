/**
*	@filename	OOG.js
*	@author		Adpist
*	@desc		Out of game stuff for horde
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var HordeOOG = {
	findCharacterInfo: function(profile) {
		if (profile !== undefined) {
			print("Search character info for profile: " + profile);
			let charSettings = HordeSystem.team.profiles[profile];
			let info = {
				account: charSettings.account,
				charName: charSettings.character,
				ladder: HordeSystem.team.ladder,
				hardcore: HordeSystem.team.hardcore,
				expansion: HordeSystem.team.expansion,
				charClass: charSettings.className
			};
			
			return info;
		}
		
		return false;
	},
	
	tryCreateCharacter: function(profile, soloChar) {
		if (soloChar === undefined) {
			soloChar = false;
		}
		
		if (profile) {
			let charInfo = this.findCharacterInfo(profile);

			if(charInfo) {
				if (ControlAction.getCharacters().length >= 8) { // Premade account that's already full
					D2Bot.printToConsole("Found character info but account is full. Cannot create character.", 9);
					return false;
				}

				if (soloChar) {
					if (!ControlAction.makeSoloCharacter(charInfo)) {
						D2Bot.printToConsole("Failed to create character.", 9);
						return false;
					}
				} else {
					if (!ControlAction.makeCharacter(charInfo)) {
						D2Bot.printToConsole("Failed to create character.", 9);
						return false;
					}
				}				

				return true;

			} else {
				D2Bot.printToConsole("Couldn't find character information, and character does not exist.", 9);
			}
		}
		
		return false;
	},
	
	findCharacterConfig: function(profile) {
		let files = dopen("libs/config/").getFiles()
		let result = undefined;

		for (let i = 0 ; i < files.length ; i += 1){
			let file = files[i];

			if (file.indexOf(".js") !== -1) {
				let fileName = file.split('.');

				if (fileName.length === 3) {
					if (fileName[1] === profile) {
						if (result === undefined) {
							result = file;
						} else {
							throw new Error("Horde: There are multiple classes assigned to the same profile, this is not supported.");
						}
					}
				}
			}
		}
		
		return result;
	}
};