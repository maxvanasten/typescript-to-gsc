# [Documentation](https://maxvanasten.github.io/typescript-to-gsc/)

# TS_GSC: Get Started

## Prerequisites

- [Node.js + NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- A code editor.

## Step one: download ts_gsc

To get started with ts_gsc, please download a release from the [github repository](https://github.com/maxvanasten/typescript-to-gsc).
After you have downloaded the repository, extract it and in the directory execute the following command: `npm i`, this will install the required dependencies.

## Step two: create your script

In the `./src` folder (or any folder really), create a `.ts` file. You can now import various parts of the ts_gsc library to interact with the game, below is a small example where we give the player 50000 points upon spawning into the game.

```ts
import Player from '../lib/player';

export const init_functions = [
	Player.setScore(50000)
]
```

### Exports

Your script needs to export atleast ONE or more of the following data:

I have created a simple gungame challenge script for the map Origins that will be located in the `./src/` directory for you to take a look at how to work with ts_gsc

- *include_files*: Files you may need to include to access certain functions within gsc
- *init_functions*: Run once, when the player is spawned in.
- *update_functions*: Run every tick
- *custom_functions*: Can be called from anywhere else

## Step three: Add your script to the configuration

Take a look at the `./config.ts` file, in here you can define your scripts and make sure they get transpiled correctly. The config object for the gungame challenge looks like this:

```ts
{
	// The name of your script.
	name: 'origins-spawnroom-challenge',
	// The final GSC file everything will be transpiled to.
	output_file: 'C:\\Users\\max\\AppData\\Local\\Plutonium\\storage\\t6\\scripts\\zm\\zm_tomb\\origins-spawnroom-challenge.gsc',
	// All of the TS files the transpiler should use to create your GSC script.
	input_files: [
		// Main logic
		'./src/origins_spawnroom/main.ts',
		// Hud element
		'./src/origins_spawnroom/hud.ts',
		// Add health meter and zombie counter
		'./src/health_meter.ts',
		'./src/zombie_counter.ts'
	]
},
```

## Step four: Run the transpiler

To run the transpiler, simple run the following command inside of the ts_gsc directory: `npm run transpile`.

## Step five: Enjoy!

Enjoy your script! You might need to move the output file to the appropriate folder, as you can see in my config I have it configured so the output file gets put directly into my t6/scripts folder, allowing for rapid debugging.