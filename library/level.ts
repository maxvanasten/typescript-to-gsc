import { Entity } from "./entity";
import Weapons from "./lists/weapons";

class LevelClass extends Entity {
    set_zombie_movespeed_mult(mult: number | string) {
        return [
            `maps\\mp\\zombies\\_zm_utility::set_zombie_var( "zombie_move_speed_multiplier", ${mult}, 0, 2 );`,
        ];
    }

    wait_till(event_name: string): string[] {
        return [`level waittill(${event_name});`];
    }

    thread(function_name: string): string[] {
        return [`level thread ${function_name};`];
    }

    /**
     * @description Sets a variable `field` on the player to `value`.
     * @example
     * export const init_functions = [
     *     Player.set_value("name", `"xXCool_NameXx"`)
     * ];
     */
    set_value(field: string, value: string | number): string[] {
        return [`level.${field} = ${value};`];
    }

    /**
     * @description Ends thread when an event to take place
     */
    endon(event_name: string): string[] {
        return [`level endon("${event_name}");`];
    }

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
    set_array(field: string, arr: any[]): string[] {
        const output: string[] = [];

        output.push(`level.${field} = [];`);

        arr.forEach((item) => {
            output.push(`level.${field}[level.${field}.size] = ${item};`);
        });

        return output;
    }
}

const Level = new LevelClass();
export default Level;
