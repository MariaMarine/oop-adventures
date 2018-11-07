
import { Randomizer } from '../../../factory/randomizer';
import { ArmourType } from '../enums/armourTypes';
import { IArmour } from '../interfaces/armour';
import { Constants } from '../../../core/namespaces/constants';

export class Armour implements IArmour {
    private _physicalResistance: number;
    private _magicalResistance: number;
    private _price: number;
    private _name: string;

    public constructor (difficultyCoef: number, physicalResistance?: number, magicalResistance?: number,
                        price?: number, name?: string) {
        if (physicalResistance !== null) {
            this._physicalResistance = physicalResistance ||
            Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalResistance * difficultyCoef);
        }
        if (magicalResistance !== null) {
            this._magicalResistance = magicalResistance || 
            Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalResistance * difficultyCoef);
        }
        if (price !== null) {
            this._price = price || 
            Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice * difficultyCoef);
        }
        if (name && name !== '') {
            this._name = name;
        } else {
            this._magicalResistance < Constants.maxMagicalResistance * difficultyCoef / 2 ?
                this._name = Randomizer.GETRANDOMENUMOPTION (ArmourType) :
                this._name = `Enchanted ${ Randomizer.GETRANDOMENUMOPTION (ArmourType)}`;
            }
    }

    public get physicalResistance (): number {
        return this._physicalResistance;
    }
    public get magicalResistance (): number {
        return this._magicalResistance;
    }
    public get price (): number {
        return this._price;
    }
    public get name (): string {
        return this._name;
    }
}

/*
const armour1: IArmour = new Armour(5);
const armour2: IArmour = new Armour(1, 20, 50, 70, 'Average Overpriced Armour');
console.log (armour1, armour2);
*/
