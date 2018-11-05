import { IWeapon } from './weapon';
import { IArmour } from './armour';

export interface IEquipment {
    weapon: IWeapon;
    armour: IArmour;
}
