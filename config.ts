const ts_gsc_config = {
	targets: [
		{
			name: 'origins-spawnroom-challenge',
			output_file: './scripts/output/zm/zm_tomb/origins_spawnroom_challenge.gsc',
			input_files: [
				// Main logic
				'./scripts/src/zm/origins_spawnroom/main.ts',
				// Hud element
				'./scripts/src/zm/origins_spawnroom/hud.ts',
				// Random perk from generator script
				'./scripts/src/zm/origins_generator_challenge/main.ts',
				// Add health meter and zombie counter
				'./scripts/src/zm/health_counter/main.ts',
				'./scripts/src/zm/zombie_counter/main.ts'
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
