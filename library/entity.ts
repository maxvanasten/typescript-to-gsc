export class Entity {
    constructor() {}

    /**
     * @description Returns the value of a player variable
     * @example
     * export const init_functions = [
     *     Core.log(Player.get_value("name"))
     * ];
     */
    get_value(field: string): string {
        return `self.${field}`;
    }

    /**
     * @description Sets a variable `field` on the player to `value`.
     * @example
     * export const init_functions = [
     *     Player.set_value("name", `"xXCool_NameXx"`)
     * ];
     */
    set_value(field: string, value: string | number): string[] {
        return [`self.${field} = ${value};`];
    }

    /**
     * @description Run a function on the player
     * @example
     * export const init_functions = [
     *     Player.run_function('custom_function()')
     * ]
     */
    run_function(function_call: string) {
        return [`self ${function_call};`];
    }

    run_threaded_function(function_call: string) {
        return [`self thread ${function_call};`];
    }

    increment_value(field: string, amount: number | string): string[] {
        return [`self.${field} += ${amount};`];
    }

    decrement_value(field: string, amount: number | string): string[] {
        return [`self.${field} -= ${amount};`];
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

        output.push(`self.${field} = [];`);

        arr.forEach((item) => {
            output.push(`self.${field}[self.${field}.size] = ${item};`);
        });

        return output;
    }
}
