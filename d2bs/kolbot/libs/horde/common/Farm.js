/**
*	@filename	Farm.js
*	@author		Adpist
*	@desc			Farming tools
*	@credits	Adpist, JeanMax / SiC-666 / Dark-f, Alogwe, Imba, Kolton, Larryw, Noah, QQValpen, Sam, YGM
*/

var Farm = {
	mfSync: function () {
		print("[ÿc2Start doPrecastÿc0] :: Start Battle Orders");

		if (HordeSystem.teamSize == 1) {
			return;
		}

		if (!me.getQuest(7, 0) && !getWaypoint(Pather.wpAreas.indexOf(35))) {
			return; // Right now not supported before andy
		}

		if (!me.inTown) {
			Town.goToTown();
		}

		Pather.useWaypoint(35);

		var waypoint;

		while (!waypoint) {
			waypoint = getUnit(2, "waypoint");

			delay(250);
		}

		Party.waitForMembers();

		while (getDistance(me, waypoint) < 5) { // Be sure to move off the waypoint.
			Pather.walkTo(me.x + rand(5, 15), me.y);

			delay(me.ping * 2 + 500);

			Packet.flash(me.gid);

			delay(me.ping * 2 + 500);
		}

		Precast.doPrecast(true);

		if (!Role.boChar) {
			print("Got bo");
			delay(5000);
		} else {
			print("Bo-ed")
		}

		print("[ÿc1End doPrecastÿc0] :: Battle Orders done");
		Pather.useWaypoint(1);
	},

	areasLevelling: function (areas, targetLevel) {
		print("areas levelling");

		if (areas.length == 0) {
			return Party.hasReachedLevel(targetLevel);
		}

		if (!me.inTown) {
			Town.goToTown();
		}

		for (let i = 0; i < areas.length; i++) {
			if (Party.hasReachedLevel(targetLevel)) {
				return true;
			}

			HordeTown.doChores();

			// Minus 30 for almost completed run
			if (getTickCount() - me.gamestarttime >= (Config.MinGameTime - 30) * 1e3) {
				print("[ÿc2Farm.jsÿc0] ÿc2Quitting at duration ÿc8" + (getTickCount() - me.gamestarttime));
				quit();

				return Party.hasReachedLevel(targetLevel);
			}

			while (me.area !== areas[i]) {
				Pather.journeyTo(areas[i]);
				delay(500);
			}

			Party.waitForMembers();

			Pather.teleport = false;

			Precast.doPrecast(true);
			delay(2000);

			Attack.clearLevel(0);

			Pather.teleport = true;
		}

		return Party.hasReachedLevel(targetLevel);
	}
};