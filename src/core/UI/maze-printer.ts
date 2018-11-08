import { injectable } from 'inversify';
import { ConsoleWriter } from './writers/console-writer';
import { MazeCell } from '../../models/non-living/classes/maze-cell';
import { IMazePrinter } from './interfaces/maze-printer';
@injectable()
export class MazeDashPrinter extends ConsoleWriter implements IMazePrinter {

    // Remove parameters when external maze no longer needed
    public visualize (maze: MazeCell[][], gameCols: number, gameRows: number) : void {
        let top: string = '';
        for (let i: number = 0; i < gameCols; i += 1) {
            top += ' _';
        }
        const mapVisualization: string[] = [top];
        for (let j: number = 0; j < gameRows; j += 1) {
            let row: string = '';
            for (let i: number = 0; i < gameCols; i += 1) {
                const cell: MazeCell = maze[j][i];
                if (cell.left) {
                        row += '|';
                } else {
                        row += ' ';
                }
                if (cell.bottom) {
                        row += '_';
                } else {
                        row += ' ';
                }
        }
            row += '|';
            mapVisualization.push(row);
    }
        mapVisualization.forEach((el: string) => this.write(el));
    }
}
