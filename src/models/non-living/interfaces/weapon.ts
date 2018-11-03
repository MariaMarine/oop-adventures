import { ICollectable } from './collectable';
export interface IWeapon extends ICollectable {
    minDamage: number;
    maxDamage: number;
}
