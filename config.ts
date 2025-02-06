const ts_gsc_config = {
    clean_output_folder: true,
    storage_folder: "C:\\Users\\max\\AppData\\Local\\Plutonium\\storage\\t6",
    mods: [
        {
            name: "zm_tomb_challenge",
            scripts: ["origins-spawnroom-challenge", "gobblegums", "health-and-zombie-counter"],
            author: "HasjBlok",
            description: "Origins spawnroom challenge with gobblegums and health counter",
            version: "1.0",
        },
        {
            name: "zm_tomb_improved",
            scripts: ["health-and-zombie-counter", "origins-bank", "gobblegums"],
            author: "HasjBlok",
            description: "Origins with a bank, gobblegums and health/zombie counter",
            version: "1.0"
        }
    ],
    scripts: [
        {
            name: "health-and-zombie-counter",
            output_file: "zm/health_and_zombie_counter.gsc",
            input_files: [
                "./input/scripts/zm/health_counter/main.ts",
                "./input/scripts/zm/zombie_counter/main.ts",
            ],
        },
        {
            name: 'zm-quests',
            output_file: 'zm/zm_quests.gsc',
            input_files: [
                './input/scripts/zm/zm_quests/main.ts'
            ]
        },
        {
            name: "origins-spawnroom-challenge",
            output_file:
                "zm/zm_tomb/origins_spawnroom_challenge.gsc",
            input_files: [
                // Main logic
                "./input/scripts/zm/origins_spawnroom/main.ts",
                // Hud element
                "./input/scripts/zm/origins_spawnroom/hud.ts",
                // Random perk from generator script
                "./input/scripts/zm/origins_generator_challenge/main.ts",
            ],
        },
        {
            name: "motd-wolf-counter",
            output_file: "zm/zm_prison/wolf-counter.gsc",
            input_files: ["./input/scripts/zm/motd_wolf_counter/main.ts"],
        },
        {
            name: "dev-tools",
            output_file: "zm/dev-tools.gsc",
            input_files: ["./input/scripts/zm/dev_tools/origin_display.ts"],
        },
        {
            name: "custom-mystery-box",
            output_file: "zm/custom-mystery-box.gsc",
            input_files: ["./input/scripts/zm/custom_mystery_box/main.ts"],
        },
        {
            name: "gobblegums",
            output_file: "zm/gobblegums.gsc",
            input_files: [
                "./input/scripts/zm/gobblegums/main.ts",
                "./input/scripts/zm/gobblegums/hud.ts",
            ],
        },
        {
            name: "origins-bank",
            output_file: "zm/zm_tomb/origins_bank.gsc",
            input_files: [
                "./input/scripts/zm/origins_bank/main.ts",
                //"./input/scripts/zm/origins_bank/hud.ts",
            ],
        },
    ],
};

export default ts_gsc_config;
