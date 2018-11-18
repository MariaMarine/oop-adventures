import { IInventory } from './inventory';
import { NonHero } from '../../living/classes/non-hero';

export interface IPlace {
    // Name: string;
    // MapPostionX: number;
    // MapPositionY: number;
    visited: boolean;
    containsCreature: boolean;
    introText: string;
    loot: IInventory;
    nextVisitText: string;
    creature: NonHero;
}
