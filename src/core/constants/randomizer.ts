import { Inventory } from './../../models/non-living/classes/inventory';
import { IInventory } from './../../models/non-living/interfaces/inventory';
import { IPotion } from './../../models/non-living/interfaces/potion';
import { Potion } from './../../models/non-living/classes/potion';
import { Armour } from './../../models/non-living/classes/armour';
import { IArmour } from './../../models/non-living/interfaces/armour';
import { IWeapon } from './../../models/non-living/interfaces/weapon';
import { Weapon } from '../../models/non-living/classes/weapon';
export class Randomizer {

    public static GETRANDOMENUMOPTION (enumerator: { [s: number]: string }): string {
        const options: number = (Object.keys(enumerator).length / 2 - 1);
        const item: number = (Math.floor(Math.random() * options));

        return enumerator[item];
    }

    public static GENERATERANDOMBOOLEAN() : boolean {
        return Math.random() < 0.5;
    }
    public static GENERATERANDOMNUMBER(maxValue: number) : number {
        return Math.floor(Math.random() * (maxValue + 1));
    }

    public static GENERATERANDOMWEAPON () : IWeapon {
        return new Weapon();
    }
    public static GENERATERANDOMWARMOUR() : IArmour {
        return new Armour();
    }
    public static GENERATERANDOMPOTION() : IPotion {
        return new Potion();
    }
    public static GENERATERANDOMLOOT() : IInventory {
        return new Inventory();
    }
}
