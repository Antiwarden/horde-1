/**
*	@filename	LeaderElection.js
*	@author		M
*	@desc		Leader election logic
*	@credits	M, Adpist
*/

var LeaderElection = {
	hasEnteredLeaderGame: false,
	electedLeader: false,
	newElection: false,
	requestAnswers: [],
	
	clearElectionData: function() {
		this.electedLeader = false;
		this.newElection = false;
		this.requestAnswers.splice(0,this.requestAnswers.length);
		this.hasEnteredLeaderGame = false;
		Role.isLeader = false;
	},
	
	sendToList: function (list, id, data) {
		return list.forEach((profileName) => {
			if (profileName.toLowerCase() != me.profile.toLowerCase()) {
				sendCopyData(null, profileName, id, data);
			}
		});
	},
	
	receiveCopyData: function(id, data) {
		var obj;
		switch (id) {
			case 56:
			obj = JSON.parse(data);
			// Leader Profile request
			if(!!this.electedLeader){
				sendCopyData(null, obj.nick, 57, JSON.stringify({ nick: me.profile, electedLeader: Role.isLeader ? me.profile : this.electedLeader }));
				print("ÿc7[LeaderElection]ÿc0 " + obj.nick + " requested election result - sent result: " + this.electedLeader);
			} else {
				sendCopyData(null, obj.nick, 58, JSON.stringify({nick: me.profile}));
				print("ÿc7[LeaderElection]ÿc0 " + obj.nick + ": requested election result - no result yet.");
			}
			return true;
		case 57:
			// Leader Profile reply
			obj = JSON.parse(data);
			this.newElection = obj.electedLeader;
			print("ÿc7[LeaderElection]ÿc0 " + obj.nick + " voted: " + this.newElection);
			return true;
		case 58:
			// no leader
			obj = JSON.parse(data);
			this.requestAnswers.push(obj.nick);
			print("ÿc7[LeaderElection]ÿc0 " + obj.nick + " voted no leader.");			
			return true;
		}
		
		return false;
	},
	
	getOtherPlayerData: function(profileName) {
		var profileFile = "data/" + profileName + ".json";
		if (!FileTools.exists(profileFile)) {
			HordeDebug.logScriptError("Profile " + profileName + " data not found");
		}
		var string = Misc.fileAction(profileFile, 0);
		return JSON.parse(string);
	},
	
	askIfLeaderElected: function() {
		var tick = getTickCount();
		this.sendToList(HordeSystem.allTeamProfiles, 56, JSON.stringify({ nick: me.profile, msg: "leaderrequest" }));
		
		while(!this.newElection && this.requestAnswers.length < HordeSystem.teamSize - 1 && getTickCount() - tick < 2000) {
			
			delay(250);
		}
		
		return !!this.newElection;
	},
	
	onLeaderElected: function(leaderProfile) {
		print("ÿc7[LeaderElection]ÿc0 Elected leader: " + leaderProfile);
		Role.isLeader = (leaderProfile === me.profile);
		leader = "";
		this.electedLeader = leaderProfile;
		DataFile.updateStats("hordeLeader", leaderProfile);
	},
	
	leaderElection: function(){
		var hasPreviousElectionData = (!!this.electedLeader || !!this.newElection) && this.hasEnteredLeaderGame;
		D2Bot.updateStatus("Asking elected leader");
		print("ÿc7[LeaderElection]ÿc0 Requesting elected leader.");
		
		//A bit of delay for sync
		delay(me.ping*2 + 1000);
		
		if (hasPreviousElectionData) {
			print("[ÿc:Debugÿc0] Clearing previous election data.");
			this.clearElectionData();
		}
		
		if (!hasPreviousElectionData && this.askIfLeaderElected()) {
			this.onLeaderElected(this.newElection);
			return true;
		} else {
			D2Bot.updateStatus("Waiting ready for election");
			print("ÿc7[LeaderElection]ÿc0 Waiting for leader election.");
			if (!Party.waitSynchro("leader_election", HordeSettings.leaderElectionTimeoutMinutes * 60000)) {
				HordeDebug.logScriptError("Leader Election", "Leader election synchro failed. Restarting whole team.");
				Communication.Synchro.cleanup();
				Communication.sendToList(HordeSystem.allTeamProfiles, "reboot");
				delay(HordeSystem.getTeamIndex()*500);
				D2Bot.restart();
				return false;
			}
		}
		
		while(!this.electedLeader){
			D2Bot.updateStatus("Electing leader...");
			delay(1000);
			if(HordeSystem.teleProfile.toLowerCase() === me.profile.toLowerCase()){
				//I'm the puesdo leader let me determine real leader
				this.newElection = this.doLeaderElection();
			} else {
				sendCopyData(null, HordeSystem.teleProfile, 56, JSON.stringify({ nick: me.profile, msg: "leaderrequest" }));
				//request leader
			}
			if(!!this.newElection){
				this.onLeaderElected(this.newElection);
				//Incase someone is desynced
				try {
					HordeSystem.allTeamProfiles.forEach((profileName) => {
						if (profileName.toLowerCase() != me.profile.toLowerCase()) {
							sendCopyData(null, profileName, 57, JSON.stringify({ nick: me.profile, electedLeader: this.electedLeader }));
						}
					});
				} catch (error){
					D2Bot.printToConsole("While sending quit kick: " + error);
				}
			}
		}
		
		return true;
	},
	
	getElectionEvaluatedQuests: function(diff) {
		var questsToEvaluate = [];
		
		for (var sequence in Sequencer.questSequences[diff]) {
			if (Quest.sequenceToQuest.hasOwnProperty(sequence)) {
				for (var i = 0 ; i < Quest.sequenceToQuest[sequence].length ; i += 1){
					var quest = Quest.sequenceToQuest[sequence][i];
					if (questsToEvaluate.indexOf(quest) === -1) {
						questsToEvaluate.push(quest);
					}
				}
			}
		}
		
		return questsToEvaluate;
	},
	
	doLeaderElection: function(){
		var teamData = {};
		var lastQuest = HordeSystem.team.expansion ? 40 : 28; // baal for LOD - Diablo for classic
		try {
			teamData = TeamData.getTeamQuestData();

			print("Team's lowest level: " + teamData.lowestLvl);
			print("Team's average level: " + teamData.avgLvl);

			for (var diff = 0 ; diff <= 2 ; diff += 1) {
				if (!!teamData.uncompletedQuests[diff]) {
					var evaluatedQuests = this.getElectionEvaluatedQuests(diff);
					print("Difficulty: " + diff + ", evaluated quests: " + evaluatedQuests);
					for (var quest = 1 ; quest <= lastQuest ; quest += 1) {
						if (evaluatedQuests.indexOf(quest) !== -1) {
							if (teamData.uncompletedQuests[diff].hasOwnProperty(quest)) {
								//Leader elected!
								if (HordeSettings.Debug.Verbose.leaderElection) {
									HordeDebug.logScriptInfo(
										"LeaderElection",
										"Leader elected quest: " + quest +
										" profile count missing: " + teamData.uncompletedQuests[diff][quest].count +
										" leader will be: " + teamData.uncompletedQuests[diff][quest].firstProfile
									);
								} else {
									print(
										"Leader elected quest: " + quest +
										" profile count missing: " + teamData.uncompletedQuests[diff][quest].count +
										" leader will be: " + teamData.uncompletedQuests[diff][quest].firstProfile
									);
								}
								return teamData.uncompletedQuests[diff][quest].firstProfile;
							}
						}
					}
				}
			}

		} catch (error){
			HordeDebug.logCriticalError("LeaderElection", "Error while electing leader : " + error);
		}
		
		if (HordeSettings.Debug.Verbose.leaderElection) {
			HordeDebug.logScriptInfo("LeaderElection", "Default leader elected");
		} else {
			print("ÿc7[LeaderElection]ÿc0 Default leader elected.");
		}
		
		return HordeSystem.teleProfile;
	}
};