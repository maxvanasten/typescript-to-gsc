const ts_gsc_config = {
    clean_output_folder: true,
    targets: [
        {
            name: "health-and-zombie-counter",
            enable: true,
            output_file: "./scripts/output/zm/health_and_zombie_counter.gsc",
            input_files: [
                "./scripts/src/zm/health_counter/main.ts",
                "./scripts/src/zm/zombie_counter/main.ts",
            ],
        },
        // {
        // 	name: 'zm-quests',
        // 	output_file: './scripts/output/zm/zm_quests.gsc',
        // 	input_files: [
        // 		'./scripts/src/zm/zm_quests/main.ts'
        // 	]
        // }
        {
            name: "origins-spawnroom-challenge",
            enable: true,
            output_file:
                "./scripts/output/zm/zm_tomb/origins_spawnroom_challenge.gsc",
            input_files: [
                // Main logic
                "./scripts/src/zm/origins_spawnroom/main.ts",
                // Hud element
                "./scripts/src/zm/origins_spawnroom/hud.ts",
                // Random perk from generator script
                "./scripts/src/zm/origins_generator_challenge/main.ts",
            ],
        },
        {
            name: "motd-wolf-counter",
            enable: true,
            output_file: "./scripts/output/zm/zm_prison/wolf-counter.gsc",
            input_files: ["./scripts/src/zm/motd_wolf_counter/main.ts"],
        },
        {
            name: "dev-tools",
            enable: true,
            output_file: "./scripts/output/zm/dev-tools.gsc",
            input_files: ["./scripts/src/zm/dev_tools/origin_display.ts"],
        },
        {
            name: "custom-mystery-box",
            enable: true,
            output_file: "./scripts/output/zm/custom-mystery-box.gsc",
            input_files: ["./scripts/src/zm/custom_mystery_box/main.ts"],
        },
        {
            name: "gobblegums",
            enable: true,
            output_file: "./scripts/output/zm/gobblegums.gsc",
            input_files: [
                "./scripts/src/zm/gobblegums/main.ts",
                "./scripts/src/zm/gobblegums/hud.ts",
            ],
        },
        {
            name: "origins-bank",
            enable: true,
            output_file: "./scripts/output/zm/zm_tomb/origins_bank.gsc",
            input_files: [
                "./scripts/src/zm/origins_bank/main.ts",
                //"./scripts/src/zm/origins_bank/hud.ts",
            ],
        },
    ],
};

export default ts_gsc_config;
