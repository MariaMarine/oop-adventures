import { ICollectable } from './collectable';

export interface IArmour extends ICollectable {
    minProtection: number;
    maxProtection: number;
}
