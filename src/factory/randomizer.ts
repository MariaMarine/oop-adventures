import { Armour } from './../models/non-living/classes/armour';
import { Inventory } from '../models/non-living/classes/inventory';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Weapon } from '../models/non-living/classes/weapon';
import { Potion } from '../models/non-living/classes/potion';

export class Randomizer {

    public static GETRANDOMENUMOPTION(enumerator: { [s: number]: string }): string {
        const options: number = (Object.keys(enumerator).length / 2 - 1);
        // tslint:disable-next-line:insecure-random
        const item: number = (Math.floor(Math.random() * options));

        return enumerator[item];
    }

    public static GENERATERANDOMBOOLEAN(): boolean {
        // tslint:disable-next-line:insecure-random
        return Math.random() < 0.5;
    }
    public static GENERATERANDOMNUMBER(maxValue: number): number {
        // tslint:disable-next-line:insecure-random
        return Math.floor(Math.random() * (maxValue + 1));
    }
    public static GENERATERANDOMLOOT(difficultyCoef: number): IInventory {
        const loot: IInventory = new Inventory(difficultyCoef);
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addArmour(new Armour (difficultyCoef));
        }
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addWeapon(new Weapon (difficultyCoef));
        }
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addPotion(new Potion (difficultyCoef));
        }

        return loot;
    }

    public static GENERATETRADERINVENTORY (difficultyCoef: number): IInventory {
        const traderInventory: IInventory = new Inventory(difficultyCoef);
        traderInventory.addArmour(new Armour(difficultyCoef));
        traderInventory.addWeapon(new Weapon(difficultyCoef));
        traderInventory.addPotion(new Potion(difficultyCoef));

        return traderInventory;
    }
    public static GENERATEDIFFICULTYCOEF(x: number, y: number): number {
        return Math.sqrt((x + 1) + (y + 1));
    }

    public static GETRANDOMARRAYELEMENT<T>(array: T[]): T {
        const max: number = Array.length + 1;

        // tslint:disable-next-line:insecure-random
        return array[Math.floor(Math.random() * (max  + 1))];

        // tslint:disable-next-line:insecure-random

    }
}
