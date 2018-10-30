import { PotionType } from './../enums/potionTypes';
import { ICollectable } from './collectable';

export interface IPotion extends ICollectable {
    power: number;
    subtype: PotionType;
}
