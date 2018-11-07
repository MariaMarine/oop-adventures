import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { IsessionDataService } from '../../session-data-service/interfaces/sessionDataService';
import { inject } from 'inversify';
import { Directions } from '../choices/directions';
import { Place } from '../../models/non-living/classes/place';

export class PlaceGenerator {
    // tslint:disable-next-line:no-any
    private visitedPlaces: any = new Map();
    private readonly sessionDataService: IsessionDataService;

    public constructor(@inject('session-data') sessionDataService: IsessionDataService) {
        this.sessionDataService = sessionDataService;
    }

    public setCurrentPlace(currentPlace: IPlace, currentX: number, currentY: number): IPlace {
        const placeCoordinates: string = `${currentX}-${currentY}`;
        let newPlace: IPlace;
        if (this.visitedPlaces[placeCoordinates]) {
            return this.visitedPlaces[placeCoordinates];
        } else {
            // Get the current map position
            const currentMapMatrixPosition: {
                x: number; y: number;
                top: boolean; left: boolean;
                bottom: boolean; right: boolean;
                // tslint:disable-next-line:no-reserved-keywords
                set: number;
            }
                = Object(this.sessionDataService.read('map')[currentX][currentY]);
            // Set the new possible directions
            const newDirections: Directions = new Directions(
                currentMapMatrixPosition.top,
                currentMapMatrixPosition.bottom,
                currentMapMatrixPosition.right,
                currentMapMatrixPosition.left);
            // Create the new Place
            newPlace = new Place(Randomizer.GENERATEDIFFICULTYCOEF(currentX, currentY), newDirections.getAllDirections());
            newPlace.visited = true;
            this.visitedPlaces[placeCoordinates] = newPlace;
        }

        return newPlace;
    }
}
