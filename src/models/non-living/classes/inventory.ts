import { IPotion } from './../interfaces/potion';
import { IWeapon } from './../interfaces/weapon';
import { IInventory } from './../interfaces/inventory';
import { IArmour } from '../interfaces/armour';
import { inject } from 'inversify';
import { Iwriter } from '../../../core/UI/interfaces/writer';

export class Inventory implements IInventory {
    private _weapons: IWeapon[];
    private _armour: IArmour[];
    private _potions: IPotion[];
    private _coins: number;
    private _difficultyCoef: number;
    private writer: Iwriter;
    public constructor(difficultyCoef: number, @inject('ui-writer') writer?: Iwriter) {
        if (difficultyCoef === null || difficultyCoef < 0) {
            throw new Error('Difficulty coefficient must be a positive number!');
        }
        if (writer) {
            this.writer = writer;
        }

        this._difficultyCoef = difficultyCoef;
        this._weapons = [];
        this._armour = [];

        this._potions = [];

        this._coins = 0;
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

    public get difficultyCoef(): number {
        return this._difficultyCoef;
    }
    public addWeapon(weapon: IWeapon): void {
        if (weapon === null) {
            throw new Error('Not a valid weapon!');
        }
        this._weapons.push(weapon);
    }
    public addArmour(armour: IArmour): void {
        if (armour === null) {
            throw new Error('Not a valid armour!');
        }
        this._armour.push(armour);
    }
    public addPotion(potion: IPotion): void {
        if (potion === null) {
            throw new Error('Not a valid potion!');
        }
        this._potions.push(potion);
    }
    public addCoins(coins: number): void {
        if (coins === null || coins < 0) {
            throw new Error('Coins must be a positive number!');
        }
        this._coins += coins;
    }

    public removeArmour(armourToRemoveIndex: number): IArmour {
        if (armourToRemoveIndex === null || armourToRemoveIndex < 0) {
            throw new Error(`Current inventory does not include that many armour!`);
        }

        return this._armour.splice(armourToRemoveIndex, 1)[0];
    }

    public removeWeapon(weaponToRemoveIndex: number): IWeapon {
        if (weaponToRemoveIndex === null || weaponToRemoveIndex < 0) {
            throw new Error(`Current inventory does not include that many weapons!`);
        }

        return this._weapons.splice(weaponToRemoveIndex, 1)[0];
    }
    public removePotion(potionToRemoveIndex: number): IPotion {
        if (potionToRemoveIndex === null || potionToRemoveIndex < 0) {
            throw new Error(`Current inventory does not include that many potions!`);
        }

        return this._potions.splice(potionToRemoveIndex, 1)[0];
    }
    public subtractCoins(coinsToRemove: number): void {
        if (coinsToRemove === null || coinsToRemove < 0) {
            throw new Error(`Not a valid amount of coins to remove!`);
        }
        if (this._coins < coinsToRemove) {
            throw new Error(`Insufficient amount of coins!`);
        }
        this._coins -= coinsToRemove;
    }

    public removeAll(): void {
        this._armour = [];
        this._weapons = [];
        this._potions = [];
        this._coins = 0;
    }

    public consumeInventory(inventory: IInventory): void {
        inventory.armour.forEach((armour: IArmour) => this.addArmour(armour));
        inventory.weapons.forEach((weapon: IWeapon) => this.addWeapon(weapon));
        inventory.potions.forEach((potion: IPotion) => this.addPotion(potion));
        this.addCoins(inventory.coins);
        inventory.removeAll();
    }

    public listItems(): string {
        let result: string = '';
        if (this._weapons.length > 0) {
            result += `Weapons:\n`;
            this._weapons.forEach((weapon: IWeapon, index: number) => result +=
                `w${index}-${weapon.name} (Physical: ${weapon.physicalDamage}, Magic: ${weapon.magicalDamage}, Price: ${weapon.price})\n`);
        }
        if (this._armour.length > 0) {
            result += `Armour:\n`;
            // tslint:disable-next-line:max-line-length
            this._armour.forEach((armour: IArmour, index: number) => result += `a${index}-${armour.name} (Physical: ${armour.physicalResistance}, Magic: ${armour.magicalResistance}, Price: ${armour.price})\n`);
        }
        if (this._potions.length > 0) {
            result += `Potions:\n`;
            this._potions.forEach((potion: IPotion, index: number) => result +=
                `p${index}-${potion.name} (Power: ${potion.power}, Price: ${potion.price})\n`);
        }
        if (this._coins > 0) {
            result += `Coins: ${this._coins}`;
        }

        return result !== '' ? result : `No items`;
    }
}
/*
const start: IInventory = new Inventory(1);
start.addArmour(new Armour(start.difficultyCoef));
start.addWeapon(new Weapon(start.difficultyCoef));
start.addPotion(new Potion(start.difficultyCoef));
console.log(start.listItems());
*/
