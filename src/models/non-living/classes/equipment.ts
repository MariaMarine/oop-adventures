import { Armour } from './armour';
import { Weapon } from './weapon';
import { Randomizer } from '../../../factory/randomizer';
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
            this.weapon = weapon;
        }
        if (armour) {
            this.armour = armour;
        }
        if (shield) {
            this.shield = shield;
        }
    }
    public get weapon (): IWeapon {
        return this._weapon;
    }
    public set weapon (newWeapon: IWeapon) {
        if (newWeapon === null) {
            throw new Error ('Not a valid weapon!');
        }
        this._weapon = newWeapon;
    }
    public get armour (): IArmour {
        return this._armour;
    }

    public set armour (newArmour: IArmour) {
        if (newArmour === null) {
            throw new Error ('Not a valid armour!');
        }
        this._armour = newArmour;
    }
    public get shield (): Ishield {
        return this._shield;
    }
    public set shield (newShield: Ishield) {
        if (newShield === null) {
            throw new Error ('Not a valid shield!');
        }
        this._shield = newShield;
    }

}
/*
const myEquipment: IEquipment = new Equipment();
const beginnerEquipment: IEquipment =
    new Equipment (new Weapon(1, true, 10, 1, 10, 'Rusty Knife'),
                   new Armour (1, 10, 1, 10, 'A thick layer of clothes'));
console.log(myEquipment, beginnerEquipment);
*/
