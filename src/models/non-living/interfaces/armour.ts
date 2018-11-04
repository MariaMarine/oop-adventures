import { ICollectable } from './collectable';

export interface IArmour extends ICollectable {
    physicalResistance: number;
    magicalResistance: number;
}
