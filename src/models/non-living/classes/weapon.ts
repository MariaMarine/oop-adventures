import { IWeapon } from '../interfaces/weapon';

export class Weapon implements IWeapon {
    private _physicalDamage: number;
    private _magicalDamage: number;
    private _price: number;
    private _name: string;
    private _oneHanded: boolean;

    public constructor(difficultyCoef: number, oneHanded: boolean,
                       physicalDamage: number, magicalDamage: number, price: number, name: string) {
        if (difficultyCoef === null || difficultyCoef < 0) {
            throw new Error ('Difficulty coefficient must be a positive number!');
            }
        this.oneHanded = oneHanded;
        this.physicalDamage = physicalDamage;
        this.magicalDamage = magicalDamage;
        this.price = price;
        this.name = name;
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
