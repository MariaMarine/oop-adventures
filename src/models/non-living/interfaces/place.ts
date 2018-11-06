import { IInventory } from './inventory';
import { Idirection } from '../../../core/commands/interface/direction';
export interface IPlace {
    // Name: string;
    // MapPostionX: number;
    // MapPositionY: number;
    visited: boolean;
    containsCreature: boolean;
    introText: string;
    loot: IInventory;
    directions: Idirection[];
}
