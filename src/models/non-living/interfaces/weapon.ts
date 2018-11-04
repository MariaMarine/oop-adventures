import { ICollectable } from './collectable';
export interface IWeapon extends ICollectable {
    physicalDamage: number;
    magicalDamage: number;
}
