import { ICollectable } from './collectable';
import { IWeapon } from './weapon';
import { IArmour } from './armour';
import { IPotion } from './potion';

export interface IInventory {
    weapons: IWeapon[];
    armour: IArmour[];
    potions: IPotion[];
    coins: number;
    difficultyCoef: number;
    addArmour(armour: IArmour): void;
    addWeapon(weapon: IWeapon): void;
    addPotion(potion: IPotion): void;
    addCoins(coins: number): void;
    removeArmour(armourToRemove: string): IArmour[];
    removeWeapon(weaponToRemove: string): IWeapon[];
    removePotion(potionToRemove: string): IPotion[];
    subtractCoins(coinsToRemove: number): void;
    removeAll(): void;
    listItems(): string;
}
