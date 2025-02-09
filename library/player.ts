import { Entity } from "./entity";

export class PlayerClass extends Entity {
    origin = "self.origin";
    health = "self.health";
    score = "self.score";
    kills = "self.kills";

    current_weapon = "self getcurrentweapon()";
    current_zone = "self get_current_zone()";

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
        return [`self maps\\mp\\zombies\\_zm_perks::give_perk(${perk_name});`];
    }

    /**
     * @description Gives the player max ammo for a specific weapon
     * @example
     * import Player from './lib/player';
     * import Weapons from './lib/lists/weapons';
     * 
     * export const init = [
     *    Player.give_max_ammo(Weapons.mp40_zm)
     * ]
     */
    give_max_ammo(weapon_name: string) {
        return [`self givemaxammo( ${weapon_name} );`];
    }

    /**
     * @description Prints bold text on the top middle of the screen.
     * @example
     * export const init = [
     *     player.iPrintLnBold(`"Your score:" + self.score`)
     * ]
     */
    i_print_ln_bold(text: string) {
        return [`self iprintlnbold(${text});`];
    }
    a_i_print_ln_bold(text: string) {
        return [`player iprintlnbold(${text});`];
    }
    i_print_ln(text: string) {
        return [`self iPrintLn(${text});`];
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
        return [`self giveWeapon(${weapon_name});`];
    }

    /**
     * @description Upgrades the weapon the player is holding
     * @example
     * export const init = [
     *    player.upgrade_held_weapon()
     * ]
     */
    upgrade_held_weapon() {
        return [
            `current_weapon = self getcurrentweapon();`,
            `upgraded_weapon = maps\\mp\\zombies\\_zm_weapons::get_upgrade_weapon(current_weapon, 1);`,
            `if (isdefined(upgraded_weapon)) {`,
            `\tself takeweapon(current_weapon);`,
            `\tself giveweapon( upgraded_weapon, 0, self maps\\mp\\zombies\\_zm_weapons::get_pack_a_punch_weapon_options( upgraded_weapon ) );`,
            `\tself givestartammo( upgraded_weapon );`,
            `\tself switchtoweapon( upgraded_weapon );`,
            `}`,
        ];
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
        return [`self takeWeapon(${weapon_name});`];
    }

    take_all_weapons() {
        return [
            `weaponslist = self getweaponslist();`,
            `for (i = 0; i < weaponslist.size; i++)`,
            `{`,
            `\tif (weaponslist[i] != "knife_zm")`,
            `\t{`,
            `\t\tself takeweapon(weaponslist[i]);`,
            `\t}`,
            `}`,
        ];
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
        return [`self takeWeapon(self getcurrentweapon());`];
    }

    wait_till(event_name: string, target: string) {
        if (target) {
            return [`self waittill("${event_name}", ${target});`];
        }
        return [`self waittill("${event_name}");`];
    }

    endon(event_name: string) {
        return `self endon("${event_name}");`;
    }

    /**
     * @description Notify the player of an event
     * @example
     * export const init_functions = [
     *     Player.notify("event_name")
     * ]
     */
    notify(flag: string) {
        return [`self notify("${flag}");`];
    }
}

const Player = new PlayerClass();
export default Player;
