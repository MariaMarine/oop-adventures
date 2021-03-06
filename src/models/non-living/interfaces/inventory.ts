import { IWeapon } from './weapon';
import { IArmour } from './armour';
import { IPotion } from './potion';

export interface IInventory {
    weapons: IWeapon[];
    armour: IArmour[];
    potions: IPotion[];
    coins: number;
    difficultyCoef: number;
    consumeInventory(inventory: IInventory): void;
    addArmour(armour: IArmour): void;
    addWeapon(weapon: IWeapon): void;
    addPotion(potion: IPotion): void;
    addCoins(coins: number): void;
    removeArmour(armourToRemoveIndex: number): IArmour;
    removeWeapon(weaponToRemoveIndex: number): IWeapon;
    removePotion(potionToRemoveIndex: number): IPotion;
    subtractCoins(coinsToRemove: number): void;
    removeAll(): void;
    listItems(): string;
}
