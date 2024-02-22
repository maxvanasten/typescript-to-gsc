const Level = {
	setZombieMoveSpeedMultiplier(mult: number | string) {
		let output = [
			`// Level.setZombieMoveSpeedMultiplier(${mult})`,
			`maps\\mp\\zombies\\_zm_utility::set_zombie_var( "zombie_move_speed_multiplier", ${mult}, 0, 2 );`
		];
		return output;
	},
	wait_till(flag: string) {
		let output = [
			`// Level.wait_till(${flag})`,
			`level waittill(${flag});`
		];
		return output;
	},
	set_value: (field: string, value: string | number): string[] => {
		return [
			`// Level.set_value(${field}, ${value})`,
			`level.${field} = ${value};`
		];
	}
};

export default Level;
