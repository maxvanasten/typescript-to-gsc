import Core, { if_statement } from '../../../../library/core';
import HudElement, { Font, Point } from '../../../../library/hud_element';
import Player from '../../../../library/player';

const hud_elem_title = new HudElement({
	name: 'quest_title',
	font: new Font('objective', 1.5),
	point: new Point('center', 'center', -225, -200),
	type: 'string',
	text: `"First quest"`
});
const hud_elem_description = new HudElement({
	name: 'quest_description',
	font: new Font('objective', 1),
	point: new Point('center', 'center', -225, -185),
	type: 'string',
	text: `"Kill 10 zombies."`
});

export const include_files = [
	'maps\\mp\\gametypes_zm\\_hud_util'
];

export const custom_functions = [
	{
		name: 'zombie_quest_watcher',
		lines: [
			if_statement(
				[
					`self.kills >= 10`
				],
				[
					Core.return(1)
				],
				[
					Core.return(0)
				]
			)
		]
	},
	{
		name: 'quest_reward',
		lines: [
			if_statement(
				[
					`gpp_custom_zombie_quest_watcher()`
				],
				[
					Player.set_value('score', `${Player.score} + 1500`)
				]
			)
		]
	}
];

export const init_functions = [
	hud_elem_title.init(),
	hud_elem_description.init(),

	Core.thread_custom_function('zombie_quest_watcher')
];
