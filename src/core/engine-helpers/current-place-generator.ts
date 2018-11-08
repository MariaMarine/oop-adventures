import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { IsessionDataService } from '../../session-data-service/interfaces/sessionDataService';
import { inject } from 'inversify';
import { Directions } from '../choices/directions';
import { Place } from '../../models/non-living/classes/place';
import { MazeCell } from '../../models/non-living/classes/maze-cell';

export class PlaceGenerator {
    // tslint:disable-next-line:no-any
    private visitedPlaces: any = new Map();
    private readonly sessionDataService: IsessionDataService;

    public constructor(@inject('session-data') sessionDataService: IsessionDataService) {
        this.sessionDataService = sessionDataService;
    }

    public setCurrentPlace(currentX: number, currentY: number): IPlace {
        const placeCoordinates: string = `${currentX}-${currentY}`;
        let newPlace: IPlace;
        if (this.visitedPlaces[placeCoordinates]) {
            return this.visitedPlaces[placeCoordinates];
        } else {
            // Get the current map position
            const currentMapMatrixPosition: MazeCell
                = Object(this.sessionDataService.read('map')[currentX][currentY]);
            // Set the new possible directions
            const newDirections: Directions = new Directions(
                !currentMapMatrixPosition.top,
                !currentMapMatrixPosition.bottom,
                !currentMapMatrixPosition.right,
                !currentMapMatrixPosition.left);
            // Create the new Place
            newPlace = new Place(Randomizer.GENERATEDIFFICULTYCOEF(currentX, currentY), newDirections.getAllDirections());
            newPlace.visited = true;
            this.visitedPlaces[placeCoordinates] = newPlace;
        }

        return newPlace;
    }
}
