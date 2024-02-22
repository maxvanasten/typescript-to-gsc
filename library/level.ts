import { Entity } from './entity';

class LevelClass extends Entity {
	set_zombie_movespeed_mult(mult: number | string) {
		let output = [
			`// Level.setZombieMoveSpeedMultiplier(${mult})`,
			`maps\\mp\\zombies\\_zm_utility::set_zombie_var( "zombie_move_speed_multiplier", ${mult}, 0, 2 );`
		];
		return output;
	}
}

const Level = new LevelClass();
export default Level;
