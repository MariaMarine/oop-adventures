import { Inventory } from '../models/non-living/classes/inventory';
import { IInventory } from '../models/non-living/interfaces/inventory';

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
    public static GENERATERANDOMLOOT() : IInventory {
        return new Inventory();
    }
    public static GENERATEDIFFICULTYCOEF(x: number, y: number): number {
        return Math.sqrt(x * y);
    }
}
