/**
 * @description Returns the player object
 * @example
 * import { Player, c_log } from './lib/core';
 * 
 * export const init = [
 *     Player().setValue('score', 999999)
 * ]
 * 
 * export const update = [
 *     c_log(`"Kills: " + Player().kills`)
 * ]
 */
const Player = {
	/** Zone that the player is currently in */
	current_zone: `self get_current_zone()`,
	/** The origin of the player */
	origin: `self.origin`,
	health: `self.health`,
	score: `self.score`,
	// score: 0,
	kills: `self.kills`,
	current_weapon: `self getcurrentweapon()`,

	/**
	 	* @description Sets a variable `field` on the player to `value`.
	 	* @example
	 	* export const init = [
	 	*     player.setValue("name", `"xXCool_NameXx"`)
	 	* ];
	 	*/
	setValue: (field: string, value: string | number): string[] => {
		let output = [
			`// setValue() on player`
		];
		output.push(`self.${field} = ${value};`);
		return output;
	},

	getValue: (field: string): string => {
		return `self.${field}`;
	},

	hasPerk: (perk_name: string) => {
		return `self hasPerk(${perk_name})`;
	},

	notify: (flag: string) => {
		return [
			`self notify("${flag}");`
		];
	},

	run_function: (function_call: string) => {
		return [
			`self ${function_call};`
		];
	},

	addNumberToValue: (field: string, amount: number | string): string[] => {
		let output = [
			`// incrementValue() on player`,
			`self.${field} += ${amount};`
		];
		return output;
	},

	giveMaxAmmo: (weapon_name: string) => {
		let output = [
			`// Player.giveMaxAmmo(${weapon_name})`,
			`self givemaxammo( ${weapon_name} );`
		];
		return output;
	},

	// upgrade_weapon: () => {
	// 	let output = [
	// 		`// Player.upgrade_weapon()`,
	// 		``
	// 	]
	// },

	/**
	 	* @description Sets an array `field` on the player with the contents `arr`. If `is_string = true` then the items will be added to the array as strings.
		* @example
	 	* const items = [
	 	*     "test",
	 	*     "test2",
	 	*     "test3"
	 	* ]
	 	* 
	 	* export const init = [
	 	*     player.setArray("test_items", items, true)
	 	* ]
		*/
	setArray: (field: string, arr: any[]): string[] => {
		let output = [
			`// setArray() on player`
		];

		output.push(`self.${field} = [];`);

		arr.forEach((item) => {
			output.push(`self.${field}[self.${field}.size] = ${item};`);
		});

		return output;
	},

	/**
	 	* @description Prints bold text on the top middle of the screen.
	 	* @example
	 	* export const init = [
	 	*     player.iPrintLnBold(`"Your score:" + self.score`)
	 	* ]
	 	*/
	iPrintLnBold(text: string) {
		let output = [
			`// iPrintLnBold() on player`
		];
		output.push(`self iprintlnbold(${text});`);
		return output;
	},

	awaitEvent(event_name: string) {
		let output = [
			`// Player.awaitEvent("${event_name}")`
		];
		output.push(`self waittill("${event_name}");`);
		return output;
	},

	/**
	 	* @description Gives a weapon to the player
	 	* @example
	 	* import Weapons from './lib/lists/weapons';
	 	* 
	 	* export const init = [
	 	*     player.giveWeapon(Weapons.mp40_zm)
		* ]
		*/
	giveWeapon(weapon_name: string) {
		let output = [
			`// giveWeapon() on player`
		];
		output.push(`self giveWeapon(${weapon_name});`);
		return output;
	},

	setScore(amount: number) {
		let output = [
			`// Player.setScore(${amount})`
		];
		output.push(`self.score = ${amount};`);
		return output;
	},

	setScoreRaw(amount: string) {
		let output = [
			`// Player.setScoreRaw(${amount})`
		];
		output.push(`self.score = ${amount};`);
		return output;
	},

	addToScore(amount: number) {
		let output = [
			`// Player.addToScore(${amount})`
		];
		output.push(`self.score += ${amount};`);
		return output;
	},

	takeFromScore(amount: number) {
		let output = [
			`// Player.takeFromScore(${amount})`
		];
		output.push(`self.score -= ${amount};`);
		return output;
	},

	/**
	 	* @description Takes a weapon from the player
	 	* @example
	 	* import Player from './lib/player';
		* import Weapons from './lib/lists/weapons';
	 	* 
	 	* export const init_functions = [
	 	*     Player.takeWeapon(Weapons.c96_zm)
	 	* ]
	 	*/
	takeWeapon(weapon_name: string) {
		let output = [
			`// takeWeapon() on player`
		];
		output.push(`self takeWeapon(${weapon_name});`);
		return output;
	},

	takeAllWeapons() {
		let output = [
			`// Player.takeAllWeapons()`,
			`weaponslist = self getweaponslist();`,
			`for (i = 0; i < weaponslist.size; i++)`,
			`{`,
			`\tif (weaponslist[i] != "knife_zm")`,
			`\t{`,
			`\t\tself takeweapon(weaponslist[i]);`,
			`\t}`,
			`}`
		];
		return output;
	},

	/**
	 * @description Takes the current weapon from the player
	 * @example
	 * import Player from './lib/player';
	 * 
	 * export const init_functions = [
	 *     Player.takeCurrentWeapon()
	 * ]
	 */
	takeCurrentWeapon() {
		let output = [
			`// Player.takeCurrentWeapon()`
		];
		output.push(`self takeWeapon(self getcurrentweapon());`);
		return output;
	},

	/**
	 	* @description Gives a perk to the player
	 	* @example
		* import Player from './lib/player';
	 	* import Perks from './lib/lists/perks';
	 	* 
	 	* export const init = [
	 	*     Player.givePerk(Perks.juggernog),
	 	* ]
	 	*/
	givePerk(perk_name: string) {
		let output = [
			`// givePerk() on player`
		];
		output.push(`self maps\\mp\\zombies\\_zm_perks::give_perk(${perk_name});`);
		return output;
	},

	/**
	 	* @description Retrieves the current weapon and stores it in a player variable.
	 	* @example
	 	* export const init = [
	 	*     player.getCurrentWeapon("current_weapon"),
	 	*     player.takeWeapon(`self.current_weapon`)
	 	* ]
	 	*/
	getCurrentWeapon(var_name: string) {
		let output = [
			`// getCurrentWeapon() on player`
		];
		output.push(`self.${var_name} = self getcurrentweapon();`);
		return output;
	},

	/**
	 	* @description Retrieves the current zone the player is in and stores it in a player variable.
	 	* @example
	 	* export const init = [
	 	*     player.getCurrentZone("current_zone"),
	 	*     player.iPrintLnBold(`"You are in zone: " + self.current_zone`)
	 	* ]
	 	*/
	getCurrentZone(var_name: string) {
		let output = [
			`// getCurrentZone() on player`
		];
		output.push(`self.${var_name} = self get_current_zone();`);
		return output;
	}
};

export default Player;
