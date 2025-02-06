// Used to read and write files
import * as fs from "fs";
// Defines scripts by their inputs and output
import ts_gsc_config from "../config";
// The default template for ts_gsc scripts
import { TEMPLATE } from "./template";

const clean_output_folder = () => {
    if (fs.existsSync("./output/scripts/mp"))
        fs.rmSync("./output/scripts/mp", { recursive: true, force: true });
    if (fs.existsSync("./output/scripts/zm"))
        fs.rmSync("./output/scripts/zm", { recursive: true, force: true });

    fs.mkdirSync("./output/scripts/mp");
    fs.mkdirSync("./output/scripts/zm");

    const zombie_maps = [
        "zm_tomb",
        "zm_prison",
        "zm_buried",
        "zm_transit",
        "zm_highrise",
    ];

    zombie_maps.forEach((zombie_map) => {
        if (!fs.existsSync(`./output/scripts/zm/${zombie_map}`))
            fs.mkdirSync(`./output/scripts/zm/${zombie_map}`);
    });
};

const build_mods = () => {
    // Clean mod folder
    if (fs.existsSync("./output/mods")) fs.rmSync("./output/mods", { recursive: true, force: true });
    fs.mkdirSync("./output/mods");
    ts_gsc_config.mods.forEach((mod) => {
        console.log(`[MOD] Building ${mod.name}`);
        console.time(`${mod.name}_built`);

        // Create mod folder
        fs.mkdirSync(`./output/mods/${mod.name}`);
        // Create mod info file
        const info = {
            name: mod.name,
            author: mod.author,
            description: mod.description,
            version: mod.version,
        }
        fs.writeFileSync(`./output/mods/${mod.name}/mod.json`, JSON.stringify(info));
        // Create mod scripts folder
        fs.mkdirSync(`./output/mods/${mod.name}/scripts`);

        mod.scripts.forEach((script) => {
            // Get script from config file
            const target = ts_gsc_config.scripts.find((target) => target.name === script);
            if (!target) return console.error(`Couldn't find script ${script} in targets.`);
            // Copy output file to mod folder
            fs.copyFileSync(`./output/scripts/${target.output_file}`, `./output/mods/${mod.name}/scripts/${script}.gsc`);
        });

        console.log(`[MOD] ${mod.name} built successfully.`);
        console.timeEnd(`${mod.name}_built`);
    });
}

console.time("ts_gsc_complete");
let targets_finished = 0;

if (ts_gsc_config.clean_output_folder) clean_output_folder();

ts_gsc_config.scripts.forEach((target) => {
    let target_files_loaded: number = 0;

    let include_files: string[] = [];
    let init_functions: string[][] = [];
    let update_functions: string[][] = [];
    let custom_functions: { name: string; lines: string[][] }[] = [];

    // Import includes, init and update from each script
    target.input_files.forEach(async (script_path) => {
        console.log(
            `[TS_GSC] (${target.name}) Attempting to import ${script_path}`
        );
        await import(`.${script_path}`)
            .then((mod) => {
                if (
                    !mod.include_files &&
                    !mod.init_functions &&
                    !mod.update_functions &&
                    !mod.custom_functions
                )
                    return console.warn(
                        `${script_path} is not a valid script.`
                    );
                if (mod.include_files) include_files.push(...mod.include_files);
                if (mod.init_functions)
                    init_functions.push(...mod.init_functions);
                if (mod.update_functions)
                    update_functions.push(...mod.update_functions);
                if (mod.custom_functions)
                    custom_functions.push(...mod.custom_functions);
                target_files_loaded++;

                console.log(
                    `[TS_GSC] (${target.name}) ${target_files_loaded}/${target.input_files.length} files loaded.`
                );
                if (target_files_loaded == target.input_files.length) {
                    targets_finished++;

                    transpile(
                        target.name,
                        target.output_file,
                        include_files,
                        init_functions,
                        update_functions,
                        custom_functions
                    );
                    if (targets_finished == ts_gsc_config.scripts.length)
                        console.timeEnd("ts_gsc_complete");
                    setTimeout(() => {
                        build_mods();
                    }, 1000);
                }
            })
            .catch((err) => {
                console.error(err);
                console.log(`Couldn't load ${script_path}`);
            });
    });
});

const transpile = (
    name: string,
    output_file: string,
    includes: string[],
    init: string[][],
    update: string[][],
    custom: { name: string; lines: string[][]; arguments?: string[] }[]
) => {
    console.time(`transpiling_target_${name}`);
    output_file = `./output/scripts/${output_file}`;
    // Remove duplicate includes
    includes = [...new Set(includes)];

    // Format the includes
    let formatted_includes = `#include common_scripts\\utility;\n`;
    includes.forEach((include) => {
        formatted_includes += `#include ${include};\n`;
    });

    // Write include statements to file
    fs.writeFileSync(output_file, formatted_includes);
    // Append template to file
    fs.appendFileSync(output_file, TEMPLATE);

    // Append init functions
    let init_section = `ttg_init()\n{\n\tself iPrintLn("[^2${name}^7] This script was made using ts_gsc, the TypeScript to GSC transpiler! (^5https://github.com/maxvanasten/ts_gsc^7)");\n`;
    init.forEach((func) => {
        func.forEach((line) => {
            init_section += `\t${line}\n`;
        });
    });
    init_section += `}\n\n`;
    fs.appendFileSync(output_file, init_section);

    // Append update functions
    let update_section = `ttg_update()\n{\n`;
    update.forEach((func) => {
        func.forEach((line) => {
            update_section += `\t${line}\n`;
        });
    });
    update_section += `}\n\n`;
    fs.appendFileSync(output_file, update_section);

    // Add custom functions
    if (custom) {
        custom.forEach((custom_func) => {
            let formatted_arguments = "";

            if (custom_func.arguments) {
                custom_func.arguments.forEach((arg) => {
                    formatted_arguments += `${arg}, `;
                });

                formatted_arguments = formatted_arguments.slice(
                    0,
                    formatted_arguments.length - 2
                );
            }

            let output = `${custom_func.name}(${formatted_arguments})\n{\n`;

            custom_func.lines.forEach((func) => {
                func.forEach((line) => {
                    output += `\t${line}\n`;
                });
            });

            output += `}\n\n`;
            fs.appendFileSync(output_file, output);
        });
    }

    console.timeEnd(`transpiling_target_${name}`);
};