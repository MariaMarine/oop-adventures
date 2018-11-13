import { Randomizer } from '../../../factory/randomizer';
import { WeaponType } from '../enums/weaponTypes';
import { IWeapon } from '../interfaces/weapon';
import { Constants } from '../../../core/namespaces/constants';

export class Weapon implements IWeapon {
    private _physicalDamage: number;
    private _magicalDamage: number;
    private _price: number;
    private _name: string;
    private _oneHanded: boolean;

    public constructor(difficultyCoef: number, oneHanded?: boolean,
                       physicalDamage?: number, magicalDamage?: number, price?: number, name?: string) {
        if (difficultyCoef === null || difficultyCoef < 0) {
            throw new Error ('Difficulty coefficient must be a positive number!');
            }

        this.oneHanded = oneHanded || Randomizer.GENERATERANDOMBOOLEAN();

        this.physicalDamage = physicalDamage ||
        Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalDamage * difficultyCoef);

        this.magicalDamage = magicalDamage ||
        Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalDamage * difficultyCoef);

        this.price = price ||
        Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice * difficultyCoef);

        this.name = name || (this._magicalDamage < this._physicalDamage ?
            Randomizer.GETRANDOMENUMOPTION (WeaponType) :
            `Enchanted ${ Randomizer.GETRANDOMENUMOPTION (WeaponType)}`);
        }

    public get physicalDamage(): number {
        return this._physicalDamage;
    }
    public set physicalDamage (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Physical damage must be a positive number!');
        }
        this._physicalDamage = input;
    }
    public get magicalDamage(): number {
        return this._magicalDamage;
    }
    public set magicalDamage (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Magical damage must be a positive number!');
        }
        this._magicalDamage = input;
    }
    public get price(): number {
        return this._price;
    }
    public set price (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Price must be a positive number!');
        }
        this._price = input;
    }
    public get name(): string {
        return this._name;
    }
    public set name (input: string) {
        if (input === null || input.length < 3) {
            throw new Error ('Name must contain at least 3 characters!');
        }
        this._name = input;
    }
    public get oneHanded(): boolean {
        return this._oneHanded;
    }
    public set oneHanded (input: boolean) {
        if (input === null) {
            throw new Error ('Onehanded must be either true or false!');
        }
        this._oneHanded = input;
    }

}
/*
const myWeapon: IWeapon = new Weapon(1, true, 30, 50, 70, 'Wicked Wand');
const randomWeapon: IWeapon = new Weapon(2);
console.log(myWeapon, randomWeapon);
*/
