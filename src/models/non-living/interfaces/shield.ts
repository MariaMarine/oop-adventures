import { ICollectable } from './collectable';

export interface Ishield extends ICollectable {
    physicalResistance: number;
    magicalResistance: number;
}
