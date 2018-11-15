import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { Directions } from '../choices/all-directions';
import { Place } from '../../models/non-living/classes/place';
import { MazeCell } from '../../models/non-living/classes/maze-cell';
import { inject } from 'inversify';
import { Ifactory } from '../../factory/interface/Ifactory';

export class PlaceGenerator {

    private readonly factory: Ifactory;

    constructor(@inject('factory') factory: Ifactory) {
        this.factory = factory;
    }
    public setCurrentPlace(mazeCell: MazeCell, currentX: number, currentY: number): IPlace {
        const newDirections: Directions = new Directions(!mazeCell.top, !mazeCell.bottom, !mazeCell.right, !mazeCell.left);
        const diffCoef: number = Randomizer.GENERATEDIFFICULTYCOEF(currentX, currentY);
        // Create the new Place
        const newPlace: IPlace = new Place(diffCoef, newDirections.getAllDirections());
        const creatureText: string = newPlace.containsCreature ? 'someone' : 'no one';
        console.log(`${newPlace.introText} You have the feeling that there is ${creatureText} here.`);
        newPlace.visited = true;
        newPlace.containsCreature = Randomizer.GENERATERANDOMBOOLEAN();
        if (newPlace.containsCreature) {
            newPlace.creature = this.factory.createNonHero(diffCoef);
        }

        return newPlace;
    }
}
