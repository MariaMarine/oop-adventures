import { ICollectable } from './collectable';
export interface IPlace {
    name: string;
    mapPostionX: number;
    mapPositionY: number;
    visited: boolean;
    containsCreature: boolean;
    introText: string;
    loot: ICollectable [];
}
// Map position may not be necessary?
