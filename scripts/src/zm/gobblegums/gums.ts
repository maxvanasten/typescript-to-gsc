import Core from "../../../../library/core";
import Player from "../../../../library/player";

export const powerup_list = [
    `"nuke"`,
    `"insta_kill"`,
    `"full_ammo"`,
    `"double_points"`,
    `"carpenter"`,
    `"fire_sale"`,
    `"free_perk"`,
];

export type Gobblegum = {
    name: string;
    identifier: string;
    description: string;
    activations: number;
    activate_function: {
        name: string;
        arguments?: string[];
        lines: string[][];
    };
};

export const gobblegums: Gobblegum[] = [
    {
        name: "In plain sight",
        identifier: "in_plain_sight",
        description: "Zombies ignore the player for 10 seconds upon use.",
        activations: 2,
        activate_function: {
            name: "gg_in_plain_sight",
            arguments: [],
            lines: [
                Player.set_value("ignoreme", `true`),

                Player.set_value("gobblegum_cooldown", 10),
                Core.wait(10),

                Player.set_value("ignoreme", `false`),
            ],
        },
    },
    // {
    //     name: "Powerup",
    //     identifier: "powerup",
    //     description: "Drop a powerup",
    //     activations: 1,
    //     activate_function: {
    //         name: "gg_powerup",
    //         arguments: [],
    //         lines: [
    //             // Get random powerup to drop
    //             Core.set_local_variable("powerup_name", Core.random_from_array("self.powerup_list")),
    //             // [`powerup_name = ${Core.random_from_array("self.powerup_list")}`],
    //             // TODO: get player origin
    //             // Drop random powerup
    //             // [`maps\\mp\\zombies\\_zm_powerups::specific_powerup_drop(self.powerup_name, ${Player.origin})`],
    //             Player.run_function(`maps\\mp\\zombies\\_zm_powerups::specific_powerup_drop(powerup_name, ${Player.origin})`),
    //             Player.set_value("gobblegum_cooldown", 10),
    //         ]
    //     },
    // },
    // NOTE: MAX AMMO DROP
    {
        name: "Resupply",
        identifier: "resupply",
        description: "Activates a max ammo powerup (3 uses)",
        activations: 3,
        activate_function: {
            name: "gg_resupply",
            arguments: [],
            lines: [
                Player.run_function(`maps\\mp\\zombies\\_zm_powerups::specific_powerup_drop("full_ammo", ${Player.origin})`),
                Player.set_value("gobblegum_cooldown", 10),
            ]
        },
    },
    // NOTE: DOUBLE POINTS DROP
    {
        name: "Multiplier",
        identifier: "multiplier",
        description: "Activates a double points powerup (3 uses)",
        activations: 3,
        activate_function: {
            name: "gg_multiplier",
            arguments: [],
            lines: [
                Player.run_function(`maps\\mp\\zombies\\_zm_powerups::specific_powerup_drop("double_points", ${Player.origin})`),
                Player.set_value("gobblegum_cooldown", 10),
            ]
        },
    },
    // NOTE: PERK DROP
    {
        name: "Perk drop",
        identifier: "perkdrop",
        description: "Activates a perk drop (3 uses)",
        activations: 3,
        activate_function: {
            name: "gg_perkdrop",
            arguments: [],
            lines: [
                Player.run_function(`maps\\mp\\zombies\\_zm_powerups::specific_powerup_drop("free_perk", ${Player.origin})`),
                Player.set_value("gobblegum_cooldown", 10),
            ]
        },
    },
];
