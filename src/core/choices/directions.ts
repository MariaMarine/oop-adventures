import { injectable } from 'inversify';
import { IDirection } from './interface/direction';
import { Direction } from './models/direction';

@injectable()
export class Directions {

    private north: Direction;
    private south: Direction;
    private east: Direction;
    private west: Direction;

    constructor(possibleNorth: boolean, possibleSouth: boolean, possibleEast: boolean, possibleWest: boolean) {
        this.north = new Direction(['north', 'up'], possibleNorth, -1, 0);
        this.east = new Direction(['east', 'right'], possibleEast, 0, 1);
        this.west = new Direction(['west', 'left'], possibleWest, 0, -1);
        this.south = new Direction(['south', 'down'], possibleSouth,  1, 0);
    }
    public getAllDirections(): IDirection[] {
        return [this.north, this.south, this.east, this.west];
    }

}
