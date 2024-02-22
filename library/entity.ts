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
		let output = [
			`// setValue() on player`
		];
		output.push(`self.${field} = ${value};`);
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

	wait_till(event_name: string) {
		let output = [
			`// Player.awaitEvent("${event_name}")`
		];
		output.push(`self waittill("${event_name}");`);
		return output;
	}

	/**
	 * @description Run a function on the player
	 * @example
	 * export const init_functions = [
	 *     Player.run_function('custom_function()')
	 * ]
	 */
	run_function(function_call: string) {
		return [
			`self ${function_call};`
		];
	}

	increment_value(field: string, amount: number | string): string[] {
		return [
			`// incrementValue() on player`,
			`self.${field} += ${amount};`
		];
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
		let output = [
			`// setArray() on player`
		];

		output.push(`self.${field} = [];`);

		arr.forEach((item) => {
			output.push(`self.${field}[self.${field}.size] = ${item};`);
		});

		return output;
	}
}
