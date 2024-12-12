var answer = false,
	request = false,

	AutoAssign = {
		recursion: true,
		Barbs: [],
		Sorcs: [],
		Pallys: [],
		Jobs: {
			Barb: "",
			Sorc: "",
			Pally: "",
			Mine: 0
		},

		/**
     	 * Initializes AutoAssign and updates names.
     	 * @returns {boolean} Initialization status
     	 */
		init: function () {
			// Initiates all scripts
			AutoAssign.updateNames();
			// Do something else? What else do we need to do...
			return true;
		},

		/**
     	 * Handles copydata events.
     	 * @param {number} mode - Mode of the event
     	 * @param {string} msg - Message received
     	 */
		receiveCopyData: function (mode, msg) {
			switch (mode) {
			case 69: // Request
				if (msg === me.name) {
					D2Bot.shoutGlobal("bot", 70);
				}

				break;
			case 70: // Received answer
				if (msg == "bot" && request == true) {
					answer = true;
				}

				break;
			default:
				break;
			}
		},

		/**
     	 * Handles game events like players joining or leaving.
     	 * @param {number} mode - Event type
     	 * @param {string} name1 - Name of the affected player
     	 */
		gameEvent: function (mode, name1) {
			switch (mode) {
			case 0x00: // Left game due to time-out
				AutoAssign.updateNames(name1);

				break;
			case 0x02: // Joined game
				AutoAssign.updateNames();

				break;
			case 0x03:// Left game
				AutoAssign.updateNames(name1);
				break;
			}

			delay(250);
		},

		/**
     	 * Updates job assignments based on current party.
     	 * @returns {boolean} Status of job assignment
     	 */
		getJobs: function () {
			let array = [this.Barbs, this.Pallys, this.Sorcs];

			for (let i = 0; i < array.length; i++) {

				let current = array[i];
				let quitCheck;

				switch (i) {
				case 0:
					quitCheck = getParty(this.Jobs.Barb);

					if (!quitCheck) {
						this.Jobs.Barb = "";
					}

					if (current.length > 0) {
						this.Jobs.Barb = current[0].name;
						//print("Setting leader Barb to: " + AutoAssign.Jobs.Barb);
					}

					break;
				case 1:
					quitCheck = getParty(this.Jobs.Pally);

					if (!quitCheck) {
						this.Jobs.Pally = "";
					}

					if (current.length > 0) {
						this.Jobs.Pally = current[0].name;
						//print("Setting leader Pally to: " + AutoAssign.Jobs.Pally);
					}

					break;
				case 2:
					quitCheck = getParty(this.Jobs.Sorc);

					if (!quitCheck) {
						this.Jobs.Sorc = "";
					}

					if (current.length > 0) {
						this.Jobs.Sorc = current[0].name;
						//print ("Setting leader Sorc to: " + AutoAssign.Jobs.Sorc);
					}

					break;
				}

				for (let y = 0; y < current.length; y++) {
					if (current[y].name === me.name) {
						this.Jobs.Mine = y;
					}
				}
			}

			return true;
		},

		/**
     	 * Adds a new player to the list.
     	 * @param {string} name - Player name
     	 * @param {number} level - Player level
     	 * @param {number} classid - Player classID
     	 * @returns {boolean} Status of the operation
     	 */
		pushNames: function (name, level, classid) {
			let obj = {
				name: name,
				level: level
			};

			switch (classid) {
			case 1:
				this.Sorcs.push(obj);

				break;
			case 3:
				this.Pallys.push(obj);

				break;
			case 4:
				this.Barbs.push(obj);

				break;
			}

			return true;
		},

		/**
     	 * Checks if a player exists in the specified list.
     	 * @param {string} name - Player name
     	 * @param {Array} type - List to check against
     	 * @returns {boolean} `true` if found, `false` otherwise
     	 */
		checkNames: function (name, type) {
			let i;
			let timeout = 1000;

			for (i = 0; i < type.length; i++) {
				if (type[i].name === name) {
					break;
				}
			}

			if (i == type.length) {

				D2Bot.shoutGlobal(name, 69);
				let tick = getTickCount();
				request = true;

				while (!answer) {
					if (getTickCount() - tick > timeout) {
						break;
					}
					delay(100);
				}
			}

			if (answer) {
				answer = false;
				request = false;

				//print ("Char: " + name + " Came back true.");
				return true;
			}

			answer = false;
			request = false;

			return false;
		},

		/**
     	 * Sorts the player list alphabetically and by level.
     	 * @returns {boolean} Status of the operation
     	 */
		sortNames: function () {
			let array = [this.Barbs, this.Pallys, this.Sorcs];

			for (let i = 0; i < array.length; i++) {
				let type = array[i];

				type.sort(function (a, b) {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;

					return 0;
				});

				type.sort(function (a, b) {
					return b.level - a.level;
				});
			}

			return true;
		},

		/**
 		 * Removes a player from the respective class list when they leave the game.
 		 * @param {string} quitter - Name of the player who has left the game
 		 * @returns {boolean} Evaluates `true` if the player was removed successfully, `false` otherwise.
 		 */
		removeNames: function (quitter) {
			print(quitter + " has left the game. Updating ...");

			let array = [this.Barbs, this.Pallys, this.Sorcs];

			for (let i = 0; i < array.length; i++) {
				let currentClass = array[i];

				for (let y = 0; y < currentClass.length; y++) {
					if (currentClass[y].name === quitter) {
						currentClass.splice(y, 1);
					}
				}
			}

			return true;
		},

		/**
 		 * Updates the list of players in each class based on the current party. 		 *
 		 * @returns {Object} - The current job assignments
 		 */
		getNames: function () {
			print("Updating names.");

			for (let i = 0; i < 3; i++) {
				let party = getParty();

				if (party) {
					do {
						switch (party.classid) {
						case 1:
							if (this.checkNames(party.name, this.Sorcs)) {
								this.pushNames(party.name, party.level, party.classid);
							}

							break;
						case 3:
							if (this.checkNames(party.name, this.Pallys)) {
								this.pushNames(party.name, party.level, party.classid);
							}

							break;
						case 4:
							if (this.checkNames(party.name, this.Barbs)) {
								this.pushNames(party.name, party.level, party.classid);
							}

							break;
						default:
							break;
						}

					} while (party.getNext());
				}
			}

			this.sortNames();
			this.getJobs();

			return this.Jobs;
		},
		/**
		 * Updates recursively over the player list and job assignments.
		 * @param {*} quitter - Name of the player who has left the game
		 * @returns {boolean} Evaluates `true` if the names were updated successfully, `false` otherwise.
		 */
		updateNames: function (quitter) {
			if (this.recursion) {
				this.recursion = false;

				if (quitter) {
					this.removeNames(quitter);
				}

				this.getNames();

				this.recursion = true;
			}

			return true;
		}
	}
//addEventListener("scriptmsg", AutoAssign.ScriptMsgEvent);
addEventListener('copydata', AutoAssign.receiveCopyData);
addEventListener("gameevent", AutoAssign.gameEvent);
