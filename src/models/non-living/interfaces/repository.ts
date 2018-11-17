import { Ihero } from '../../living/interfaces/hero';
import { MazeCell } from '../classes/maze-cell';
import { IPlace } from './place';

export interface IRepository {
    hero: Ihero;
    map: MazeCell[][];
    currentX: number;
    currentY: number;
    currentPlace: IPlace;
    userName: string;
}
