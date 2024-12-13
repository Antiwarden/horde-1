/**
*	@filename	Sequencer.js
*	@author		Adpist
*	@desc			Sequences management
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var Sequencer = {
	// Sequence timeline constants
	before: 1,
	quest: 2,
	after: 3,

	// Sequence requirements constants
	done: 3,
	ok: 2,
	skip: 1,
	stop: -1,
	fail: -2,
	error: -3,

	// Common constants
	none: 0,

	questSequences: {},
	beforeSequences: {},
	afterSequences: {},

	// Leader data
	currentSequences: {},
	sequenceHistory: [],
	firstSequence: false,

	// Common
	currentSequence: this.none,
	runTimeline: this.none,

	// Follower data
	nextTimeline: this.none,
	nextSequence: "",
	endGame: false,

	/* Common */
	setupSequences: function (sequencesProfile) {
		let sequenceProfileInclude = "horde/settings/sequences/" + sequencesProfile + ".js";

		if (!isIncluded(sequenceProfileInclude)) {
			if (!include(sequenceProfileInclude)) {
				throw new Error("Couldn't find sequences profile '" + sequencesProfile + "'");
			}
		}

		this.questSequences = Sequences.quests;
		this.beforeSequences = Sequences.beforeQuests;
		this.afterSequences = Sequences.afterQuests;
	},

	preSequence: function (sequence, timeline) {
		let sequenceParams = this.getSequenceParams(sequence, timeline);
		scriptBroadcast("run pre-" + sequence + " " + timeline);

		if (!this.firstSequence && !sequenceParams.skipBO) {
			Farm.mfSync();
		}
	},

	postSequence: function (sequence, timeline, sequenceResult) {
		let sequenceParams = this.getSequenceParams(sequence, timeline);
		scriptBroadcast("run post-" + sequence + " " + timeline);

		// Post completed sequence
		if (sequenceResult === Sequencer.done) {
			if (sequenceParams.skipChores) {
				HordeTown.lightChores();
			} else {
				HordeTown.doChores();
			}
		}

		switch (sequenceResult) {
		case Sequencer.done:
			Sequencer.sequenceHistory.push(sequence);
			Sequencer.firstSequence = false;

			break;
		case Sequencer.skip:
		case Sequencer.stop:
		case Sequencer.error: // Error displayed in run sequence

			break;
		case Sequencer.fail:
			HordeDebug.logScriptError("Sequencer", "Sequence '" + sequence + ".js' failed");

			break;
		case Sequencer.none:
		default:
			HordeDebug.logScriptError("Sequencer", "Sequence '" + sequence + ".js' returned unhandled completion state: " + sequenceResult);
			break;
		}
	},

	getTimelineName: function (timeline) {
		let sequenceTimeline;

		if (timeline == this.before) {
			sequenceTimeline = "(before mf)";
		} else if (timeline == this.quest) {
			sequenceTimeline = "(questing)";
		} else if (timeline == this.after) {
			sequenceTimeline = "(after mf)";
		} else {
			sequenceTimeline = "Unknown: (" + timeline + ")";
		}

		return sequenceTimeline;
	},

	getSequenceParams: function (sequence, timeline) {
		if (timeline == this.before) {
			return this.beforeSequences[me.diff][sequence];
		} else if (timeline == this.quest) {
			return this.questSequences[me.diff][sequence];
		} else if (timeline == this.after) {
			return this.afterSequences[me.diff][sequence];
		}

		return false;
	},

	runSequence: function (sequence, timeline) {
		let sequenceResult = Role.isLeader ? this.none : this.ok;
		let sequenceInclude = "horde/sequences/" + sequence + ".js";
		let requirementFunction = sequence + "_requirements";

		this.currentSequence = sequence;

		if (!isIncluded(sequenceInclude)) {
			if (!include(sequenceInclude)) {
				throw new Error("Could not find sequence: '" + sequence + ".js'");
			}
		}

		if (Role.isLeader) {
			if (global[requirementFunction] === undefined) {
				HordeDebug.logScriptError("Sequencer", sequenceInclude + " does not contain a function " + requirementFunction);

				return this.stop;
			}

			// Check requirements
			try {
				sequenceResult = global[requirementFunction](timeline != this.quest);
			} catch (error) {
				HordeDebug.logScriptError("Sequencer", "Error while validating " + sequence + "_requirements: " + error);
				sequenceResult = this.error;
			}

			// TODO: if skip, ask others if they need
		}

		// If we can do the sequence
		if (sequenceResult === this.ok) {
			print("Next sequence: " + "(" + this.getTimelineName(timeline) + ") " + sequence);

			if (Role.isLeader) {
				Communication.sendToList(HordeSystem.allTeamProfiles, "run " + sequence + " " + this.runTimeline);
			}

			// Run sequence
			this.preSequence(sequence, timeline);

			scriptBroadcast("run " + sequence + " " + this.runTimeline);
			try {
				sequenceResult = global[sequence](timeline != this.quest);
			} catch (error) {
				HordeDebug.logScriptError("Sequencer", "Error while running sequence " + sequence + ".js: " + error + "\n" + error.toSource());
				sequenceResult = this.error;
				quit();
			}

			this.postSequence(sequence, timeline, sequenceResult);
		}

		return sequenceResult;
	},

	/* Leader */
	checkBeforeSequence: function (sequence, userConditions) {
		let result = this.ok;

		// Check history
		if (Sequencer.sequenceHistory.indexOf(sequence) !== -1) {
			result = this.skip;
		}

		// Check user conditions
		if (userConditions !== undefined) {
			if (userConditions.stopBeforeIf !== undefined) {
				if (eval(userConditions.stopBeforeIf)) {
					result = this.stop;
				}
			}

			if (result != this.stop && userConditions.skipIf !== undefined) {
				if (eval(userConditions.skipIf)) {
					result = this.skip;
				}
			}
		}

		return result;
	},

	checkAfterSequence: function (sequence, userConditions, currentResult) {
		let result = currentResult;

		if (userConditions !== undefined) {
			if (userConditions.stopAfterIf !== undefined) {
				if (eval(userConditions.stopAfterIf)) {
					result = this.stop;
				}
			}
		}

		return result;
	},

	runSequences: function (sequences, timeline) {
		let sequencesList = Object.keys(sequences);
		this.currentSequences = sequences;
		this.runTimeline = timeline;

		sequencesList.every(function (sequence) {
			let sequenceResult;
			let conditions = Sequencer.currentSequences[sequence];

			sequenceResult = Sequencer.checkBeforeSequence(sequence, conditions);

			if (sequenceResult === Sequencer.ok) {
				sequenceResult = Sequencer.runSequence(sequence, timeline);

				if (sequenceResult === false || sequenceResult === true) {
					HordeDebug.logScriptError("Sequencer", sequence + ".js: Use 'Sequencer.done()' to complete a sequence or other return values if needed (see Sequencer.js)");
				}
			}

			if (sequenceResult !== Sequencer.stop) {
				sequenceResult = Sequencer.checkAfterSequence(sequence, conditions, sequenceResult);
			}

			return sequenceResult >= Sequencer.skip;
		});
	},

	runLeader: function () {
		this.runSequences(this.beforeSequences[me.diff], this.before);
		this.runSequences(this.questSequences[me.diff], this.quest);
		this.runSequences(this.afterSequences[me.diff], this.after);

		Communication.sendToList(HordeSystem.allTeamProfiles, "HordeGameEnd");
		scriptBroadcast("HordeGameEnd");
	},

	/* Follower */
	runFollower: function () {
		while (!this.endGame) {
			if (this.nextSequence !== "") {
				let sequenceToRun = this.nextSequence;
				let sequenceResult = this.none;

				this.nextSequence = ""; // Be ready to receive next before starting
				this.runTimeline = this.nextTimeline;
				this.nextTimeline = this.none;

				sequenceResult = this.runSequence(sequenceToRun, this.runTimeline);
			} else {
				Pickit.pickItems();
			}

			delay(500);
		}
	},

	receiveSequenceRequest: function (sequence, timeline) {
		this.nextSequence = sequence;
		this.nextTimeline = timeline;
	},

	onReceiveEnd: function () {
		scriptBroadcast("HordeGameEnd");
		this.endGame = true;
	},

	/* Main */
	run: function () {
		this.sequenceHistory = [];
		this.firstSequence = true;
		this.endGame = false;

		if (Role.isLeader) {
			this.runLeader();
		} else {
			this.runFollower();
		}
	},

	shouldSkipCurrentSequence: function () {
		let currentSequences;
		let conditions;

		if (this.runTimeline == this.before) {
			currentSequences = this.beforeSequences;
		} else if (this.runTimeline == this.quest) {
			currentSequences = this.questSequences;
		} else if (this.runTimeline == this.after) {
			currentSequences = this.afterSequences;
		}

		conditions = currentSequences[me.diff][this.currentSequence];

		if (conditions !== undefined && conditions.skipIf !== undefined) {
			if (eval(conditions.skipIf)) {
				return true;
			}
		} else {
			HordeDebug.logScriptError("Sequence", "Undefined sequence in shouldSkipCurrentSequence");
		}

		return false;
	}
};