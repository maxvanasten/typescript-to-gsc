# TypeScript-to-GSC (ts_gsc) Comprehensive Analysis Report

## Executive Summary

**TypeScript-to-GSC (ts_gsc)** is a custom transpiler tool that converts TypeScript code into GSC (Game Scripting Language), the proprietary scripting language used in Call of Duty: Black Ops 2 Zombies maps via the Plutonium custom client. It enables developers to write Zombies game scripts using modern TypeScript development practices, including type safety, IDE autocompletion, and modular code organization, which are then compiled into deployable GSC files.

**Key Statistics:**
- Version: 0.1.0 - 0.2.0
- Author: Max van Asten
- Repository: github.com/maxvanasten/typescript-to-gsc
- License: ISC
- Primary Use: Call of Duty Black Ops 2 Zombies scripting (Plutonium modding)

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Library API](#library-api)
5. [Transpilation Process](#transpilation-process)
6. [Script Configuration](#script-configuration)
7. [Build System & Mod Management](#build-system--mod-management)
8. [Code Examples](#code-examples)
9. [Data Flow Diagrams](#data-flow-diagrams)
10. [Supported Maps & Features](#supported-maps--features)
11. [Limitations & Considerations](#limitations--considerations)

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TypeScript-to-GSC Architecture                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────┐    ┌─────────────────┐    ┌─────────────┐                 │
│   │   INPUT     │    │   TRANSPILER    │    │   OUTPUT    │                 │
│   │  (TypeScript│───▶│    (Node.js)    │───▶│    (GSC)    │                 │
│   │    Files)   │    │                 │    │   Files)    │                 │
│   └─────────────┘    └─────────────────┘    └─────────────┘                 │
│         │                    │                      │                        │
│         │                    │                      │                        │
│         ▼                    ▼                      ▼                        │
│   ┌─────────────┐    ┌─────────────────┐    ┌─────────────┐                 │
│   │  Library    │    │   Config.ts     │    │  Mod Files  │                 │
│   │   Modules   │    │   (Definitions) │    │  (.gsc)     │                 │
│   └─────────────┘    └─────────────────┘    └─────────────┘                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Source Language** | TypeScript 5.x | Developer-facing scripting |
| **Transpiler Runtime** | Node.js + ts-node | Executes TypeScript without compilation |
| **Output Language** | GSC (Black Ops 2) | Target game scripting language |
| **Build Automation** | npm scripts | Task runners for transpilation |
| **Documentation** | TypeDoc | Generates API docs from code |
| **Package Manager** | npm | Dependency management |

---

## Directory Structure

```
typescript-to-gsc/
├── config.ts                    # Main configuration file
├── package.json                 # Project metadata & scripts
├── tsconfig.json               # TypeScript compiler options
├── README.md                   # User documentation
├── .gitignore                  # Git ignore rules
│
├── transpiler/                 # Core transpilation logic
│   ├── core.ts                 # Main transpiler orchestrator
│   └── template.ts             # GSC boilerplate template
│
├── library/                    # TypeScript API for GSC functions
│   ├── core.ts                 # Core utility functions
│   ├── entity.ts               # Base entity class
│   ├── player.ts               # Player-specific methods
│   ├── level.ts                # Level-wide methods
│   ├── hud_element.ts          # HUD creation utilities
│   └── lists/                  # Enumerations & constants
│       ├── weapons.ts          # Weapon name mappings
│       ├── perks.ts            # Perk name mappings
│       └── fonts.ts            # HUD font options
│
├── input/                      # Input TypeScript scripts
│   └── scripts/
│       └── zm/                 # Zombies mode scripts
│           ├── origins_spawnroom/
│           ├── gobblegums/
│           ├── health_counter/
│           ├── zombie_counter/
│           └── ... (more scripts)
│
├── output/                     # Generated output files
│   ├── scripts/                # Compiled .gsc files
│   │   ├── mp/                # Multiplayer scripts
│   │   └── zm/                # Zombies scripts
│   │       ├── zm_tomb/
│   │       ├── zm_prison/
│   │       └── ... (map folders)
│   └── mods/                   # Packaged mod files
│       ├── zm_tomb_challenge/
│       └── zm_tomb_improved/
│
├── helpers/                    # Utility scripts
│   ├── sync_mods.ts           # Sync mods to game folder
│   └── sync_scripts.ts        # Sync scripts to game folder
│
├── releases/                   # Release archives
└── documentation/              # Auto-generated API docs
```

---

## Core Components

### 1. Transpiler Core (transpiler/core.ts)

The transpiler is the heart of the system. It performs the following operations:

#### Main Functions:

| Function | Purpose |
|----------|---------|
| `clean_output_folder()` | Prepares output directories for fresh build |
| `transpile()` | Converts TypeScript modules to GSC |
| `build_mods()` | Packages scripts into mod distributions |

#### Transpilation Pipeline:

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Transpilation Process                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. LOAD SCRIPTS                                                     │
│     ├── Read config.ts to get script list                            │
│     ├── For each script:                                             │
│     │   ├── Load all input_files via dynamic import                  │
│     │   ├── Extract export data:                                     │
│     │   │   ├── include_files[]  → #include directives               │
│     │   │   ├── init_functions[][] → ttg_init() function            │
│     │   │   ├── update_functions[][] → ttg_update() function        │
│     │   │   └── custom_functions[] → Named functions                │
│     │   └── Deduplicate includes                                     │
│     │                                                                │
│  2. GENERATE GSC                                                     │
│     ├── Write #include statements                                    │
│     ├── Append base template (player connection logic)               │
│     ├── Generate ttg_init() from init_functions                      │
│     ├── Generate ttg_update() from update_functions                  │
│     ├── Generate custom named functions                              │
│     └── Write to output folder                                       │
│     │                                                                │
│  3. BUILD MODS                                                       │
│     ├── Read mods config                                             │
│     ├── For each mod:                                                │
│     │   ├── Create mod folder                                        │
│     │   ├── Generate mod.json with metadata                          │
│     │   └── Copy relevant .gsc files                                 │
│     │                                                                │
└──────────────────────────────────────────────────────────────────────┘
```

### 2. Template System (transpiler/template.ts)

The template provides the GSC boilerplate that handles player lifecycle:

```gsc
init()
{
    level thread onPlayerConnect();
}

onPlayerConnect()
{
    for ( ;; )
    {
        level waittill("connecting", player);
        player thread onPlayerSpawned();
    }
}

onPlayerSpawned()
{
    self endon("disconnect");
    flag_wait("initial_blackscreen_passed");
    self thread ttg_init();
    for ( ;; )
    {
        self thread ttg_update();
        wait 0.05;
    }
}
```

**Template Flow:**

```
init() → onPlayerConnect() → wait for "connecting" → onPlayerSpawned()
                                                          ↓
                                                    ttg_init() [once]
                                                          ↓
                                                    ttg_update() [every 0.05s]
```

### 3. Control Flow Helpers (library/core.ts)

The library provides abstraction for common GSC control structures:

#### Control Structures:

| Function | GSC Equivalent | Purpose |
|----------|---------------|---------|
| `if_statement()` | `if { } else { }` | Conditional branching |
| `while_loop()` | `while { }` | Loop while condition true |
| `switch_statement()` | `switch { case: }` | Multi-case branching |

#### Example: If Statement

```typescript
import { if_statement, Core } from './library/core';

export const update_functions = [
    if_statement(
        ['self.score < 1000'],      // conditions
        [
            Core.log("Less than 1000 points")
        ],                          // true branch
        [
            Core.log("1000 or more points")
        ]                           // false branch (optional)
    )
];
```

Compiles to:

```gsc
if (self.score < 1000)
{
    print("Less than 1000 points");
}
else
{
    print("1000 or more points");
}
```

---

## Library API

### Core Module (library/core.ts)

The Core module provides low-level GSC abstractions:

#### File System Operations:

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `fs_testfile(path)` | `fs_testfile(path)` | Test if file exists |
| `fs_open(path, mode, use_global)` | `fs_fopen(path, "mode", bool)` | Open file |
| `fs_read(file)` | `fs_read(file)` | Read file contents |
| `fs_write(file, content)` | `fs_write(file, content)` | Write to file |
| `fs_listfiles(folder)` | `fs_listfiles(folder)` | List directory contents |

#### Entity Operations:

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `run_function_on_entity(func, entity)` | `entity func;` | Run function on entity |
| `run_threaded_function_on_entity(func, entity)` | `entity thread func;` | Thread function on entity |
| `for_each_run_custom(name, obj, func)` | `foreach (name in obj) { name func(); }` | Iterate and run |

#### Game Utilities:

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `log(text)` | `print(text);` | Print to console |
| `wait(time)` | `wait time;` | Pause execution |
| `random_from_array(array)` | `random(array)` | Get random element |
| `pre_cache_model(model)` | `precacheModel(model);` | Preload model |
| `map_name` | `tolower(getdvar(#"mapname"))` | Get current map |

### Player Module (library/player.ts)

Extends `Entity` class with player-specific methods:

#### Player Properties:

```typescript
player.origin      // self.origin
player.health      // self.health
player.score       // self.score
player.kills       // self.kills
player.current_weapon  // self getcurrentweapon()
player.current_zone    // self get_current_zone()
```

#### Player Methods:

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `has_perk(perk)` | `self hasPerk(perk)` | Check perk ownership |
| `give_perk(perk)` | `self maps\mp\zombies\_zm_perks::give_perk(perk)` | Grant perk |
| `give_weapon(weapon)` | `self giveWeapon(weapon)` | Give weapon |
| `take_weapon(weapon)` | `self takeWeapon(weapon)` | Remove weapon |
| `give_max_ammo(weapon)` | `self givemaxammo(weapon)` | Full ammo |
| `upgrade_held_weapon()` | Complex PaP logic | Pack-a-Punch |
| `i_print_ln(text)` | `self iPrintLn(text)` | Print to screen |
| `i_print_ln_bold(text)` | `self iprintlnbold(text)` | Bold text on screen |
| `wait_till(event)` | `self waittill("event")` | Wait for event |
| `endon(event)` | `self endon("event")` | End on event |
| `notify(event)` | `self notify("event")` | Trigger event |

### Level Module (library/level.ts)

Level-wide (global) operations:

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `set_zombie_movespeed_mult(n)` | `set_zombie_var("zombie_move_speed_multiplier", n)` | Adjust zombie speed |
| `wait_till(event)` | `level waittill(event)` | Wait for level event |
| `thread(func)` | `level thread func` | Thread function at level |
| `set_value(field, value)` | `level.field = value` | Set level variable |
| `set_array(field, arr)` | `level.field[] = item` | Create level array |

### Entity Module (library/entity.ts)

Base class for all game entities (players, zombies, items):

| Method | GSC Output | Description |
|--------|-----------|-------------|
| `get_value(field)` | `self.field` | Read entity property |
| `set_value(field, value)` | `self.field = value` | Set entity property |
| `run_function(func)` | `self func;` | Run function |
| `run_threaded_function(func)` | `self thread func;` | Thread function |
| `increment_value(field, amt)` | `self.field += amt` | Add to value |
| `decrement_value(field, amt)` | `self.field -= amt` | Subtract from value |
| `set_array(field, arr)` | `self.field[] = item` | Create array |

### HudElement Module (library/hud_element.ts)

Creates on-screen HUD elements:

#### HudElement Configuration:

```typescript
const hud = new HudElement({
    name: 'my_hud',
    point: new Point('CENTER', 'CENTER', 0, 200),
    font: Font.default(),
    type: 'number',        // 'number' or 'string'
    value: 0,
    label: '^5Health: ^6',
    color: { r: 1, g: 1, b: 1 },
    alpha: 1,
    hidewheninmenu: true,
    hidewhendead: true
});
```

#### Point Alignments:

| Alignment | X Offset | Y Offset | Screen Position |
|-----------|----------|----------|-----------------|
| `CENTER, CENTER` | 0 | 0 | Dead center |
| `CENTER, CENTER` | -300 | -200 | Top-left area |
| `CENTER, CENTER` | 300 | 200 | Bottom-right area |

#### Font Options:

- `Font.default()` → "objective" at 1.5 size

#### Hud Methods:

| Method | Purpose |
|--------|---------|
| `init()` | Create and position HUD element |
| `update(value)` | Update displayed value |
| `setAlpha(n)` | Set transparency (0-1) |

### Lists Module (library/lists/)

Pre-defined constants for game content:

#### Weapons (library/lists/weapons.ts)

Organized by map and variant:

```typescript
Weapons.zm_tomb.dsr50.default    // "dsr50_zm"
Weapons.zm_tomb.dsr50.upgraded   // "dsr50_upgraded_zm"
Weapons.zm_prison.thompson.upgraded
Weapons.zm_transit.usrpg.default
```

**Supported Maps:**

- zm_tomb (Town/Farm)
- zm_prison (Alcatraz)
- zm_buried
- zm_highrise
- zm_transit
- zm_nuked

#### Perks (library/lists/perks.ts)

```typescript
enum Perks {
    juggernog = `"specialty_armorvest"`,
    quick_revive = `"specialty_quickrevive"`,
    speed_cola = `"specialty_fastreload"`,
    double_tap = `"specialty_rof"`,
    stun_up = `"specialty_longersprint"`,
    deadshot = `"specialty_deadshot"`,
    mule_kick = `"specialty_additionalprimaryweapon"`,
    electric_cherry = `"specialty_grenadepulldeath"`
}
```

---

## Transpilation Process

### Step-by-Step Flow:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         Transpilation Steps                               │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  STEP 1: Configuration Loading                                            │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  Read config.ts                                                  │     │
│  │  ├── Parse scripts[] array                                      │     │
│  │  │   └── Each entry: { name, output_file, input_files[] }       │     │
│  │  └── Parse mods[] array                                         │     │
│  │      └── Each entry: { name, scripts[], metadata }              │     │
│  └─────────────────────────────────────────────────────────────────┘     │
│                                    ↓                                      │
│  STEP 2: Input File Processing                                           │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  For each script in config.scripts:                              │     │
│  │  │                                                                │     │
│  │  │  For each input_file in script.input_files:                   │     │
│  │  │  │                                                            │     │
│  │  │  │  Dynamic import via Node.js:                               │     │
│  │  │  │  await import(`./input/scripts/zm/.../main.ts`)           │     │
│  │  │  │                                                            │     │
│  │  │  │  Extract exports:                                          │     │
│  │  │  │  ├── include_files[]    → Array of strings                │     │
│  │  │  │  ├── init_functions[][] → Array of line arrays            │     │
│  │  │  │  ├── update_functions[][] → Array of line arrays          │     │
│  │  │  │  └── custom_functions[] → { name, lines[], args? }        │     │
│  │  │  │                                                            │     │
│  │  │  └────────────────────────────────────────────────────────────│     │
│  │  │                                                                │     │
│  │  └───────────────────────────────────────────────────────────────┘     │
│  │                                    ↓                                   │
│  │  STEP 3: GSC Code Generation                                          │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  │                                                                 │   │
│  │  │  A. Include Statements:                                         │   │
│  │  │     #include common_scripts\utility;                            │   │
│  │  │     #include maps\mp\gametypes_zm\_hud_util;                   │   │
│  │  │                                                                 │   │
│  │  │  B. Template Append:                                           │   │
│  │  │     init() { level thread onPlayerConnect(); }                 │   │
│  │  │     onPlayerConnect() { ... }                                  │   │
│  │  │     onPlayerSpawned() { ... }                                  │   │
│  │  │                                                                 │   │
│  │  │  C. ttg_init() Generation:                                     │   │
│  │  │     For each init_function line:                               │   │
│  │  │         self.score = 0;                                        │   │
│  │  │         self.thread custom_func();                             │   │
│  │  │                                                                 │   │
│  │  │  D. ttg_update() Generation:                                   │   │
│  │  │     For each update_function line:                             │   │
│  │  │         if (condition) { ... }                                 │   │
│  │  │         wait 0.05;                                             │   │
│  │  │                                                                 │   │
│  │  │  E. Custom Functions:                                          │   │
│  │  │     custom_function_name(arg1, arg2)                           │   │
│  │  │     {                                                          │   │
│  │  │         self do_something();                                   │   │
│  │  │     }                                                          │   │
│  │  │                                                                 │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │
│  │                                    ↓                                   │
│  │  STEP 4: Output Writing                                               │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  │  Write to: ./output/scripts/{output_file}                       │   │
│  │  │  Example: ./output/scripts/zm/zm_tomb/origins_spawnroom.gsc     │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │
│  │                                    ↓                                   │
│  │  STEP 5: Mod Packaging (if configured)                               │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  │  For each mod in config.mods:                                   │     │
│  │  │  │                                                             │     │
│  │  │  │  Create folder: ./output/mods/{mod_name}/                    │     │
│  │  │  │  Write mod.json with metadata                                │     │
│  │  │  │  Copy relevant .gsc files to scripts/                        │     │
│  │  │  │                                                             │     │
│  │  │  └──────────────────────────────────────────────────────────────│     │
│  │  │                                                               │     │
│  └───────────────────────────────────────────────────────────────────────┘
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Example: From TypeScript to GSC

**Input TypeScript:**

```typescript
// main.ts
import Player from '../../library/player';
import Core, { if_statement } from '../../library/core';

export const init_functions = [
    Player.set_value("score", 0),
    Player.set_array("my_weapons", ["c96_zm", "mp40_zm"])
];

export const update_functions = [
    if_statement(
        ['self.score > 5000'],
        [
            Player.i_print_ln_bold('"Level up!"')
        ]
    )
];
```

**Output GSC:**

```gsc
#include common_scripts\utility;

ttg_init()
{
	self.score = 0;
	self.my_weapons = [];
	self.my_weapons[self.my_weapons.size] = "c96_zm";
	self.my_weapons[self.my_weapons.size] = "mp40_zm";
}

ttg_update()
{
	if (self.score > 5000)
	{
		self iprintlnbold("Level up!");
	}
}
```

---

## Script Configuration

### Config Structure (config.ts)

```typescript
const ts_gsc_config = {
    clean_output_folder: boolean,      // Clear output before build
    storage_folder: string,             // Game storage path
    mods: ModConfig[],                  // Mod definitions
    scripts: ScriptConfig[]             // Script definitions
};

type ScriptConfig = {
    name: string,                       // Script identifier
    output_file: string,                // Output .gsc path
    input_files: string[]               // TypeScript source files
};

type ModConfig = {
    name: string,                       // Mod folder name
    scripts: string[],                  // Script names to include
    author: string,
    description: string,
    version: string
};
```

### Script Definition Example:

```typescript
{
    name: "origins-spawnroom-challenge",
    output_file: "zm/zm_tomb/origins_spawnroom_challenge.gsc",
    input_files: [
        "./input/scripts/zm/origins_spawnroom/main.ts",
        "./input/scripts/zm/origins_spawnroom/hud.ts",
        "./input/scripts/zm/origins_generator_challenge/main.ts",
    ],
}
```

### Mod Definition Example:

```typescript
{
    name: "zm_tomb_challenge",
    scripts: ["origins-spawnroom-challenge", "gobblegums", "health-and-zombie-counter"],
    author: "HasjBlok",
    description: "Origins spawnroom challenge with gobblegums and health counter",
    version: "1.0",
}
```

---

## Build System & Mod Management

### npm Scripts (package.json)

| Script | Command | Purpose |
|--------|---------|---------|
| `dev-tools:transpile` | `ts-node ./transpiler/core.ts` | Compile TS to GSC |
| `dev-tools:generate-documentation` | `typedoc ./library` | Generate API docs |
| `dev-tools:full-build` | transpile + docs | Complete build |
| `helpers:sync-mods` | Sync mods to game | Deploy mods |
| `helpers:sync-scripts` | Sync scripts to game | Deploy scripts |
| `helpers:sync-all` | Both sync scripts | Full deploy |
| `dev-tools:build-and-sync-all` | Build + sync all | Build & deploy |

### Sync Helpers (helpers/)

#### sync_mods.ts

- Reads `./output/mods/`
- Copies mod folders to game storage: `{storage_folder}/mods/`

#### sync_scripts.ts

- Reads `./output/scripts/`
- Copies .gsc files to game storage: `{storage_folder}/scripts/`

### Output Structure

**Single Scripts:**

```
output/scripts/
├── zm/health_and_zombie_counter.gsc
├── zm/gobblegums.gsc
├── zm/zm_tomb/
│   ├── origins_spawnroom_challenge.gsc
│   ├── origins_bank.gsc
│   └── ...
└── zm/zm_prison/
    └── wolf-counter.gsc
```

**Mod Package:**

```
output/mods/zm_tomb_challenge/
├── mod.json                    // Metadata
└── scripts/
    ├── origins-spawnroom-challenge.gsc
    ├── gobblegums.gsc
    └── health-and-zombie-counter.gsc
```

**mod.json Format:**

```json
{
    "name": "zm_tomb_challenge",
    "author": "HasjBlok",
    "description": "Origins spawnroom challenge...",
    "version": "1.0"
}
```

---

## Code Examples

### Example 1: Simple Player Score Script

**TypeScript:**

```typescript
// input/scripts/zm/example/main.ts
import Player from '../../library/player';
import Core, { if_statement } from '../../library/core';

export const init_functions = [
    Player.set_value("my_score", 0)
];

export const update_functions = [
    // Check if player has enough points
    if_statement(
        [`${Player.score} >= 5000`],
        [
            Player.i_print_ln_bold('"You can afford something!"')
        ]
    )
];
```

**Generated GSC:**

```gsc
#include common_scripts\utility;

ttg_init()
{
	self.my_score = 0;
}

ttg_update()
{
	if (self.score >= 5000)
	{
		self iprintlnbold("You can afford something!");
	}
}
```

---

### Example 2: HUD Element

**TypeScript:**

```typescript
// input/scripts/zm/health_counter/main.ts
import HudElement, { Font, Point } from '../../../../library/hud_element';
import Core from '../../../../library/core';

const hud = new HudElement({
    name: 'health_counter',
    font: Font.default(),
    point: new Point('CENTER', 'CENTER', 0, 200),
    type: 'number',
    label: '^5Health: ^6'
});

export const include_files = ['maps\\mp\\gametypes_zm\\_hud_util'];
export const init_functions = [hud.init()];
export const update_functions = [Core.thread_custom_function('update_hud')];
export const custom_functions = [
    {
        name: 'update_hud',
        lines: [
            hud.update(`self.health`),
            Core.wait(0.5)
        ]
    }
];
```

**Generated GSC:**

```gsc
#include common_scripts\utility;
#include maps\mp\gametypes_zm\_hud_util;

ttg_init()
{
	self.gpp_ui_health_counter = createFontString("objective", 1.5);
	self.gpp_ui_health_counter setPoint("CENTER", "CENTER", 0, 200);
	self.gpp_ui_health_counter.alpha = 1;
	self.gpp_ui_health_counter.hidewheninmenu = true;
	self.gpp_ui_health_counter.hidewhendead = true;
	self.gpp_ui_health_counter.color = (1, 1, 1);
	self.gpp_ui_health_counter setValue(0);
	self.gpp_ui_health_counter.label = &"^5Health: ^6";
	self.gpp_ui_health_counter.stored_value = 0;
}

ttg_update()
{
	self thread update_hud();
}

update_hud()
{
	if (self.gpp_ui_health_counter.stored_value != self.health)
	{
		self.gpp_ui_health_counter setValue(self.health);
		self.gpp_ui_health_counter.stored_value = self.health;
	}
	wait 0.5;
}
```

---

### Example 3: Gun Game Challenge

**TypeScript (main.ts):**

```typescript
import Player from '../../library/player';
import Weapons from '../../library/lists/weapons';
import Core, { if_statement } from '../../library/core';

const gungame_weapons = [
    Weapons.zm_tomb.c96.default,
    Weapons.zm_tomb.mp40.default,
    Weapons.zm_tomb.dsr50.default,
    // ... more weapons
];

export const custom_functions = [
    {
        name: "next_weapon",
        lines: [
            Player.take_all_weapons(),
            Player.increment_value("gun_index", 1),
            Player.give_weapon(`self.gungame_weapons[self.gun_index]`),
        ],
    },
    {
        name: "player_wins",
        lines: [
            Player.set_value("finished", 1),
            Player.i_print_ln_bold('"Challenge complete!"'),
        ],
    }
];

export const init_functions = [
    Player.set_array("gungame_weapons", gungame_weapons),
    Player.set_value("gun_index", -1),
    Player.set_value("finished", 0),
    Core.run_custom_function("next_weapon"),
];

export const update_functions = [
    if_statement(
        [`self.gun_index >= self.gungame_weapons.size - 1`],
        [Core.thread_custom_function("player_wins")],
        [
            if_statement(
                [`self.weapon_kills >= 10`],
                [Core.thread_custom_function("next_weapon")]
            )
        ]
    )
];
```

---

### Example 4: Gobblegum System (Simplified)

**TypeScript:**

```typescript
// input/scripts/zm/gobblegums/main.ts
import Level from '../../library/level';
import Player from '../../library/player';
import Core, { if_statement, switch_statement, while_loop } from '../../library/core';

const gobblegum_positions: Record<string, string> = {
    'zm_tomb': '(2381, 4752, -301)',
    'zm_prison': '(727, 10670, 1336)',
    'zm_transit': '(-6361, 5480, -55)'
};

export const init_functions = [
    // Set position based on map
    Core.set_local_variable("gobblegum_pos", `(0, 0, 0)`),
    switch_statement(`tolower(getdvar(#"mapname"))`, [
        { case: '"zm_tomb"', do: [Core.set_local_variable("gobblegum_pos", gobblegum_positions['zm_tomb'])] },
        { case: '"zm_prison"', do: [Core.set_local_variable("gobblegum_pos", gobblegum_positions['zm_prison'])] },
        { case: '"zm_transit"', do: [Core.set_local_variable("gobblegum_pos", gobblegum_positions['zm_transit'])] },
    ], []),
    Level.thread("setup_gobblegum_machine(gobblegum_pos[0], gobblegum_pos[1], gobblegum_pos[2])")
];

export const update_functions = [
    if_statement(
        [`self.gobblegum_identifier != "none"`],
        [
            if_statement(
                [`self adsbuttonpressed()`, `self usebuttonpressed()`],
                [
                    Player.i_print_ln_bold(`"Activated gobblegum!"`)
                ]
            )
        ]
    )
];
```

---

## Data Flow Diagrams

### Script Execution Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         GSC Runtime Execution Flow                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Game Loads:                                                                  │
│  ┌─────────────────┐                                                          │
│  │ _init.gsc loads │                                                          │
│  │ your_script.gsc │                                                          │
│  └────────┬────────┘                                                          │
│           ↓                                                                   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐           │
│  │ init() function │───▶│ onPlayerConnect │───▶│ onPlayerSpawned │           │
│  │                 │    │ (waits for      │    │ (waits for      │           │
│  │ Starts threads: │    │  connections)   │    │  spawn)         │           │
│  │ - onPlayerConnect│    └─────────────────┘    └────────┬────────┘           │
│  └─────────────────┘                                      │                    │
│                                                         ↓                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                    Per-Player Loop (0.05s interval)                      │  │
│  │                                                                          │  │
│  │   ┌──────────────────┐                                                  │  │
│  │   │ ttg_init()       │  ← Runs once on spawn                            │  │
│  │   │ - Set variables  │                                                  │  │
│  │   │ - Give items     │                                                  │  │
│  │   │ - Start monitors │                                                  │  │
│  │   └──────────────────┘                                                  │  │
│  │                                                                          │  │
│  │   ┌──────────────────┐                                                  │  │
│  │   │ ttg_update()     │  ← Runs every tick (0.05s = 20Hz)                │  │
│  │   │ - Check conditions│                                                 │  │
│  │   │ - Update HUD     │                                                  │  │
│  │   │ - Game logic     │                                                  │  │
│  │   └──────────────────┘                                                  │  │
│  │                                                                          │  │
│  │   ┌──────────────────┐                                                  │  │
│  │   │ Custom Functions │  ← Called from init/update or events             │  │
│  │   │ - next_weapon()  │                                                  │  │
│  │   │ - player_wins()  │                                                  │  │
│  │   │ - handle_event() │                                                  │  │
│  │   └──────────────────┘                                                  │  │
│  │                                                                          │  │
│  └──────────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Module Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Library Module Dependencies                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ┌─────────────┐                                 │
│                              │   CoreClass │                                 │
│                              │  (core.ts)  │                                 │
│                              └──────┬──────┘                                 │
│                                     │                                        │
│              ┌──────────────────────┼──────────────────────┐                │
│              │                      │                      │                │
│              ↓                      ↓                      ↓                │
│      ┌──────────────┐      ┌──────────────┐      ┌──────────────────┐      │
│      │   Entity     │      │   Level      │      │   PlayerClass    │      │
│      │  (entity.ts) │      │  (level.ts)  │      │   (player.ts)    │      │
│      │              │      │              │      │                  │      │
│      │ - get_value  │      │ - set_value  │      │ - give_perk      │      │
│      │ - set_value  │      │ - set_array  │      │ - give_weapon    │      │
│      │ - run_func   │      │ - wait_till  │      │ - i_print_ln     │      │
│      │ - increment  │      │ - thread     │      │ - has_perk       │      │
│      └──────────────┘      └──────────────┘      └────────┬─────────┘      │
│                                                          │                  │
│                        ┌─────────────────────────────────┘                  │
│                        │                                                        │
│                        ↓                                                        │
│               ┌─────────────────┐                                              │
│               │   HudElement    │                                              │
│               │  (hud_element)  │                                              │
│               │                 │                                              │
│               │ - init()        │                                              │
│               │ - update()      │                                              │
│               │ - setAlpha()    │                                              │
│               └─────────────────┘                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Build Pipeline

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Build Pipeline                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│
### Build Pipeline

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Build Pipeline                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                         Developer Commands                               │  │
│  │                                                                         │  │
│  │   npm run dev-tools:transpile    →  npm run helpers:sync-all           │  │
│  │           ↓                                      ↓                      │  │
│  │   ┌────────────────────┐         ┌────────────────────────────────┐    │  │
│  │   │ TypeScript Files   │         │ Sync to Game Storage Folder    │    │  │
│  │   │ (input/scripts/)   │         │ (C:\Users\...\Plutonium\...)   │    │  │
│  │   └────────────────────┘         └────────────────────────────────┘    │  │
│  │                                                                         │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
│                                    ↓                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                         Runtime in Game                                  │  │
│  │                                                                         │  │
│  │   Player launches game → Loads .gsc scripts → Executes your logic      │  │
│  │                                                                         │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Supported Maps & Features

### Supported Zombies Maps

| Map Name | Internal ID | Full Support |
|----------|-------------|--------------|
| **Town/Farm** | `zm_tomb` | ✓ Full |
| **Prison/Alcatraz** | `zm_prison` | ✓ Full |
| **Buried** | `zm_buried` | ✓ Full |
| **Highrise** | `zm_highrise` | ✓ Full |
| **Transit** | `zm_transit` | ✓ Full |
| **Nuked** | `zm_nuked` | ○ Partial |

### Implemented Features

| Category | Features |
|----------|----------|
| **Player Management** | Score tracking, weapon management, perk system, health monitoring |
| **HUD System** | Text elements, numeric displays, positioning, colors, alpha transparency |
| **Game Logic** | Round-based events, generator capture zones, challenge systems |
| **Weapons** | Full weapon list (default + Pack-a-Punch variants), grenade launchers |
| **Perks** | All 8 classic perks, random perk selection |
| **Events** | Player connect/disconnect, spawn, revive, round change |

### Example Scripts Included

| Script | Location | Description |
|--------|----------|-------------|
| **origins-spawnroom-challenge** | `input/scripts/zm/origins_spawnroom/` | Gun game challenge with weapon progression |
| **gobblegums** | `input/scripts/zm/gobblegums/` | Gobblegum machine with multiple effects |
| **health-counter** | `input/scripts/zm/health_counter/` | Player health HUD display |
| **zombie-counter** | `input/scripts/zm/zombie_counter/` | Round zombie count display |
| **origins-bank** | `input/scripts/zm/origins_bank/` | Point banking system |
| **custom-mystery-box** | `input/scripts/zm/custom_mystery_box/` | Custom mystery box implementation |
| **dev-tools** | `input/scripts/zm/dev_tools/` | Developer utilities (origin display) |

---

## Limitations & Considerations

### Technical Limitations

| Limitation | Description | Workaround |
|------------|-------------|------------|
| **No Runtime Type Checking** | TypeScript types are compile-time only; no enforcement at runtime | Careful code review, testing |
| **Manual Memory Management** | GSC uses manual memory; arrays grow without cleanup | Use local variables, avoid unbounded loops |
| **No Native TypeScript Features** | Some TS features (generics, decorators) don't transpile | Use basic TypeScript features only |
| **String-Based APIs** | Many APIs accept strings that could be typos | IDE autocomplete helps, but not foolproof |
| **Async Limitations** | No true async/await; everything is sequential | Use callbacks, wait statements |
| **Performance** | Script runs every tick (20Hz) | Optimize update functions, use wait(0.5) where possible |

### Common Pitfalls

#### 1. Event Wait Loops

**Avoid:**
```typescript
// BAD: Creates infinite thread
export const custom_functions = [
    {
        name: "bad_monitor",
        lines: [
            while_loop(["true"], [
                Level.wait_till("some_event")
            ])
        ]
    }
];
```

**Better:**
```typescript
// GOOD: Thread properly and exit when needed
export const custom_functions = [
    {
        name: "good_monitor",
        lines: [
            Level.endon("disconnect"),
            while_loop(["true"], [
                Level.wait_till("some_event"),
                // Process event
            ])
        ]
    }
];
```

#### 2. String vs Variable Confusion

**TypeScript:**
```typescript
// This creates a STRING "self.score"
Player.set_value("score", 0)

// This creates a REFERENCE to self.score
Player.set_value("score", `self.score`)
```

**GSC Output:**
```gsc
self.score = 0;           // Set to 0
self.score = self.score;  // No-op (same value)
```

#### 3. Array Building

The transpiler uses GSC's array building pattern:

```typescript
Player.set_array("my_array", ["item1", "item2"])
```

**Transpiles to:**
```gsc
self.my_array = [];
self.my_array[self.my_array.size] = "item1";
self.my_array[self.my_array.size] = "item2";
```

### Best Practices

1. **Modularize Code**: Split logic across multiple files for maintainability
2. **Use TypeScript Features**: Leverage interfaces and types for documentation
3. **Comment Your Code**: GSC output should be readable for debugging
4. **Test Incrementally**: Build and test scripts in small pieces
5. **Use the HUD System**: The HudElement class handles update optimization automatically
6. **Handle Disconnects**: Always use `endon("disconnect")` in player threads
7. **Optimize Updates**: Don't run heavy logic every tick; use `wait` statements

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Script not loading | Wrong output path | Check config.ts output_file path |
| TypeScript errors | Missing imports | Verify relative paths from input file |
| GSC syntax errors | Invalid string interpolation | Use backticks for dynamic values |
| Game crashes | Infinite loops | Check while_loop conditions |
| HUD not showing | Missing include_files | Add `maps\mp\gametypes_zm\_hud_util` |

### Debug Output

The transpiler outputs build progress:

```
[TS_GSC] (origins-spawnroom-challenge) Attempting to import ./input/scripts/zm/origins_spawnroom/main.ts
[TS_GSC] (origins-spawnroom-challenge) 1/3 files loaded.
[TS_GSC] (origins-spawnroom-challenge) Attempting to import ./input/scripts/zm/origins_spawnroom/hud.ts
[TS_GSC] (origins-spawnroom-challenge) 2/3 files loaded.
[TS_GSC] (origins-spawnroom-challenge) Attempting to import ./input/scripts/zm/origins_generator_challenge/main.ts
[TS_GSC] (origins-spawnroom-challenge) 3/3 files loaded.
transpiling_target_origins-spawnroom-challenge: 45.762ms
ts_gsc_complete: 123.456ms
[MOD] Building zm_tomb_challenge
[MOD] zm_tomb_challenge built successfully.
zm_tomb_challenge_built: 12.345ms
```

---

## Development Workflow

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Edit TypeScript files in input/scripts/

# 3. Transpile to GSC
npm run dev-tools:transpile

# 4. Sync to game folder
npm run helpers:sync-all

# 5. Test in game
```

### Adding a New Script

1. **Create TypeScript file** at `input/scripts/zm/my_script/main.ts`
2. **Define exports**:

```typescript
import Player from '../../library/player';
import Core, { if_statement } from '../../library/core';

export const init_functions = [
    // Initialization code
];

export const update_functions = [
    // Per-tick code
];

export const custom_functions = [
    {
        name: "my_function",
        lines: [
            // Function body
        ]
    }
];
```

3. **Add to config.ts**:

```typescript
{
    name: 'my-script',
    output_file: 'zm/my_script.gsc',
    input_files: ['./input/scripts/zm/my_script/main.ts']
}
```

4. **Build and test**

---

## Conclusion

TypeScript-to-GSC (ts_gsc) is a powerful tool that bridges modern TypeScript development practices with Black Ops 2 Zombies scripting. Its key benefits include:

- **Type Safety**: Catch errors at compile time
- **Modular Architecture**: Reusable library components
- **IDE Support**: Autocomplete, refactoring, documentation
- **Build Automation**: Automated transpilation and deployment
- **Mod Packaging**: Easy distribution of complete mod packages

The system is particularly well-suited for complex Zombies game modes, challenges, and custom features that would be cumbersome to develop in raw GSC.

For more information, consult the:
- README.md for setup instructions
- TypeDoc-generated documentation at `/documentation/`
- Example scripts in `input/scripts/zm/`

---

*Report generated for typescript-to-gsc analysis*
*Repository: github.com/maxvanasten/typescript-to-gsc*
