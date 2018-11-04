import { IWeapon } from './weapon';
import { IArmour } from './armour';
import { IPotion } from './potion';

export interface IInventory {
    weapons: IWeapon[];
    armour: IArmour[];
    potions: IPotion[];
    coins: number;
}
