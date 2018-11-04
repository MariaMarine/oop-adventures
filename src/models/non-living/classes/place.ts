import { PlaceDescription } from './../enums/placeDescriptions';
import { Randomizer } from './../../../core/constants/randomizer';
import { IInventory } from '../interfaces/inventory';
import { IPlace } from '../interfaces/place';

export class Place implements IPlace {
    private _visited: boolean;
    private _containsCreature: boolean;
    private _introText: string;
    private _loot: IInventory;

    public constructor (containsCreature?: boolean, introText?: string, loot?: IInventory) {
            this._visited = false;
            if (containsCreature) {
                this._containsCreature = containsCreature;
            } else {
                this._containsCreature = Randomizer.GENERATERANDOMBOOLEAN();
            }
            if (introText) {
                this._introText = introText;
            } else {
                this._introText = `You enter ${Randomizer.GETRANDOMENUMOPTION(PlaceDescription)}. What would you like to do next?`;
            }
            if (loot) {
                this._loot = loot;
            } else {
                this._loot = Randomizer.GENERATERANDOMLOOT();
            }
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

    public get loot (): IInventory {
        return this._loot;
    }
}
