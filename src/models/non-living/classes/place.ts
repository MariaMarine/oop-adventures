import { PlaceDescription } from './../enums/placeDescriptions';
import { Randomizer } from '../../../factory/randomizer';
import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';
import { IAlive } from '../../living/interfaces/alive';
import { Idirection } from '../../../core/choices/interface/direction';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _creature: IAlive;
    private _introText: string;
    private _loot: IInventory;
    private _nextVisitText: string = '';
    private _directions: Idirection[];
    public constructor(difficultyCoef: number, directions?: Idirection[],
                       containsCreature?: boolean, introText?: string, loot?: IInventory) {
        this._visited = false;
        this._directions = directions || [];
        this._containsCreature = containsCreature || Randomizer.GENERATERANDOMBOOLEAN();
        const newPlaceDescription: string = Randomizer.GETRANDOMENUMOPTION(PlaceDescription);
        this._introText = introText || `You enter ${newPlaceDescription}. What would you like to do next?`;
        this._nextVisitText = introText || `You are back to the ${newPlaceDescription}. What do you do next?`;
        this._loot = loot || Randomizer.GENERATERANDOMLOOT(difficultyCoef);

    }

    public get visited(): boolean {
        return this._visited;
    }
    public set visited(visited: boolean) {
        this._visited = visited;
    }
    public get containsCreature(): boolean {
        return this._containsCreature;
    }
    public get introText(): string {
        if (this.visited) {
            return this._nextVisitText;
        }

        return this._introText;
    }

    public get loot(): IInventory {
        return this._loot;
    }

    public get directions(): Idirection[] {
        return this._directions;
    }
}
