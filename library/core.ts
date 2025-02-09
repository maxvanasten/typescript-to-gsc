export class CoreClass {
    constructor() { }

    /**
     * @description Returns true if the file exists, false otherwise
     * @param path Path to the file
     * @returns True if exists, false otherwise
     */
    fs_testfile(path: string) {
        return `fs_testfile(${path})`;
    }

    /**
     * @description Delete a file, returns true if succesful, false otherwise.
     * @param path Path to the file
     * @param use_global Use global scriptdata folder
     * @returns True if succesful, false otherwise
     */
    fs_remove(path: string, use_global?: boolean) {
        if (!use_global) use_global = false;

        return `fs_remove(${path}, ${use_global})`;
    }

    /**
     * @description Close all open files
     */
    fs_closeall() {
        return [`fs_fcloseall();`];
    }

    /**
     * @description Opens a file, returns 0 if failed.
     * @param path Path to file
     * @param mode File mode
     * @param use_global Use global scriptdata folder
     * @returns File object
     */
    fs_open(path: string, mode: "write" | "read" | "append", use_global?: boolean) {
        if (!use_global) use_global = false;

        return `fs_fopen(${path}, "${mode}", ${use_global})`;
    }

    /**
     * @description Closes a file
     * @param file File object to close
     */
    fs_close(file: string) {
        return [`fs_fclose(${file});`];
    }

    /**
     * 
     * @param file File object to read line from
     * @returns String or undefined if no lines left to read
     */
    fs_readline(file: string) {
        return `fs_readline(${file})`;
    }

    /**
     * @description Reads the file
     * @param file File object to read
     * @param bytes Optional number of bytes to read
     * @returns 
     */
    fs_read(file: string, bytes?: number) {
        if (!bytes) return `fs_read(${file})`;

        return `fs_read(${file}, ${bytes})`;
    }

    /**
     * @description Writes to a file, appends a newline character
     * @param file File object to write to
     * @param content Content to write to file object
     * @returns true if succesful, false otherwise
     */
    fs_writeline(file: string, content: string) {
        return `fs_writeline(${file}, ${content})`;
    }

    /**
     * @description Writes to a file, no newline character
     * @param file File object to write to
     * @param content Content to write to file object
     * @returns true if succesful, false otherwise
     */
    fs_write(file: string, content: string) {
        return `fs_write(${file}, ${content})`;
    }

    /**
     * @description List files in a folder
     * @param folder Folder to list files from
     * @returns string[] A list of files inside of the folder
     */
    fs_listfiles(folder: string) {
        return `fs_listfiles(${folder})`;
    }

    log(text: string) {
        return [`print(${text});`];
    }
    disable_perk_limit() {
        return [`level.perk_purchase_limit = 99;`];
    }
    run_custom_function(function_name: string) {
        return [`self ${function_name}();`];
    }
    run_custom_function_b(function_name: string) {
        return `self ${function_name}()`;
    }
    thread_custom_function(function_name: string) {
        return [`self thread ${function_name}();`];
    }
    run_threaded_function_on_entity(func_call: string, entity: string) {
        return [`${entity} thread ${func_call};`];
    }
    pre_cache_model(model: string) {
        return [`precacheModel(${model});`];
    }
    wait(time: number | string) {
        return [`wait ${time};`];
    }
    return(value: number | string) {
        return [`return ${value};`];
    }
    replace_function_with_custom(
        default_function_path: string,
        custom_function_name: string
    ) {
        return [
            `replaceFunc(${default_function_path}, ::${custom_function_name});`,
        ];
    }
    set_local_variable(variable_name: string, value: number | string) {
        return [`${variable_name} = ${value};`];
    }
    is_not(value: number | string) {
        return `!${value}`;
    }
    raw(line: string) {
        return [`${line};`];
    }
    self_ent_flag(flag_name: string) {
        return `self maps\\mp\\zombies\\_zm_utility::ent_flag("${flag_name}")`;
    }
    for_each_run_custom(
        name: string,
        obj: string,
        custom_function_name: string
    ) {
        return [
            `foreach (${name} in ${obj})`,
            `{`,
            `\t${name} ${custom_function_name}();`,
            `}`,
        ];
    }
    for_each_run_custom_arg(
        name: string,
        obj: string,
        custom_function_name: string
    ) {
        return [
            `foreach (${name} in ${obj})`,
            `{`,
            `\t${custom_function_name}(${name});`,
            `}`,
        ];
    }
    get_upgrade_weapon(weapon_name: string, add_attachment?: 0 | 1) {
        if (!add_attachment) add_attachment = 0;

        return `maps\\mp\\zombies\\_zm_weapons::get_upgrade_weapon(${weapon_name}, ${add_attachment})`;
    }
    include_weapon(weapon_name: string, in_box: boolean) {
        let in_box_n = 0;
        if (in_box) in_box_n = 1;

        return [
            `maps\\mp\\zombies\\_zm_utility::include_weapon(${weapon_name}, ${in_box_n});`,
        ];
    }
    add_zombie_weapon(
        default_weapon_name: string,
        upgraded_weapon_name: string,
        hint: string,
        cost: number,
        weaponvo: string,
        weaponvoresp: string,
        ammo_cost: number | undefined,
        create_vox: number
    ) {
        return [
            `maps\\mp\\zombies\\_zm_weapons::add_zombie_weapon(${default_weapon_name}, ${upgraded_weapon_name}, ${hint}, ${cost}, ${weaponvo}, ${weaponvoresp}, ${ammo_cost}, ${create_vox});`,
        ];
    }
    run_function_on_entity(func_call: string, entity: string) {
        return [`${entity} ${func_call};`];
    }
    random_from_array(array_name: string) {
        return `random(${array_name})`;
    }

    make_local_struct(name: string) {
        return [`${name} = spawnstruct();`];
    }
    add_to_struct(
        struct_name: string,
        key: string,
        value: string | number
    ) {
        return [`${struct_name}.${key} = ${value};`];
    }
    map_name = `tolower(getdvar(#"mapname"))`
    spawn(entity: string, x: number, y: number, z: number) {
        return `spawn(${entity}, (${x}, ${y}, ${z}))`;
    }
};

export const switch_statement = (
    key: string,
    cases: { case: string; do: string[][] }[],
    default_behaviour: string[][]
) => {
    let output = [`switch(${key}) {`];

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
export const if_statement = (
    conditions: string[],
    true_function: string[][],
    false_function?: string[][]
) => {
    let formatted_conditions = "";
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
    let formatted_conditions = "";
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

export default new CoreClass();