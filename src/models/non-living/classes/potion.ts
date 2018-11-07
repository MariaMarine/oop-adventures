import { PotionType } from './../enums/potionTypes';
import { Randomizer } from '../../../factory/randomizer';
import { IPotion } from '../interfaces/potion';
import { Constants } from '../../../core/namespaces/constants';

export class Potion implements IPotion {
    private _power: number;
    private _price: number;
    private _name: string;

    public constructor (difficultyCoef: number, power?: number, price?: number, name?: string) {
            this._power = power || Randomizer.GENERATERANDOMNUMBER (Constants.maxPotionPower * difficultyCoef);
            this._price = price || Randomizer.GENERATERANDOMNUMBER (Constants.maxItemPrice * difficultyCoef);
            this._name = name || Randomizer.GETRANDOMENUMOPTION (PotionType);
    }

    public get power (): number {
        return this._power;
    }

    public get name (): string {
        return this._name;
    }

    public get price (): number {
        return this._price;
    }
}
/*
const potion1: IPotion = new Potion ();
const potion2: IPotion = new Potion (44);
console.log(potion1, potion2);
*/