import { Randomizer } from './../../factory/randomizer';
import { IPlace } from '../../models/non-living/interfaces/place';
import { Directions } from '../choices/directions';
import { Place } from '../../models/non-living/classes/place';
import { MazeCell } from '../../models/non-living/classes/maze-cell';
import { inject, injectable } from 'inversify';
import { Ifactory } from '../../factory/interface/Ifactory';
import { IRepository } from '../../models/non-living/interfaces/repository';
import { Iwriter } from '../UI/interfaces/writer';
import { NonHero } from '../../models/living/classes/non-hero';

@injectable()
export class PlaceGenerator {

    private readonly factory: Ifactory;
    private readonly repository: IRepository;
    private readonly writer: Iwriter;
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
            this.writer.write(this.repository.currentPlace.nextVisitText, '\x1b[32m');
            if (this.repository.currentPlace.containsCreature) {
                this.writer.write(`${this.repository.currentPlace.creature.name} says ${this.repository.currentPlace.creature.say()}`,
                                  '\x1b[32m');
            }

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
        const newPlace: IPlace = Randomizer.GENERATERANDOMPLACE (diffCoef, newDirections.getAllDirections());
        this.repository.currentPlace = newPlace;
        this.repository.map[x][y].place = newPlace;

        this.writer.write(newPlace.introText, '\x1b[31m');
        newPlace.visited = true;
        if (newPlace.containsCreature) {
            newPlace.creature = this.factory.createNonHero(diffCoef);
            const creature: NonHero = newPlace.creature;
            const creatureText: string = newPlace.creature.say();

            const promptString: string = Randomizer.GETRANDOMARRAYELEMENT(
                [`You hear a sudden ${creatureText}! You turn around and you see a ${creature.name}`,
                `You are very shocked to see a ${creature.name}. It says ${(creatureText)}`,
                `And a ${creature.name} appears out of nowhere. The ${creature.name} says ${creatureText}`,
                `LOL! You have never seen such a funky ${creature.name} before, it says ${creatureText}`,
                `Well... Just a ${creature.name}`,
                `How is this even possible? A ${creature.name} appears from the dirt and roars ${creatureText}`
                ]);
            this.writer.write(promptString, '\x1b[32m');
            if (creature.nonHeroType === 'Trader') {
                this.writer.write(Randomizer.GETRANDOMARRAYELEMENT(
                    [`You think that there is a high chance the ${creature.name} will screw you`,
                    `The ${creature.name} looks a bit spooky`,
                    `You have the chance to trade with the ${creature.name}`]),
                                  `\x1b[32m`);
            } else {
                // tslint:disable-next-line:max-line-length
                this.writer.write(`You reckon the ${creature.name} has ${creature.life} life and ${creature.strength} strength`, '\x1b[32m');
            }
        }
    }
}
