import { Place } from './place';
import { IPlace } from '../interfaces/place';
import { IMap } from '../interfaces/map';

class RandomizedPlaceMap implements IMap <IPlace>  {
    private _rows: number;
    private _cols: number;
    private _map: IPlace[][];

    public constructor (rows: number, cols: number) {
        this._rows = rows;
        this._cols = cols;
        this._map = [];
        for (let y: number = 0; y < rows; y += 1) {
            const row: IPlace[] = [];
            for (let x: number = 0; x < cols; x += 1) {
              row.push(new Place()); // Unchuck!
            }
            this._map.push(row);
          }
    }
    public get rows (): number {
        return this._rows;
    }
    public get cols (): number {
        return this._cols;
    }
    public get map (): IPlace[][] {
        return this._map;
    }
}

// Test
const gameMap: RandomizedPlaceMap = new RandomizedPlaceMap(2, 3);
const map: IPlace[][] = gameMap.map;
const currentPlace: IPlace = map[1][2];
console.log(currentPlace);
console.log(currentPlace.loot);
