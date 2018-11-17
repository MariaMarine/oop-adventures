import { Inventory } from './../../non-living/classes/inventory';
import { IInventory } from './../../non-living/interfaces/inventory';
import { LivingBeingModel } from './livingBeing-model';
import { IAlive } from '../interfaces/alive';
import { Randomizer } from '../../../factory/randomizer';

export class NonHero extends LivingBeingModel implements IAlive {
    private sayStrings: string[];
    private _nonHeroType: string;
    private _inventory: IInventory;

    public constructor(
        nonHeroType: string,
        name: string,
        life: number,
        strength: number,
        magicResistance: number,
        sayStrings: string[],
        fearFactor: number,
        inventory: IInventory,
        isMagical: boolean,
        magicStrings?: string[]
        ) {
            super(name, life, strength, magicResistance, fearFactor, isMagical, magicStrings);
            this.sayStrings = sayStrings;
            this._nonHeroType = nonHeroType;
            this._inventory = inventory;
        }
        public get nonHeroType(): string {
            return this._nonHeroType;
        }
    public get inventory (): IInventory {
        return this._inventory;
    }

    // To implement say()
    public say(): string {
            return Randomizer.GETRANDOMARRAYELEMENT(this.sayStrings);
          }
}
