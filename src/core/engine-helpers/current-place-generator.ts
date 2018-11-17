import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { Directions } from '../choices/directions';
import { Place } from '../../models/non-living/classes/place';
import { MazeCell } from '../../models/non-living/classes/maze-cell';
import { inject, injectable } from 'inversify';
import { Ifactory } from '../../factory/interface/Ifactory';
import { IRepository } from '../../models/non-living/interfaces/repository';
import { Iwriter } from '../UI/interfaces/writer';

@injectable()
export class PlaceGenerator {

    private readonly factory: Ifactory;
    private readonly repository: IRepository;
    private writer: Iwriter;
    constructor(@inject('ui-writer') writer: Iwriter,
                @inject('repository') repository: IRepository,
                @inject('factory') factory: Ifactory) {
        this.factory = factory;
        this.repository = repository;
        this.writer = writer;
    }

    public setNewPlace(): void {
        if (this.repository.map[this.repository.currentX][this.repository.currentY] &&
            this.repository.map[this.repository.currentX][this.repository.currentY].place) {
            this.repository.currentPlace = this.repository.map[this.repository.currentX][this.repository.currentY].place;
            this.writer.write(this.repository.currentPlace.nextVisitText);
        } else {
            this.generateNewPlace();
        }

    }

    private generateNewPlace(): void {
        const x: number = this.repository.currentX;
        const y: number = this.repository.currentY;
        const mazeCell: MazeCell = this.repository.map[x][y];
        const newDirections: Directions = new Directions(!mazeCell.top, !mazeCell.bottom, !mazeCell.right, !mazeCell.left);
        const diffCoef: number = Randomizer.GENERATEDIFFICULTYCOEF(x, y);
        // Create the new Place
        const newPlace: IPlace = new Place(diffCoef, newDirections.getAllDirections());
        this.repository.currentPlace = newPlace;
        this.writer.write(newPlace.introText);
        newPlace.visited = true;
        if (newPlace.containsCreature) {
            newPlace.creature = this.factory.createNonHero(diffCoef);
            const creatureText: string = newPlace.creature.say();
            this.writer.write(`You hear: ${(creatureText)}`);
        }

    }

}
