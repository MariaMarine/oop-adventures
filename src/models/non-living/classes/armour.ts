import { Constants } from './../../../core/constants/constants';
import { Randomizer } from './../../../core/constants/randomizer';
import { ArmourType } from '../enums/armourTypes';
import { IArmour } from '../interfaces/armour';

export class Armour implements IArmour {
    private _physicalResistance: number;
    private _magicalResistance: number;
    private _price: number;
    private _name: string;

    public constructor (physicalResistance?: number, magicalResistance?: number,
                        price?: number, name?: string) {
        if (physicalResistance) {
            // Add validation
            this._physicalResistance = physicalResistance;
        } else {
            this._physicalResistance = Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalResistance);
        }
        if (magicalResistance) {
            // Add validation
            this._magicalResistance = magicalResistance;
        } else {
            this._magicalResistance = Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalResistance);
        }
        if (price) {
            // Add validation
            this._price = price;
        } else {
            this._price = Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice);
        }
        if (name) {
            // Add validation
            this._name = name;
        } else {
            if (this._magicalResistance < 50) {
                this._name = Randomizer.GETRANDOMENUMOPTION (ArmourType);
            } else {
                this._name = `Enchanted ${ Randomizer.GETRANDOMENUMOPTION (ArmourType)}`;
            }
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

/* Test
const armour1: IArmour = new Armour();
const armour2: IArmour = new Armour(20, 50, 70, 'Average Overpriced Armour');
console.log (armour1, armour2);
*/
