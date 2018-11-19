import { PlaceDescription } from './../models/non-living/enums/placeDescriptions';
import { Place } from './../models/non-living/classes/place';
import { IPlace } from './../models/non-living/interfaces/place';
import { WeaponType } from './../models/non-living/enums/weaponTypes';
import { IWeapon } from './../models/non-living/interfaces/weapon';
import { ArmourType } from './../models/non-living/enums/armourTypes';
import { PotionType } from './../models/non-living/enums/potionTypes';
import { IPotion } from './../models/non-living/interfaces/potion';
import { Armour } from './../models/non-living/classes/armour';
import { Inventory } from '../models/non-living/classes/inventory';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Weapon } from '../models/non-living/classes/weapon';
import { Potion } from '../models/non-living/classes/potion';
import { Constants } from '../core/constants/constants';
import { IArmour } from '../models/non-living/interfaces/armour';

export class Randomizer {

    public static GETRANDOMENUMOPTION(enumerator: { [s: number]: string }): string {
        const options: number = (Object.keys(enumerator).length / 2 - 1);
        // tslint:disable-next-line:insecure-random
        const item: number = (Math.floor(Math.random() * options));

        return enumerator[item];
    }

    public static GENERATERANDOMBOOLEAN(prob: number): boolean {
        // tslint:disable-next-line:insecure-random
        return Math.random() < prob;
    }
    public static GENERATERANDOMNUMBER(maxValue: number): number {
        // tslint:disable-next-line:insecure-random
        return Math.floor(Math.random() * (maxValue + 1));
    }

    public static GENERATERANDOMPOTION(difficultyCoef: number): IPotion {
        return new Potion (difficultyCoef,
                           Randomizer.GENERATERANDOMNUMBER (Constants.maxPotionPower * difficultyCoef * 2),
                           Randomizer.GENERATERANDOMNUMBER (Constants.maxItemPrice * difficultyCoef),
                           Randomizer.GETRANDOMENUMOPTION (PotionType));
    }

    public static GENERATERANDOMARMOUR(difficultyCoef: number): IArmour {
        const armour: IArmour = new Armour (difficultyCoef,
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalResistance * difficultyCoef),
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalResistance * difficultyCoef),
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice * difficultyCoef),
                                            Randomizer.GETRANDOMENUMOPTION (ArmourType));
        if (armour.magicalResistance > armour.physicalResistance) {
            armour.name = `Enchanted ${armour.name}`;
        }

        return armour;
    }
    public static GENERATERANDOMWEAPON(difficultyCoef: number): IWeapon {
        const weapon: IWeapon = new Weapon (difficultyCoef,
                                            Randomizer.GENERATERANDOMBOOLEAN(0.5),
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalDamage * difficultyCoef),
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalDamage * difficultyCoef),
                                            Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice * difficultyCoef),
                                            Randomizer.GETRANDOMENUMOPTION (WeaponType));
        if (weapon.magicalDamage > weapon.physicalDamage) {
            weapon.name = `Enchanted ${weapon.name}`;
        }

        return weapon;
    }
    public static GENERATERANDOMLOOT(difficultyCoef: number): IInventory {
        const loot: IInventory = new Inventory(difficultyCoef);
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addArmour(Randomizer.GENERATERANDOMARMOUR(difficultyCoef));
        }
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addWeapon(Randomizer.GENERATERANDOMWEAPON(difficultyCoef));
        }
        // tslint:disable-next-line:insecure-random
        if (Math.random() < 0.4) {
            loot.addPotion(Randomizer.GENERATERANDOMPOTION(difficultyCoef));
        }

        return loot;
    }

    public static GENERATETRADERINVENTORY (difficultyCoef: number): IInventory {
        const traderInventory: IInventory = new Inventory(difficultyCoef);
        traderInventory.addArmour(Randomizer.GENERATERANDOMARMOUR(difficultyCoef));
        traderInventory.addWeapon(Randomizer.GENERATERANDOMWEAPON(difficultyCoef));
        traderInventory.addPotion(Randomizer.GENERATERANDOMPOTION(difficultyCoef));

        return traderInventory;
    }

    public static GENERATERANDOMPLACE (difficultyCoef: number): IPlace {
        return new Place (difficultyCoef, Randomizer.GENERATERANDOMBOOLEAN(0.65),
                          Randomizer.GETRANDOMENUMOPTION(PlaceDescription),
                          Randomizer.GENERATERANDOMLOOT(difficultyCoef));
    }

    public static GENERATEDIFFICULTYCOEF(x: number, y: number): number {
        return Math.sqrt((x + 1) + (y + 1));
    }

    public static GETRANDOMARRAYELEMENT<T>(array: T[]): T {
        const max: number = Array.length + 1;

        // tslint:disable-next-line:insecure-random
        return array[Math.floor(Math.random() * (max + 1))];
    }
}
