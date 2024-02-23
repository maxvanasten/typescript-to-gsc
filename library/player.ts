import { Entity } from './entity';

class PlayerClass extends Entity {
	origin = 'self.origin';
	health = 'self.health';
	score = 'self.score';
	kills = 'self.kills';

	current_weapon = 'self getcurrentweapon()';
	current_zone = 'self get_current_zone()';

	constructor() {
		super();
	}

	/**
	 * @description Returns wether or not the player has a certain perk
	 * @example
	 * export const init_functions = [
	 *     Core.log(Player.has_perk(Perks.juggernog))
	 * ]
	 */
	has_perk(perk_name: string) {
		return `self hasPerk(${perk_name})`;
	}

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
	give_perk(perk_name: string) {
		let output = [
			`// givePerk() on player`
		];
		output.push(`self maps\\mp\\zombies\\_zm_perks::give_perk(${perk_name});`);
		return output;
	}

	give_max_ammo(weapon_name: string) {
		let output = [
			`// Player.giveMaxAmmo(${weapon_name})`,
			`self givemaxammo( ${weapon_name} );`
		];
		return output;
	}

	/**
	 	* @description Prints bold text on the top middle of the screen.
	 	* @example
	 	* export const init = [
	 	*     player.iPrintLnBold(`"Your score:" + self.score`)
	 	* ]
	 	*/
	i_print_ln_bold(text: string) {
		let output = [
			`// iPrintLnBold() on player`
		];
		output.push(`self iprintlnbold(${text});`);
		return output;
	}

	/**
	 	* @description Gives a weapon to the player
	 	* @example
	 	* import Weapons from './lib/lists/weapons';
	 	* 
	 	* export const init = [
	 	*     player.giveWeapon(Weapons.mp40_zm)
		* ]
		*/
	give_weapon(weapon_name: string) {
		let output = [
			`// giveWeapon() on player`
		];
		output.push(`self giveWeapon(${weapon_name});`);
		return output;
	}

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
	take_weapon(weapon_name: string) {
		let output = [
			`// takeWeapon() on player`
		];
		output.push(`self takeWeapon(${weapon_name});`);
		return output;
	}

	take_all_weapons() {
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
	}

	/**
	 * @description Takes the current weapon from the player
	 * @example
	 * import Player from './lib/player';
	 * 
	 * export const init_functions = [
	 *     Player.takeCurrentWeapon()
	 * ]
	 */
	take_current_weapon() {
		let output = [
			`// Player.takeCurrentWeapon()`
		];
		output.push(`self takeWeapon(self getcurrentweapon());`);
		return output;
	}

	wait_till(event_name: string) {
		let output = [
			`// Player.awaitEvent("${event_name}")`
		];
		output.push(`self waittill(${event_name});`);
		return output;
	}

	/**
	 * @description Notify the player of an event
	 * @example
	 * export const init_functions = [
	 *     Player.notify("event_name")
	 * ]
	 */
	notify(flag: string) {
		return [
			`self notify("${flag}");`
		];
	}
}

const Player = new PlayerClass();
export default Player;
