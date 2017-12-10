/**
 * Created by Larken on 6/22/2017.
 */
import ROT from "rot-js";
import SimpleEnemy from "#/entities/actors/enemies/SimpleEnemy.js";
import {getRandomInt} from "#/utils/HelperFunctions.js";
import {createSword, Sword} from "#/entities/items/weapons/Sword.js";
import HealthPotion from "#/entities/items/potions/HealthPotion.js";
import StrengthPotion from "#/entities/items/potions/StrengthPotion.js";
import {Game} from "#/Game.js";
import {SteelArrow} from "#/entities/items/weapons/ranged/ammo/Arrow.js";

export default class Kobold extends SimpleEnemy {
    constructor(x, y, id, ranged = false) {
        let randomHP = getRandomInt(40, 45);
        let randomStr = getRandomInt(15, 20);
        super(x, y, {
            id: id,
            name: "Kobold",
            description: "A cold-blooded kobold!",
            visible: true,
            blocked: true,
            chasing: false,
            combat: {
                /* options.combat, dedicated to all things related to combat */
                description: [" attacked "],
                /* max stats */
                maxhp: randomHP,
                maxmana: 5,
                /* current stats */
                hp: randomHP,
                mana: 5,
                str: randomStr,
                def: 1,
                /* misc */
                hostile: true,
                range: 9,
                invulnerable: false,
            }
        });
        let dropTable = {
            "STRENGTH_POTION": 1,
            "HEALTH_POTION": 1,
            "STEEL_ARROW": 2,
            "SWORD": 1
        }
        let roll = getRandomInt(1, 3);
        for (let i = 0; i < roll; i++) {
            let chosenItem = ROT.RNG.getWeightedValue(dropTable);
            switch (chosenItem) {
                case "STRENGTH_POTION":
                    this.addToInventory(new StrengthPotion(this.x, this.y, 969));
                    break;
                case "HEALTH_POTION":
                    this.addToInventory(new HealthPotion(this.x, this.y, 488));
                    break;
                case "SWORD":
                    this.addToInventory(createSword(this.x, this.y, 35));
                    break;
                case "STEEL_ARROW":
                    this.addToInventory(new SteelArrow(this.x, this.y, 784, 5));
                    break;
                default:
                    console.log("tried to add some item that doesn't exist to an inventroy from drop table");
                    console.log(chosenItem);
            }
        }
    }

}
