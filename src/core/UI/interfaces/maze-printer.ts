import { MazeCell } from './../../../models/non-living/classes/maze-cell';
import { Iwriter } from './writer';

export interface IMazePrinter extends Iwriter {

    visualize (maze: MazeCell[][], gameCols: number, gameRows: number) : void;
}
