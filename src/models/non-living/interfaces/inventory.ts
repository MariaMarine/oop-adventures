import { IWeapon } from './weapon';
import { IArmour } from './armour';
import { IPotion } from './potion';

export interface IInventory {
    weapons: IWeapon[];
    armour: IArmour[];
    potions: IPotion[];
    coins: number;
    addArmour(armour: IArmour): void;
    addWeapon(weapon: IWeapon): void;
    addPotion(potion: IPotion): void;
    addCoins(coins: number): void;
}
