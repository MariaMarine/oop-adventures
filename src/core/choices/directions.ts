import { injectable } from 'inversify';
import { IDirection } from './interface/direction';

@injectable()
export class Directions {

    private north: IDirection;
    private south: IDirection;
    private east: IDirection;
    private west: IDirection;

    constructor(possibleNorth: boolean, possibleSouth: boolean, possibleEast: boolean, possibleWest: boolean) {
        const notPossibleStrings: string[] = ['Path is blocked', 'There is a giant rock on the way', 'No path', 'Ooops', 'Can`t do that'];
        this.north = {
            names: ['north', 'up'],
            isPossible: possibleNorth,
            xDirection: -1,
            yDirection: 0,
            commandNotPossibleStrings: notPossibleStrings
        };
        this.east = {
            names: ['east', 'right'],
            isPossible: possibleEast,
            xDirection: 0,
            yDirection: 1,
            commandNotPossibleStrings: notPossibleStrings
        };
        this.west = {
            names: ['west', 'left'],
            commandNotPossibleStrings: notPossibleStrings,
            isPossible: possibleWest,
            xDirection: 0,
            yDirection: -1
        };
        this.south = {
            names: ['south', 'down'],
            commandNotPossibleStrings: notPossibleStrings,
            isPossible: possibleSouth,
            xDirection: 1,
            yDirection: 0
        };
    }
    public getAllDirections(): IDirection[] {
        return [this.north, this.south, this.east, this.west];
    }

}
