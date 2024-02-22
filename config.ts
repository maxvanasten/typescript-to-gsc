const ts_gsc_config = {
	targets: [
		{
			name: 'health-and-zombie-counter',
			output_file: './scripts/output/zm/health_and_zombie_counter.gsc',
			input_files: [
				'./scripts/src/zm/health_counter/main.ts',
				'./scripts/src/zm/zombie_counter/main.ts'
			]
		},
		{
			name: 'origins-spawnroom-challenge',
			output_file: './scripts/output/zm/zm_tomb/origins_spawnroom_challenge.gsc',
			input_files: [
				// Main logic
				'./scripts/src/zm/origins_spawnroom/main.ts',
				// Hud element
				'./scripts/src/zm/origins_spawnroom/hud.ts',
				// Random perk from generator script
				'./scripts/src/zm/origins_generator_challenge/main.ts'
			]
		},
		{
			name: 'motd-wolf-counter',
			output_file: './scripts/output/zm/zm_prison/wolf-counter.gsc',
			input_files: [
				'./scripts/src/zm/motd_wolf_counter/main.ts'
			]
		}
		// {
		// 	name: 'origins_generator',
		// 	output_file: './scripts/output/zm/zm_tomb/origins_generator.gsc',
		// 	input_files: [
		// 		'./scripts/src/zm/origins_generator_challenge/main.ts'
		// 	]
		// }
	]
};

export default ts_gsc_config;
