import { IAlive } from './alive';
import { MagicType } from '../enums/magicType';

export interface IMagical extends IAlive {
    magicAttach: MagicType;
}
