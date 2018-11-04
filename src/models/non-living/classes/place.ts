import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _introText: string;
    //private _loot: IInventory;

    public constructor (containsCreature?: boolean, introText?: string) {
            this._visited = false;
            if (containsCreature){
                this._containsCreature = containsCreature;
            } else {
                this._containsCreature = Math.random() < 0.5;
            } 
            if (introText){
                this._introText = introText;
            } else {
                this._introText = 'Placeholder text';
            }
            //this._loot = loot;
    }

    public get visited (): boolean {
        return this._visited;
    }
    public get containsCreature (): boolean {
        return this._containsCreature;
    }
    public get introText (): string {
        return this._introText;
    }
/*
    public get loot (): IInventory {
        return this._loot;
    }
    */
}
