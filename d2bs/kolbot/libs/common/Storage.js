/**
*	@filename	Storage.js
*	@author		McGod, kolton (small kolbot related edits)
*	@desc		Manage our storage space, belt, stash, cube and inventory
*/

/**
 * @constructor
 * @param {string} name - container name 
 * @param {number} width - container width 
 * @param {number} height - container height
 * @param {number} location - container location
 */
var Container = function (name, width, height, location) {

	this.name = name;
	this.width = width;
	this.height = height;
	this.location = location;
	/** @type {number[][]} */
	this.buffer = [];
	/** @type {ItemUnit[]} */
	this.itemList = [];
	this.openPositions = this.height * this.width;

	// Initalize the buffer array for use, set all as empty.
	for (let h = 0; h < this.height; h += 1) {
		this.buffer.push([]);
		for (let w = 0; w < this.width; w += 1) {
			this.buffer[h][w] = 0;
		}
	}

	/**
	 * Marks an item in the container's buffer.
	 * 
	 * @param {ItemUnit} item - The item to mark
	 * @returns {boolean} Evaluates `true` if the item was successfully marked, `false` otherwise
	 */
	this.Mark = function (item) {

		// Make sure it is in this container.
		if (item.location !== this.location || item.mode !== 0) {
			return false;
		}

		// Mark item in buffer.
		for (let x = item.x; x < (item.x + item.sizex); x += 1) {
			for (let y = item.y; y < (item.y + item.sizey); y += 1) {
				this.buffer[y][x] = this.itemList.length + 1;
				this.openPositions -= 1;
			}
		}

		// Add item to list.
		this.itemList.push(copyUnit(item));

		return true;
	};

	/**
	 * @description Checks if an item is in a locked storage place.
	 * @param {ItemUnit} item - The item to check
	 * @param {number[][]} baseRef - The reference array representing the storage layout
	 * @returns {boolean} Evaluates `true` if the item is in a locked spot, otherwise `false`.
	 */
	this.IsLocked = function (item, baseRef) {
		let h, w;
		let reference = baseRef.slice(0);

		// Make sure it is in this container.
		if (item.mode !== 0 || item.location !== this.location) { // 0 = sdk.items.mode.inStorage
			return false;
		}

		// Make sure the item is ours
		if (!item.getParent() || item.getParent().type !== me.type || item.getParent().gid !== me.gid) {
			return false;
		}

		// Insure valid reference.
		if (typeof (reference) !== "object"
			|| reference.length !== this.buffer.length || reference[0].length !== this.buffer[0].length) {
			throw new Error("Storage.IsLocked: Invalid inventory reference");
		}

		try {
			// Check if the item is in a locked spot.
			for (h = item.y; h < (item.y + item.sizey); h += 1) {
				for (w = item.x; w < (item.x + item.sizex); w += 1) {
					if (reference[h][w] === 0) {
						return true;
					}
				}
			}
		} catch (e2) {
			throw new Error("Storage.IsLocked error! Item info: " + item.name + " " + item.y + " " + item.sizey + " " + item.x + " " + item.sizex + " " + item.mode + " " + item.location);
		}

		return false;
	};

	/**
	   * Resets the storage by clearing all items from the buffer and resetting its properties.
	   * @returns {boolean} Always evaluates true after resetting the storage.
	   */
	this.Reset = function () {
		for (let h = 0; h < this.height; h += 1) {
			for (let w = 0; w < this.width; w += 1) {
				this.buffer[h][w] = 0;
			}
		}

		this.itemList = [];
		this.openPositions = this.height * this.width;
		return true;
	};

	/** 
	 * Prints the current state of the storage buffer to the console.
	 */
	this.printBuffer = function () {
		for (h = 0; h < this.height; h += 1) {
			var str = "[";
			for (w = 0; w < this.width; w += 1) {
				if (w > 0) {
					str += ",";
				}
				str += this.buffer[h][w];
			}
			str += "]";
			print(str);
		}
	};

	/**
	 * @description Checks if the item can fit in the buffer.
	 * @param {ItemUnit} item - The item to check
	 * @returns {boolean} Evalutates `true` if there is a suitable spot for the item, `false` otherwise.
	 */
	this.CanFit = function (item) {
		return (!!this.FindSpot(item));
	};

	/**
	 * Sorts items to the left (and right), depending on the item's `classid` (by default, all items go to the left).
	 * 
	 * @param {number[]} itemIdsLeft - An array of `classid` values representing items to be sorted to the left
	 * @param {number[]} itemIdsRight - An array of `classid` values representing items to be sorted to the right
	 * @returns {boolean} Evaluates `true` once sorting is complete.
	 */
	this.SortItems = function (itemIdsLeft, itemIdsRight) {
		print("[ÿc2Start sortItemsÿc0] Sorting " + this.name);

		Storage.Reload();

		let nPos;

		for (let y = this.width - 1; y >= 0; y--) {
			for (let x = this.height - 1; x >= 0; x--) {

				delay(1);

				if (this.buffer[x][y] === 0) {
					continue; // Nothing on this spot
				}

				let item = this.itemList[this.buffer[x][y] - 1];

				if (item.classid === 549) {
					continue; // Don't touch the cube
				}

				if (this.location !== item.location) {
					D2Bot.printToConsole("[ÿc9Storage.jsÿc0] SortItems WARNING: Detected a non-storage item in the list: " + item.name + " at " + ix + "," + iy, 6);
					continue; // Don't try to touch non-storage items | TODO: prevent non-storage items from getting this far
				}

				// Locked spot/item
				if (this.location === 3 && this.IsLocked(item, Config.Inventory)) {
					continue;
				}

				// x and y are backwards!
				let ix = item.y, iy = item.x;

				// Not top-left part of item
				if (ix < x || iy < y) {
					continue;
				}

				if (item.type !== 4) { // 4 = sdk.unittype.Item
					D2Bot.printToConsole("[ÿc9Storage.jsÿc0] SortItems WARNING: Detected a non-item in the list: " + item.name + " at " + ix + "," + iy, 6);
					continue; // Don't try to touch non-items | TODO: Prevent non-items from getting this far
				}

				if (item.mode === 3) {
					D2Bot.printToConsole("[ÿc9Storage.jsÿc0] SortItems WARNING: Detected a ground item in the list: " + item.name + " at " + ix + "," + iy, 6);
					continue; // Don't try to touch ground items | TODO: Prevent ground items from getting this far
				}

				// Find new position left-to-right or right-to-left
				if ((!itemIdsLeft && !itemIdsRight) || !itemIdsRight || itemIdsLeft.indexOf(item.classid) > -1 || itemIdsRight.indexOf(item.classid) === -1) { // Sort from left by default or if specified
					nPos = this.FindSpot(item, false, false, Config.ItemsSortedFromLeftPriority);
				} else if (itemIdsLeft.indexOf(item.classid) === -1 && itemIdsRight.indexOf(item.classid) > -1) { // Sort from right only if specified
					nPos = this.FindSpot(item, true, false, Config.ItemsSortedFromRightPriority);
				}

				// Skip if no better spot found
				if (!nPos || (nPos.x === ix && nPos.y === iy)) {
					continue;
				}

				//print("[ÿc9Storage.jsÿc0] Move " + Pickit.itemColor(item).trim() + item.name.trim() + " ÿc0from " + ix + "," + iy + " to " + nPos.y + "," + nPos.x);
				//if (!this.MoveToInternal(getUnit(-1, -1, -1, item.gid), nPos.y, nPos.x)) { // This could send invalid item objects

				if (!this.MoveToInternal(item, nPos.y, nPos.x)) {
					continue; // We couldn't move the item
				}

				// We moved an item, now reload & restart
				Storage.Reload();
				y = this.width - 0;

				break; // Loop again from begin
			}
		}

		print("[ÿc1End sortItemsÿc0] Sorting " + this.name + " done");
		//me.cancel();

		return true;
	};

	/**
	 * Checks if the specified position (`x`, `y`) can accommodate the given `item` within the storage buffer.
	 * 
	 * @param {ItemUnit | { sizex: number, sizey: number }} item
	 * @param {number} x - The item's x-coordinate in the buffer
	 * @param {number} y - The item's y-coordinate in the buffer
	 * @returns {boolean} Evaluates `true` if the position can fit the item, otherwise `false`.
	 */
	this.CanFitPosition = function (item, x, y) {
		let itemIndex = this.itemList.indexOf(item);

		Storage.Reload();

		// Loop the item size to make sure we can fit it.
		for (let nx = 0; nx < item.sizex; nx += 1) {
			for (let ny = 0; ny < item.sizey; ny += 1) {
				let bufferValue = this.buffer[y + ny][x + nx];
				if (bufferValue && (itemIndex === -1 || bufferValue != itemIndex)) {
					return false;
				}
			}
		}

		return true;
	};

	/**
	 * Finds a suitable spot in the storage buffer for the given item.
	 * 
	 * @param {ItemUnit | { sizex: number, sizey: number }} item
	 * @param {boolean} reverseX - Whether to search from right to left
	 * @param {boolean} reverseY - Whether to search from bottom to top
	 * @param {number[]} priorityClassIds - An optional array of classIds to prioritize for sorting
	 * @returns {boolean} Object with the coordinates (`x`, `y`) of the suitable spot if found, otherwise `false`.
	 */
	this.FindSpot = function (item, reverseX, reverseY, priorityClassIds) {
		// Make sure it's a valid item
		if (!item) {
			return false;
		}

		let x, y, nx, ny, makeSpot;
		let xDir = 1, yDir = 1;

		let startX = 0;
		let startY = 0;
		let endX = this.width - (item.sizex - 1);
		let endY = this.height - (item.sizey - 1);

		Storage.Reload();

		// Right-to-left
		if (reverseX) {
			startX = endX - 1;
			endX = -1; // Stops at 0
			xDir = -1;
		}

		// Bottom-to-top
		if (reverseY) {
			startY = endY - 1;
			endY = -1; // Stops at 0
			yDir = -1
		}

		// Loop buffer looking for spot to place item.
		for (y = startX; y != endX; y += xDir) {
			Loop:
			for (x = startY; x != endY; x += yDir) {

				// Check if there is something in this spot.
				if (this.buffer[x][y] > 0) {

					// TODO: Make sure priorityClassIds are only used when sorting in town where it's safe!
					// TODO: Possibly collapse this down to just a MakeSpot(item, location) call, and have MakeSpot do the priority checks right at the top.
					let bufferItemClass = this.itemList[this.buffer[x][y] - 1].classid
					if (Config.PrioritySorting && priorityClassIds && priorityClassIds.indexOf(item.classid) > -1
						&& (priorityClassIds.indexOf(bufferItemClass) === -1
						 || priorityClassIds.indexOf(item.classid) < priorityClassIds.indexOf(bufferItemClass))) { // Item in this spot needs to move!

						D2Bot.printToConsole("ÿc9[Storage.js]ÿc0 (FindSpot) Trying to make room for: " + Pickit.itemColor(item) + item.name + " ÿc0at " + y + " " + x, 6);
						makeSpot = this.MakeSpot(item, { x: x, y: y }); // NOTE: passing these in buffer order [h/x][w/y]

						if (makeSpot) {
							// this item cannot be moved
							if (makeSpot === -1) {
								return false;
							}

							return makeSpot;
						}
					}

					// Item disappeared or was picked already (can happen during Pickit.pickItems())
					if (item.gid === undefined) {
						return false;
					}

					// Ignore same item gid
					if (item.gid !== this.itemList[this.buffer[x][y] - 1].gid) {
						continue;
					}
				}

				// Loop the item size to make sure we can fit it.
				for (nx = 0; nx < item.sizey; nx += 1) {
					for (ny = 0; ny < item.sizex; ny += 1) {
						if (this.buffer[x + nx][y + ny]) {
							// Ignore same item gid
							if (item.gid !== this.itemList[this.buffer[x + nx][y + ny] - 1].gid) {
								continue Loop;
							}
						}
					}
				}

				return ({ x: x, y: y });
			}
		}

		return false;
	};

	/**
 	 * Makes a spot available in the container buffer for placing an item.
 	 * Attempts to move obstructing items to new locations if necessary.
 	 * 
 	 * @param {ItemUnit} item - The item to be placed in the container.
 	 * @param {{x: number, y: number}} location - Target location (top-left corner) for the item in the container.
 	 * @param {boolean} force - Whether to ignore priority rules and attempt placement regardless.
 	 * @returns {boolean | { x: number, y: number }} Target location if successful, `false` if placement fails, `-1` if container lacks sufficient open positions.
 	 */
	this.MakeSpot = function (item, location, force) {
		let x, y;
		let itemsToMove = [] /*, let itemsMoved = []*/;

		/** TODO: Test the scenario where all possible items have been moved, but this item still can't be placed;
		 *		  e.g. if there are many LCs in an inventory and the spot for a GC can't be freed up without
		 *		  moving other items that ARE NOT part of the position desired.
		 *        (this may be resolved by just having it fail after attempting to move from each position)
		 */

		// Make sure it's a valid item and item is in a priority sorting list
		if (!item || !item.classid || (Config.ItemsSortedFromRightPriority.indexOf(item.classid) === -1
			&& Config.ItemsSortedFromLeftPriority.indexOf(item.classid) === -1 && !force)) {

			return false; // Only continue if the item is in the priority sort list
		}

		// Make sure the item could even fit at the desired location
		if (!location //|| !(location.x >= 0) || !(location.y >= 0)
			|| ((location.y + (item.sizex - 1)) > (this.width - 1))
			|| ((location.x + (item.sizey - 1)) > (this.height - 1))) {

			//print(item.name + " could never fit at " + location.y + "," + location.x, 6); // 6 = sdk.colors.xxx
			return false; // Location invalid or item could not ever fit in the location
		}

		Storage.Reload();

		// Do not continue if the container doesn't have enough openPositions.
		// TODO: esd1 - this could be entended to use Stash for moving things if inventory is too tightly packed
		if (item.sizex * item.sizey > this.openPositions) {
			//print(item.name + " is too big to fit/move in container: " + this.name + " (openPositions: " + this.openPositions + ")", 6); // 6 = sdk.colors.xxx
			return -1; // Return a non-false answer to Town.FindSpot, so it doesn't keep looking
		}

		let endy = location.y + (item.sizex - 1);
		let endx = location.x + (item.sizey - 1);

		// Collect a list of all the items in the way of using this position
		for (x = location.x; x <= endx; x += 1) { // Item height
			for (y = location.y; y <= endy; y += 1) { // Item width
				if (this.buffer[x][y] === 0) {
					continue; // Nothing to move from this spot
				} else if (item.gid === this.itemList[this.buffer[x][y] - 1].gid) {
					continue; // Ignore same item gid
				} else {
					//print(this.itemList[this.buffer[x][y] - 1].name + " needs to move from " + y + "," + x, 6);
					itemsToMove.push(copyUnit(this.itemList[this.buffer[x][y] - 1])); // Track items that need to be moved
				}
			}
		}
		
		/** TODO: This needs to loop back through a second time after moving items, 
		 * 		  and fail if it wasn't able to free up spots for some reason!
		 */
		if (itemsToMove.length) { // Move any item(s) out of the way
			for (let i = 0; i < itemsToMove.length; i++) {
				let reverseX = !(Config.ItemsSortedFromRight.indexOf(item.classid) > -1)
				//if (Config.ItemsSortedFromRight.indexOf(item.classid) > -1) { // This item is trying to be placed on the right, move everything left
				let tmpLocation = this.FindSpot(itemsToMove[i], reverseX, false);
				//D2Bot.printToConsole(itemsToMove[i].name + " moving from " + itemsToMove[i].x + "," + itemsToMove[i].y + " to "  + tmpLocation.y + "," + tmpLocation.x, 6); // 6 = sdk.colors.xxx
				if (this.MoveToInternal(itemsToMove[i], tmpLocation.y, tmpLocation.x)) {
					//D2Bot.printToConsole(itemsToMove[i].name + " moved to " + tmpLocation.y + "," + tmpLocation.x, 6); // 6 = sdk.colors.xxx
					//itemsMoved.push(copyUnit(itemsToMove[i])) // TODO: Use this later to track 
					Storage.Reload(); // Success on this item, reload!
					delay(1); // Give reload a moment of time to avoid moving the same item twice
					// TODO: Make sure this delay actually prevents moving an item twice
				} else {
					D2Bot.printToConsole(itemsToMove[i].name + " failed to move to " + tmpLocation.y + "," + tmpLocation.x, 6); // 6 = sdk.colors.D2Bot.Gold
					return false;
				}
			}
		}

		// Check all the positions one more time to make absolutely sure we freed up space
		// delay(me.ping); // Give reload a moment of time after the moves
		// for (x = location.x; x <= endx; x += 1) { // item height
		// 	for (y = location.y; y <= endy; y += 1) { // item width
		// 		if ( this.buffer[x][y] === 0 ) {
		// 			continue; // nothing to move from this spot
		// 		} else {
		// 			D2Bot.printToConsole(this.itemList[this.buffer[x][y] - 1].name + " failed to move from " + y + "," + x, 6);
		// 			return false;
		// 		}
		// 	}
		// }

		// D2Bot.printToConsole("MakeSpot success! " + item.name + " can now be placed at " + location.y + "," + location.x, 6);
		return ({ x: location.x, y: location.y }); // return the location object used by FindSpot when trying to place an item
	};

	/**
 	 * Moves an item to a specified position in the storage container.
	 * 
 	 * @param {ItemUnit} item - The item to be moved
 	 * @param {number} x - The target x-coordinate within the storage container
 	 * @param {number} y - The target y-coordinate within the storage container
 	 * @returns {boolean} Evaluates `true` if the item was successfully moved, `false` otherwise.
 	 */
	this.MoveToInternal = function (item, x, y) {
		// Cube -> Stash, must place item in inventory first
		if (item.location === 6 && this.location === 7 && !Storage.Inventory.MoveTo(item)) {
			return false;
		}

		// Can't deal with items on ground!
		if (item.mode === 3) {
			return false;
		}

		// Item already on the cursor.
		if (me.itemoncursor && item.mode !== 4) {
			return false;
		}

		// Make sure stash is open
		if (this.location === 7 && !Town.openStash()) {
			return false;
		}

		// Pick to cursor if not already.
		if (!item.toCursor()) {
			return false;
		}

		// Loop three times to try and place it.
		for (let n = 0; n < 5; n += 1) {
			if (this.location === 6) { // Place item into cube

				let cItem = getUnit(100);
				let cube = me.getItem(549);

				if (cItem !== null && cube !== null) {
					sendPacket(1, 0x2a, 4, cItem.gid, 4, cube.gid); // 0x2a = sdk.packets.send.ItemToCube
				}
			} else {
				clickItem(0, x, y, this.location);
			}

			let nDelay = getTickCount();

			while ((getTickCount() - nDelay) < Math.max(1000, me.ping * 3 + 500)) {
				if (!me.itemoncursor) {
					print("Successfully placed " + Pickit.itemColor(item).trim() + item.name.trim() + "ÿc0 at x: " + x + " y: " + y);
					delay(200);

					return true;
				}

				delay(10);
			}
		}

		Misc.cursorCheck();

		return true;
	};

	/**
 	 * @param {ItemUnit} item - The item to be moved
 	 * @param {number} x - The target x-coordinate within the storage container
 	 * @param {number} y - The target y-coordinate within the storage container
 	 * @returns {boolean} Evaluates `true` if the item was successfully moved, `false` otherwise.
 	 */
	this.TryMoveToPosition = function (item, x, y) {
		try {
			if (!this.CanFitPosition(item, x, y)) {
				return false;
			}

			return this.MoveToInternal(item, x, y);
		} catch (e) {

			print("[ÿc9Storage.jsÿc0] Error while placing item: " + e);
			return false;
		}
	};

	/**
	 * @param {ItemUnit} item
	 */
	this.MoveTo = function (item) {
		let nPos;

		try {
			// Can we even fit it in here?
			nPos = this.FindSpot(item);

			if (!nPos) {
				return false;
			}

			return this.MoveToInternal(item, nPos.y, nPos.x);
		} catch (e) {

			print("Storage.Container.MoveTo caught error: " + e + " - " + e.toSource());
			return false;
		}
	};

	/**
 	 * Prints all known information about the storage container, including dimensions, 
 	 * number of items, available spots, and a visual representation of the buffer.
 	 */
	this.Dump = function () {
		let x, y, string;

		print(this.name + " has the width of " + this.width + " and the height of " + this.height);
		print(this.name + " has " + this.itemList.length + " items inside, and has " + this.openPositions + " spots left.");

		for (x = 0; x < this.height; x += 1) {
			string = "";

			for (y = 0; y < this.width; y += 1) {
				// Display "x" for occupied slots and "o" for open slots
				string += (this.buffer[x][y] > 0) ? "ÿc1x" : "ÿc0o";
			}

			print(string);
		}

		print("[ÿc9Storageÿc0]: " + this.name + " has used " + this.UsedSpacePercent().toFixed(2) + "% of its total space");
	};

	/**
 	 * Calculates the percentage of space currently used in the storage container.
 	 * @returns {number} Evaluates the percentage of the occupied container's space.
 	 */
	this.UsedSpacePercent = function () {
		let usedSpace = 0;
		let totalSpace = this.height * this.width;

		Storage.Reload();

		for (let x = 0; x < this.height; x += 1) {
			for (let y = 0; y < this.width; y += 1) {
				if (this.buffer[x][y] > 0) {
					usedSpace += 1;
				}
			}
		}

		return usedSpace * 100 / totalSpace;
	};

	/**
	 * Compares the current container's buffer to the provided reference buffer
	 * 
	 * @param {number[][]} baseRef - 2D Array representing the state of the container to compare against.
	 * @returns {ItemUnit[] | boolean} List of new items detected in the current buffer, or `false` if an error occurs.
	 */
	this.Compare = function (baseRef) {
		var h, w, n, item, itemList, reference;

		Storage.Reload();

		try {
			itemList = [];
			reference = baseRef.slice(0, baseRef.length);

			// Insure valid reference.
			if (typeof (reference) !== "object" || reference.length !== this.buffer.length || reference[0].length !== this.buffer[0].length) {
				throw new Error("Unable to compare different containers.");
			}

			for (h = 0; h < this.height; h += 1) {
				Loop:
				for (w = 0; w < this.width; w += 1) {
					item = this.itemList[this.buffer[h][w] - 1];

					if (!item) {
						continue;
					}

					for (n = 0; n < itemList.length; n += 1) {
						if (itemList[n].gid === item.gid) {
							continue Loop;
						}
					}

					// Check if the buffers changed and the current buffer has an item there.
					if (this.buffer[h][w] > 0 && reference[h][w] > 0) {
						itemList.push(copyUnit(item));
					}
				}
			}

			return itemList;
		} catch (e) {
			return false;
		}
	};

	this.toSource = function () {
		return this.buffer.toSource();
	};
};

/**
 * @type {storage} Storage
 */
const Storage = new function () {
	/**
 	 * Initializes the storage system by creating container objects for inventory,
	 * stash, belt, cube, and trade screen. Sets up the stash size based on the game type.
 	 */
	this.Init = () => {
		this.StashY = me.gametype === 0 ? 4 : 8;
		this.Inventory = new Container("Inventory", 10, 4, 3);
		this.TradeScreen = new Container("Inventory", 10, 4, 5);
		this.Stash = new Container("Stash", 6, this.StashY, 7);
		this.Belt = new Container("Belt", 4 * this.BeltSize(), 1, 2);
		this.Cube = new Container("Horadric Cube", 3, 4, 6);
		this.InvRef = [];

		this.Reload();
	};

	/**
 	 * @description Determines the size of the equipped belt based on its code.
 	 * @returns {number} Size of the belt (1 to 4 rows).
 	 */
	this.BeltSize = function () {
		let item = me.getItem(-1, 1); // 1 = sdk.items.mode.Equipped

		if (!item) {
			return 1; // Nothing equipped
		}

		do {
			if (item.bodylocation === 8) { // 8 = sdk.body.Belt
				switch (item.code) {
					case "lbl": // Sash
					case "vbl": // Light Belt
						return 2;
					case "mbl": // Belt
					case "tbl": // Heavy Belt
						return 3;
					default: // Everything else
						return 4;
				}
			}
		} while (item.getNext());

		return 1; // No belt
	};

	/**
 	 * Resets all containers and updates their states by marking occupied positions with items currently in them.
	 * 
 	 * @returns {boolean} Evaluates `true` if items were successfully reloaded, otherwise `false`.
 	 */
	this.Reload = function () {
		this.Inventory.Reset();
		this.Stash.Reset();
		this.Belt.Reset();
		this.Cube.Reset();
		this.TradeScreen.Reset();

		var item = me.getItem();

		if (!item) {
			return false;
		}

		do {
			switch (item.location) {
				case 3: // sdk.storage.Inventory
					this.Inventory.Mark(item);

					break;
				case 5: // sdk.storage.TradeWindow
					this.TradeScreen.Mark(item);

					break;
				case 2: // sdk.storage.Belt
					this.Belt.Mark(item);

					break;
				case 6: // sdk.storage.Cube
					this.Cube.Mark(item);

					break;
				case 7: // sdk.storage.Stash
					this.Stash.Mark(item);

					break;
			}
		} while (item.getNext());

		return true;
	};
};