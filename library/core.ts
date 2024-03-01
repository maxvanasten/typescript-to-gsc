const Core = {
	log: (text: string) => {
		return [
			`print(${text});`
		];
	},
	disable_perk_limit: () => {
		return [
			`level.perk_purchase_limit = 99;`
		];
	},
	run_custom_function: (function_name: string) => {
		return [
			`self ${function_name}();`
		];
	},
	thread_custom_function: (function_name: string) => {
		return [
			`self thread ${function_name}();`
		];
	},
	wait: (time: number) => {
		return [
			`wait ${time};`
		];
	},
	return: (value: number | string) => {
		return [
			`return ${value};`
		];
	},
	replace_function_with_custom: (default_function_path: string, custom_function_name: string) => {
		return [
			`replaceFunc(${default_function_path}, ::${custom_function_name});`
		];
	},
	set_local_variable: (variable_name: string, value: number | string) => {
		return [
			`${variable_name} = ${value};`
		];
	},
	is_not: (value: number | string) => {
		return `!${value}`;
	},
	raw: (line: string) => {
		return [
			`${line};`
		];
	},
	self_ent_flag: (flag_name: string) => {
		return `self maps\\mp\\zombies\\_zm_utility::ent_flag("${flag_name}")`;
	},
	for_each_run_custom: (name: string, obj: string, custom_function_name: string) => {
		return [
			`foreach (${name} in ${obj})`,
			`{`,
			`\t${name} ${custom_function_name}();`,
			`}`
		];
	},
	get_upgrade_weapon: (weapon_name: string, add_attachment?: 0 | 1) => {
		if (!add_attachment) add_attachment = 0;

		return `maps\\mp\\zombies\\_zm_weapons::get_upgrade_weapon(${weapon_name}, ${add_attachment})`;
	},
	include_weapon: (weapon_name: string, in_box: boolean) => {
		let in_box_n = 0;
		if (in_box) in_box_n = 1;

		return [
			`maps\\mp\\zombies\\_zm_utility::include_weapon(${weapon_name}, ${in_box_n});`
		];
	},
	add_zombie_weapon: (
		default_weapon_name: string,
		upgraded_weapon_name: string,
		hint: string,
		cost: number,
		weaponvo: string,
		weaponvoresp: string,
		ammo_cost: number | undefined,
		create_vox: number
	) => {
		return [
			`maps\\mp\\zombies\\_zm_weapons::add_zombie_weapon(${default_weapon_name}, ${upgraded_weapon_name}, ${hint}, ${cost}, ${weaponvo}, ${weaponvoresp}, ${ammo_cost}, ${create_vox});`
		];
	},
	run_function_on_entity: (func_call: string, entity: string) => {
		return [
			`${entity} ${func_call};`
		];
	},
	random_from_array: (array_name: string) => {
		return `random(${array_name})`;
	},

	make_local_struct: (name: string) => {
		return [
			`${name} = spawnstruct();`
		];
	},
	add_to_struct: (struct_name: string, key: string, value: string | number) => {
		return [
			`${struct_name}.${key} = ${value};`
		];
	},
	map_name: `tolower(getdvar(#"mapname"))`
};

export default Core;

export const switch_statement = (key: string, cases: { case: string; do: string[][] }[], default_behaviour: string[][]) => {
	let output = [
		`switch(${key}) {`
	];

	cases.forEach((c) => {
		output.push(`\tcase ${c.case}:`);
		c.do.forEach((do_line) => {
			do_line.forEach((line) => {
				output.push(`\t\t${line}`);
			});
		});
		output.push(`\t\tbreak;`);
	});

	output.push(`\tdefault:`);
	default_behaviour.forEach((do_line) => {
		do_line.forEach((line) => {
			output.push(`\t\t${line}`);
		});
	});

	output.push(`}`);

	return output;
};

/**
 * @description A standard if statement
 * @example
 * import { if_statement, c_log } from './lib/core';
 * 
 * export const update = [
 *     if_statement(
 *         [
 *             'self.score < 1000',
 *         ],
 *         [
 *             c_log("Less than 1000 points"),
 *         ],
 *         [
 *             c_log("More than or equal to 1000 points"),
 *         ]
 *     )
 * ];
 */
export const if_statement = (conditions: string[], true_function: string[][], false_function?: string[][]) => {
	let formatted_conditions = '';
	conditions.map((condition, index) => {
		formatted_conditions += condition;
		if (index < conditions.length - 1) formatted_conditions += ` && `;
	});

	const output: string[] = [];
	output.push(`if (${formatted_conditions})`);
	output.push(`{`);

	true_function.forEach((func) => {
		func.forEach((line) => {
			output.push(`\t${line}`);
		});
	});

	output.push(`}`);

	if (!false_function) return output;

	output.push(`else`);
	output.push(`{`);

	false_function.forEach((func) => {
		func.forEach((line) => {
			output.push(`\t${line}`);
		});
	});

	output.push(`}`);

	return output;
};

/**
 * @description A standard while loop
 * @example
 * import { while_loop, c_log } from './lib/core';
 * 
 * export const update = [
 *     while_loop(
 *         [
 *             'self.score < 1000',
 *         ],
 *         [
 *             c_log("Less than 1000 points"),
 *         ]
 *     )
 * ];
 */
export const while_loop = (conditions: string[], true_function: string[][]) => {
	let formatted_conditions = '';
	conditions.map((condition, index) => {
		formatted_conditions += condition;
		if (index < conditions.length - 1) formatted_conditions += ` && `;
	});

	const output: string[] = [];
	output.push(`while (${formatted_conditions})`);
	output.push(`{`);

	true_function.forEach((func) => {
		func.forEach((line) => {
			output.push(`\t${line}`);
		});
	});

	output.push(`}`);

	return output;
};
