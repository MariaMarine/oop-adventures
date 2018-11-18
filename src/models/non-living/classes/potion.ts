import { IPotion } from '../interfaces/potion';

export class Potion implements IPotion {
    private _power: number;
    private _price: number;
    private _name: string;

    public constructor (difficultyCoef: number, power: number, price: number, name: string) {
        if (difficultyCoef === null || difficultyCoef < 0) {
            throw new Error ('Difficulty coefficient must be a positive number!');
            }
        this.power = power;
        this.price = price;
        this.name = name;
    }

    public get power (): number {
        return this._power;
    }
    public set power (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Power must be a positive number!');
        }
        this._power = input;
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
    public get price (): number {
        return this._price;
    }
    public set price (input: number) {
        if (input === null || input < 0) {
            throw new Error ('Price must be a positive number!');
        }
        this._price = input;
    }
}
