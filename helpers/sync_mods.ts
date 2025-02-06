import * as fs from "fs";
import ts_gsc_config from "../config";

const path = ts_gsc_config.storage_folder;

if (fs.existsSync(`${path}/mods`)) fs.rmdirSync(`${path}/mods`, { recursive: true });
if (fs.existsSync(`${path}/scripts`)) fs.rmdirSync(`${path}/scripts`, { recursive: true });

fs.mkdirSync(`${path}/mods`);
fs.cpSync("./mods", `${path}/mods`, { recursive: true });