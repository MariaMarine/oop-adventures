import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { Directions } from '../choices/all-directions';
import { Place } from '../../models/non-living/classes/place';
import { MazeCell } from '../../models/non-living/classes/maze-cell';

export class PlaceGenerator {
    public setCurrentPlace(mazeCell: MazeCell, currentX: number, currentY: number): IPlace {
        const newDirections: Directions = new Directions(!mazeCell.top, !mazeCell.bottom, !mazeCell.right, !mazeCell.left);
            // Create the new Place
        const newPlace: IPlace = new Place(Randomizer.GENERATEDIFFICULTYCOEF(currentX, currentY), newDirections.getAllDirections());
        const creatureText: string = newPlace.containsCreature ? 'someone' : 'no one';
        console.log(`${newPlace.introText} You have the feeling that there is ${creatureText} here.`);
        newPlace.visited = true;

        return newPlace;
    }
}
