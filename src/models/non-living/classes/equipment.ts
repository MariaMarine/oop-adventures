import { Randomizer } from './../../../core/constants/randomizer';
import { IArmour } from './../interfaces/armour';
import { IWeapon } from './../interfaces/weapon';
import { IEquipment } from './../interfaces/equipment';
import { Ishield } from '../interfaces/shield';

export class Equipment implements IEquipment {
    private _weapon: IWeapon;
    private _armour: IArmour;
    private _shield: Ishield;

    public constructor (weapon?: IWeapon, armour?: IArmour, shield?: Ishield) {
        if (weapon) {
            this._weapon = weapon;
        }
        if (armour) {
            this._armour = armour;
        }
        if (shield) {
            this._shield = shield;
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
    public get shield (): Ishield {
        return this._shield;
    }
    public set shield (newShield: Ishield) {
        this._shield = newShield;
    }

}

/*
const myEquipment: IEquipment = new Equipment();
const beginnerEquipment: IEquipment =
    new Equipment (new Weapon(10, 1, 10, 'Rusty Knife'),
                   new Armour (10, 1, 10, 'A thick layer of clothes'));
console.log(myEquipment, beginnerEquipment);
*/
