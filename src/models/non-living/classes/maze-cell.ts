import { IMazeCell } from '../interfaces/maze-cell';

export class MazeCell implements IMazeCell {
    public x: number; // Column number!
    public y: number; // Row number!
    public top: boolean;
    public left: boolean;
    public bottom: boolean;
    public right: boolean;
// tslint:disable-next-line:no-reserved-keywords
    public set: number;
}
