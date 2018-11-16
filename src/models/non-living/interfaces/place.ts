import { IDirection } from './../../../core/choices/interface/direction';
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
    directions: IDirection[];
    nextVisitText: string;
    creature: NonHero;
}
