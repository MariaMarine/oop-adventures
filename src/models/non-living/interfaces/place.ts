import { IDirection } from './../../../core/choices/interface/direction';
import { IInventory } from './inventory';
import { IAlive } from '../../living/interfaces/alive';

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
    creature: IAlive;
}
