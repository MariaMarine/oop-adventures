import { PlaceDescription } from './../enums/placeDescriptions';
import { Randomizer } from './../../../core/constants/randomizer';
import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';
import { Ialive } from '../../living/interfaces/alive';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _creature: Ialive;
    private _introText: string;
    private _loot: IInventory;
    private _nextVisitText: string = '';
    public constructor(containsCreature?: boolean, introText?: string, loot?: IInventory) {
        this._visited = false;

        this._containsCreature = containsCreature || Randomizer.GENERATERANDOMBOOLEAN();
        const newPlaceDescription: string = Randomizer.GETRANDOMENUMOPTION(PlaceDescription);
        this._introText = introText || `You enter ${newPlaceDescription}. What would you like to do next?`;
        this._nextVisitText = introText || `You are back to the ${newPlaceDescription}. What do you do next?`;
        this._loot = loot || Randomizer.GENERATERANDOMLOOT();

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
}
