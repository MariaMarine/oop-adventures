import { Randomizer } from './../../../core/constants/randomizer';
import { WeaponType } from '../enums/weaponTypes';
import { IWeapon } from '../interfaces/weapon';
import { Constants } from '../../../core/constants/constants';

export class Weapon implements IWeapon {
    private _physicalDamage: number;
    private _magicalDamage: number;
    private _price: number;
    private _name: string;
    private _oneHanded: boolean;

    constructor(oneHanded?: boolean, physicalDamage?: number, magicalDamage?: number, price?: number, name?: string) {
        if (oneHanded !== undefined && oneHanded !== null) {
            this._oneHanded = oneHanded;
        } else {
            this._oneHanded = Randomizer.GENERATERANDOMBOOLEAN();
        }
        if (physicalDamage) {
            // Add validation
            this._physicalDamage = physicalDamage;
        } else {
            this._physicalDamage = Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalDamage);
        }
        if (magicalDamage) {
            // Add validation
            this._magicalDamage = magicalDamage;
        } else {
            this._magicalDamage = Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalDamage);
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
            if (this._magicalDamage < 50) {
                this._name = Randomizer.GETRANDOMENUMOPTION(WeaponType);
            } else {
                this._name = `Enchanted ${Randomizer.GETRANDOMENUMOPTION(WeaponType)}`;
            }
        }
    }

    public get physicalDamage(): number {
        return this._physicalDamage;
    }
    public get magicalDamage(): number {
        return this._magicalDamage;
    }
    public get price(): number {
        return this._price;
    }

    public get name(): string {
        return this._name;
    }

    public get oneHanded(): boolean {
        return this._oneHanded;
    }

}

/*
const myWeapon: IWeapon = new Weapon(30, 50, 70, 'Wicked Wand');
const randomWeapon: IWeapon = new Weapon();
console.log(myWeapon, randomWeapon);
*/
