import { MazeDashPrinter } from './../core/UI/maze-printer';
import { MazeCell } from '../models/non-living/classes/maze-cell';
import { IMazePrinter } from '../core/UI/interfaces/maze-printer';

export class Maze {
    private generator: any = require ('../../node_modules/generate-maze');
    private _gameRows: number;
    private _gameCols: number;
    private _maze: MazeCell [][];
    private _printer: IMazePrinter;

    public constructor (rows: number, cols: number, printer: IMazePrinter) {
        if (rows <= 0 || cols <= 0) {
            throw new Error ('Rows and columns can only be positive integeres!');
        }
        this._gameRows = rows;
        this._gameCols = cols;
        this._maze = this.generator(cols, rows);
        this._printer = printer;
    }

    public get gamerows(): number {
        return this._gameRows;
    }
    public get gamecols(): number {
        return this._gameCols;
    }
    public get maze(): MazeCell[][] {
        return this._maze;
    }
    public get printer(): IMazePrinter {
        return this._printer;
    }
}
/*
const maze: Maze = new Maze(5, 5, new MazeDashPrinter());
const map: MazeCell[][] = maze.maze;
maze.printer.visualize(map, 5, 5);
*/
