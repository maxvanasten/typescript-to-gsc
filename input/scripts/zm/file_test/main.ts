import Core from "../../../../library/core";

export const include_files = [
];

export const init_functions = [
    Core.set_local_variable(`file`, Core.openfile(`"test.txt"`, `"write"`, true)),
    Core.write(`file`, `"Hello World!"`),
    Core.close(`file`),
];

export const custom_functions = [
	// {
	// 	name: 'update_hud_zombie_counter',
	// 	lines: [
	// 		hud_element.update(`self.zombies_left`),
	// 		Core.wait(0.5)
	// 	]
	// }
];

export const update_functions = [];
