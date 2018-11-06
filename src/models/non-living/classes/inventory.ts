import { Randomizer } from '../../../factory/randomizer';
import { IPotion } from './../interfaces/potion';
import { IWeapon } from './../interfaces/weapon';
import { IInventory } from './../interfaces/inventory';
import { IArmour } from '../interfaces/armour';
import { Weapon } from './weapon';
import { Armour } from './armour';
import { Potion } from './potion';
import { Constants } from '../../../core/namespaces/constants';
export class Inventory implements IInventory {
    private _weapons: IWeapon[];
    private _armour: IArmour[];
    private _potions: IPotion[];
    private _coins: number;

    public constructor(weapons?: IWeapon[], armour?: IArmour[], potions?: IPotion[], coins?: number) {
        this._weapons = weapons || [new Weapon()];

        this._armour = armour || [new Armour()];

        this._potions = potions || [new Potion()];

        if (coins) {
            this._coins = coins;
        } else {
            this._coins = Randomizer.GENERATERANDOMNUMBER(Constants.maxCoinLoot);
        }
    }
    public get weapons(): IWeapon[] {
        return this._weapons;
    }
    public get armour(): IArmour[] {
        return this._armour;
    }
    public get potions(): IPotion[] {
        return this._potions;
    }
    public get coins(): number {
        return this._coins;
    }
    public addWeapon(weapon: IWeapon): void {
        if (!weapon) {
            throw new Error('Not a valid weapon!');
        }
        this._weapons.push(weapon);
    }
    public addArmour(armour: IArmour): void {
        if (!armour) {
            throw new Error('Not a valid armour!');
        }
        this._armour.push(armour);
    }
    public addPotion(potion: IPotion): void {
        if (!potion) {
            throw new Error('Not a valid potion!');
        }
        this._potions.push(potion);
    }
    public addCoins(coins: number): void {
        if (!coins || coins < 0) {
            throw new Error('Coins must be a positive number!');
        }
        this._coins += coins;
    }

    // Add remove methods
}
/*
const loot: IInventory = new Inventory ();
console.log(loot);
*/
