import { WeaponTypes } from '../enums/weaponTypes';
import { IWeapon } from '../interfaces/weapon';

class Weapon implements IWeapon {
    private _physicalDamage: number;
    private _magicalDamage: number;
    private _price: number;
    private _name: string;

    constructor(physicalDamage?: number, magicalDamage?: number,
                price?: number, name?: string) {
        if (physicalDamage) {
            // Add validation
            this._physicalDamage = physicalDamage;
        } else {
            // Implament randomizer class
            this._physicalDamage = Math.floor(Math.random() * 100);
        }
        if (magicalDamage) {
            // Add validation
            this._magicalDamage = magicalDamage;
        } else {
            // Implament randomizer class
            this._magicalDamage = Math.floor(Math.random() * 100);
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
            if (this._magicalDamage < 50) {
                this._name = Weapon.GETRANDOMWEAPONNAME ();
            } else {
                this._name = `Enchanted ${Weapon.GETRANDOMWEAPONNAME ()}`;
            }
        }
    }

    public static GETRANDOMWEAPONNAME (): string {
        // Implement randomizer method
        const options: number = (Object.keys(WeaponTypes).length / 2 - 1);
        const item: number = (Math.floor(Math.random() * options));

        return WeaponTypes[item];
    }
    public get physicalDamage (): number {
        return this._physicalDamage;
    }
    public get magicalDamage (): number {
        return this._magicalDamage;
    }
    public get price (): number {
        return this._price;
    }

    public get name (): string {
        return this._name;
    }

}

/*
const myWeapon: IWeapon = new Weapon(30, 50, 70, 'Wicked Wand');
const randomWeapon: IWeapon = new Weapon();
console.log(myWeapon, randomWeapon);
*/