var HordeSettings = {
	leaderElectionTimeoutMinutes: 5, // Maximum time to wait for leader election
	maxWaitTimeMinutes: 3, // Maximum time to wait in case horde synchronization fails
	logChar: true, // Set to true if you want to log the char inventory as a mule
	reportIPRotation: true, // If enabled, reports game server IP & queue time

	Overlay: {
		banner: true, // Display the D2GM::HORDE banner
		playtime: true // Display the playtime
	},

	Log: {
		Experience: true, // Print experience statistics in the manager
		Keys: true, // Log keys in item viewer
		Organs: true, // Log organs in item viewer
		LowRunes: true, // Log low runes (El - Dol) in item viewer
		MiddleRunes: true, // Log middle runes (Hel - Mal) in item viewer
		HighRunes: true, // Log high runes (Ist - Zod) in item viewer
		LowGems: true, // Log low gems (chipped, flawed, normal) in item viewer
		HighGems: true // Log high gems (flawless, perfect) in item viewer
	},

	Debug: {
		Verbose: {
			leaderElection: false,
			synchro: false,
			quests: false,
			sharing: false,
			crafting: false,
			chores: false
		}
	}
};
