import { ICollectable } from './../interfaces/collectable';

import { Randomizer } from '../../../factory/randomizer';
import { IPotion } from './../interfaces/potion';
import { IWeapon } from './../interfaces/weapon';
import { IInventory } from './../interfaces/inventory';
import { IArmour } from '../interfaces/armour';
import { Weapon } from './weapon';
import { Armour } from './armour';
import { Potion } from './potion';
import { Constants } from '../../../core/constants/constants';
export class Inventory implements IInventory {
    private _weapons: IWeapon[];
    private _armour: IArmour[];
    private _potions: IPotion[];
    private _coins: number;

    public constructor(difficultyCoef: number, weapons?: IWeapon[], armour?: IArmour[], potions?: IPotion[], coins?: number) {
        this._weapons = weapons || [new Weapon(difficultyCoef)];

        this._armour = armour || [new Armour(difficultyCoef)];

        this._potions = potions || [new Potion(difficultyCoef)];

        this._coins = coins || Randomizer.GENERATERANDOMNUMBER(Constants.maxCoinLoot * difficultyCoef);
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

     public removeArmour(armourToRemove: string): IArmour[] {
        const armournames: string[] = this._armour.map((el: IArmour) => el.name);
        const index: number = armournames.indexOf(armourToRemove);
        if (!armourToRemove || index < 0) {
            throw new Error(`Current inventory does not include ${armourToRemove}!`);
        }

        return this._armour.splice(index, 1);
    }

    public removeWeapon(weaponToRemove: string): IWeapon[] {
        const weaponames: string[] = this._weapons.map((el: IWeapon) => el.name);
        const index: number = weaponames.indexOf(weaponToRemove);
        if (!weaponToRemove || index < 0) {
            throw new Error(`Current inventory does not include ${weaponToRemove}!`);
        }

        return this._weapons.splice(index, 1);
    }
    public removePotion(potionToRemove: string): IPotion[] {
        const potionNames: string[] = this._potions.map((el: IPotion) => el.name);
        const index: number = potionNames.indexOf(potionToRemove);
        if (!potionToRemove || index < 0) {
            throw new Error(`Current inventory does not include ${potionToRemove}!`);
        }

        return this._potions.splice(index, 1);
    }
    public subtractCoins(coinsToRemove: number): void {
        if (!coinsToRemove || coinsToRemove < 0) {
            throw new Error(`Not a valid amount of coins to remove!`);
        }
        if (this._coins < coinsToRemove) {
            throw new Error (`Insufficient amount of coins!`);
        }
    }

    public removeAll () : void {
        this._armour = [];
        this._weapons = [];
        this._potions = [];
        this._coins = 0;
    }
    public listItems () : string {
        let result: string = '';
        // Sort out repetitions?!
        if (this._weapons.length > 0) {
            result += `Weapons:\n`;
            this._weapons.forEach((weapon: IWeapon, index: number) => result +=
            `${index}-${weapon.name} (Physical: ${weapon.physicalDamage}, Magic: ${weapon.magicalDamage})\n`);
        }
        if (this._armour.length > 0) {
            result += `Armour:\n`;
            this._armour.forEach((armour: IArmour, index: number) => result +=
            `${index}-${armour.name} (Physical: ${armour.physicalResistance}, Magic: ${armour.magicalResistance})\n`);
        }
        if (this._potions.length > 0) {
            result += `Potions:\n`;
            this._potions.forEach((potion: IPotion, index: number) => result +=
            `${index}-${potion.name} (Power: ${potion.power})\n`);
        }
        if (this._coins > 0) {
            result += `Coins: ${this._coins}`;
        }

        return result;
    }
}
/*
const rw: IWeapon = new Weapon(3);
const loot: IInventory = new Inventory (3, [rw], [new Armour(3, 10, 10, 10, 'shd')]);
//console.log(loot);
const arm: IArmour[] = loot.removeArmour('shd');
//console.log(arm);
console.log(loot.listItems);
*/
