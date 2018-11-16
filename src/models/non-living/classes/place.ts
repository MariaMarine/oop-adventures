import { PlaceDescription } from './../enums/placeDescriptions';
import { Randomizer } from '../../../factory/randomizer';
import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';
import { IDirection } from '../../../core/choices/interface/direction';
import { NonHero } from '../../living/classes/non-hero';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _creature: NonHero;
    private _introText: string;
    private _loot: IInventory;
    private _nextVisitText: string = '';
    private _directions: IDirection[];
    public constructor(difficultyCoef: number, directions?: IDirection[],
                       containsCreature?: boolean, introText?: string, loot?: IInventory) {
        this._visited = false;
        this._directions = directions || [];
        this._containsCreature = containsCreature || Randomizer.GENERATERANDOMBOOLEAN();
        const newPlaceDescription: string = Randomizer.GETRANDOMENUMOPTION(PlaceDescription);
        this._introText = introText || `You enter ${newPlaceDescription}.`;
        this._nextVisitText = introText || `You are back to ${newPlaceDescription}.`;
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
    public set containsCreature(bool: boolean) {
        this._containsCreature = bool;
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

    public get directions(): IDirection[] {
        return this._directions;
    }
    public get nextVisitText(): string {
        return this._nextVisitText;
    }
    public get creature(): NonHero {
        return this._creature;
    }
    public set creature(creature: NonHero) {
        this._creature = creature;
    }
}
