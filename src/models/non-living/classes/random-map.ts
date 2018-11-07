import { Randomizer } from './../../../factory/randomizer';
import { Place } from './place';
import { IPlace } from '../interfaces/place';
import { IMap } from '../interfaces/map';

class RandomizedPlaceMap <T> {
    private _rows: number;
    private _cols: number;
    private _map: T[][];

    public constructor (rows: number, cols: number) {
        this._rows = rows;
        this._cols = cols;
        this._map = [];
        for (let y: number = 0; y < rows; y += 1) {
            const row: T[] = Array.from({length: cols});
            this._map.push(row);
          }
    }
    public get rows (): number {
        return this._rows;
    }
    public get cols (): number {
        return this._cols;
    }
    public get map (): T[][] {
        return this._map;
    }
    public addCell (cell: T, x: number, y: number): void {
        if (!cell || x < 0 || x >= this._rows || y < 0 || y >= this._cols) {
            throw new Error (`Invalid cell or position!`);
        }
        this._map[x][y] = cell;
    }
}

/* Test
const gamerows: number = 5;
const gamecols: number = 5;
const gameMap: RandomizedPlaceMap <IPlace> = new RandomizedPlaceMap(gamerows, gamecols);
for (let i: number = 0; i < gamerows; i += 1) {
    for (let j: number = 0; j < gamecols; j += 1) {
        gameMap.addCell(new Place(Randomizer.GENERATEDIFFICULTYCOEF(i, j)), i, j);
        console.log(i, j, gameMap.map[i][j].loot.potions);
    }
}
*/
