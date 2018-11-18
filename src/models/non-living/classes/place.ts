import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';
import { NonHero } from '../../living/classes/non-hero';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _creature: NonHero;
    private _introText: string;
    private _loot: IInventory;
    private _nextVisitText: string = '';
    public constructor(difficultyCoef: number,
                       containsCreature: boolean, introText: string, loot: IInventory) {
        this._visited = false;
        this._containsCreature = containsCreature;
        this._introText = `You enter ${introText}.`;
        this._nextVisitText = `You are back to ${introText}.`;
        this._loot = loot;

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
