import { ICollectable } from './collectable';
export interface IPlace {
    name: string;
    // MapPostionX: number;
    // MapPositionY: number;
    visited: boolean;
    containsCreature: boolean;
    introText: string;
    loot: ICollectable [];
}
// Map position may not be necessary?
