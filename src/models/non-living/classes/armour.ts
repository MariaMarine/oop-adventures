import { ArmourTypes } from '../enums/armourTypes';
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
            // Implament randomizer class
            this._physicalResistance = Math.floor(Math.random() * 100);
        }
        if (magicalResistance) {
            // Add validation
            this._magicalResistance = magicalResistance;
        } else {
            // Implament randomizer class
            this._magicalResistance = Math.floor(Math.random() * 100);
        }
        if (price) {
            // Add validation
            this._price = price;
        } else {
            // Implament randomizer class
            this._price = Math.floor(Math.random() * 100);
        }
        if (name) {
            // Add validation
            this._name = name;
        } else {
            if (this._magicalResistance < 50) {
                this._name = Armour.GETRANDOMARMOURNAME ();
            } else {
                this._name = `Enchanted ${Armour.GETRANDOMARMOURNAME ()}`;
            }
        }
    }

    public static GETRANDOMARMOURNAME (): string {
        const options: number = (Object.keys(ArmourTypes).length / 2 - 1);
        const item: number = (Math.floor(Math.random() * options));

        return ArmourTypes[item];
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
console.log(armour1, armour2);
*/
