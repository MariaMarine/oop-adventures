import { IWeapon } from './weapon';
import { IArmour } from './armour';

export interface IInventory {
    weapons: IWeapon[];
    armour: IArmour[];
}
