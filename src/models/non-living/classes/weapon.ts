import { Randomizer } from '../../../factory/randomizer';
import { WeaponType } from '../enums/weaponTypes';
import { IWeapon } from '../interfaces/weapon';
import { Constants } from '../../../core/constants/constants';

export class Weapon implements IWeapon {
    private _physicalDamage: number;
    private _magicalDamage: number;
    private _price: number;
    private _name: string;
    private _oneHanded: boolean;

    public constructor(difficultyCoef: number, oneHanded?: boolean,
                       physicalDamage?: number, magicalDamage?: number, price?: number, name?: string) {
        if (oneHanded !== null) {
            this._oneHanded = oneHanded || Randomizer.GENERATERANDOMBOOLEAN();
        }
        if (physicalDamage !== null) {
            this._physicalDamage = physicalDamage ||
             Randomizer.GENERATERANDOMNUMBER(Constants.maxPhysicalDamage * difficultyCoef);
        }
        if (magicalDamage !== null) {
            this._magicalDamage = magicalDamage ||
             Randomizer.GENERATERANDOMNUMBER(Constants.maxMagicalDamage * difficultyCoef);
        }
        if (price !== null) {
            this._price = price || 
            Randomizer.GENERATERANDOMNUMBER(Constants.maxItemPrice * difficultyCoef);
        }
        if (name && name !== '') {
            this._name = name;
        } else {
            this._magicalDamage < this._physicalDamage ?
                this._name = Randomizer.GETRANDOMENUMOPTION(WeaponType) :
                this._name = `Enchanted ${Randomizer.GETRANDOMENUMOPTION(WeaponType)}`;
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
const myWeapon: IWeapon = new Weapon(1, true, 30, 50, 70, 'Wicked Wand');
const randomWeapon: IWeapon = new Weapon(5);
console.log(myWeapon, randomWeapon);
*/
