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
			`self gpp_custom_${function_name}();`
		];
	},
	thread_custom_function: (function_name: string) => {
		return [
			`self thread gpp_custom_${function_name}();`
		];
	},
	wait: (time: number) => {
		return [
			`wait ${time};`
		];
	}
};

export default Core;

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

	let output = [
		`// if_statement()`
	];
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

	let output = [
		`// while_loop()`
	];
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
