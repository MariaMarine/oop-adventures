import { IArmour } from '../interfaces/armour';

export class Armour implements IArmour {
    private _physicalResistance: number;
    private _magicalResistance: number;
    private _price: number;
    private _name: string;

    public constructor (difficultyCoef: number, physicalResistance: number, magicalResistance: number,
                        price: number, name: string) {
        if (difficultyCoef === null || difficultyCoef < 0) {
            throw new Error ('Difficulty coefficient must be a positive number!');
        }
        this.physicalResistance = physicalResistance;
        this.magicalResistance = magicalResistance;
        this.price = price;
        this.name = name;
    }

    public get physicalResistance (): number {
        return this._physicalResistance;
    }

    public set physicalResistance (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Physical resistance must be a positive number!');
        }
        this._physicalResistance = input;
    }
    public get magicalResistance (): number {
        return this._magicalResistance;
    }

    public set magicalResistance (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Magical resistance must be a positive number!');
    }
        this._magicalResistance = input;
}
    public get price (): number {
        return this._price;
    }

    public set price (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Price must be a positive number!');
        }
        this._price = input;
    }
    public get name (): string {
        return this._name;
    }
    public set name (input: string) {
        if (input === null || input.length < 3) {
            throw new Error ('Name must contain at least 3 characters!');
        }
        this._name = input;
    }
}
