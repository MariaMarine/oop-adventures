import { IInventory } from './inventory';
import { ICollectable } from './collectable';
export interface IPlace {
    // Name: string;
    // MapPostionX: number;
    // MapPositionY: number;
    visited: boolean;
    containsCreature: boolean;
    introText: string;
    // To add: loot: IInventory;
}

