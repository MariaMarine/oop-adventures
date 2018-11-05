import { Armour } from './armour';
import { Weapon } from './weapon';
import { Randomizer } from './../../../core/constants/randomizer';
import { IArmour } from './../interfaces/armour';
import { IWeapon } from './../interfaces/weapon';
import { IEquipment } from './../interfaces/equipment';

export class Equipment implements IEquipment {
    private _weapon: IWeapon;
    private _armour: IArmour;

    public constructor (weapon?: IWeapon, armour?: IArmour) {
        if (weapon) {
            this._weapon = weapon;
        } else {
            this._weapon =  Randomizer.GENERATERANDOMWEAPON();
        }
        if (armour) {
            this._armour = armour;
        } else {
            this._armour =  Randomizer.GENERATERANDOMWARMOUR();
        }
    }
    public get weapon (): IWeapon {
        return this._weapon;
    }
    public set weapon (newWeapon: IWeapon) {
        this._weapon = newWeapon;
    }
    public get armour (): IArmour {
        return this._armour;
    }

    public set armour (newArmour: IArmour) {
        this._armour = newArmour;
    }

}

/*
const myEquipment: IEquipment = new Equipment();
const beginnerEquipment: IEquipment =
    new Equipment (new Weapon(10, 1, 10, 'Rusty Knife'),
                   new Armour (10, 1, 10, 'A thick layer of clothes'));
console.log(myEquipment, beginnerEquipment);
*/
