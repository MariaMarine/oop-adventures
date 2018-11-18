import { IChoice } from '../interface/choice';
import { inject, injectable } from 'inversify';
import { IRepository } from '../../../models/non-living/interfaces/repository';
import { PlaceGenerator } from '../../engine-helpers/current-place-generator';
import { Iwriter } from '../../UI/interfaces/writer';
import { PromptLoop } from '../../UI/promptLoop';
import { Battle } from '../../modes/battle';
import { ItemService } from '../../engine-helpers/item-service';

@injectable()
export abstract class Choice implements IChoice {
    protected _names: string[];
    protected _commandNotPossibleStrings: string[];
    protected _isPossible: boolean = false;
    @inject('repository')
    protected repository: IRepository;
    @inject('current-place-generator')
    protected placeGenerator: PlaceGenerator;
    @inject('ui-writer')
    protected writer: Iwriter;
    @inject('prompt-loop')
    protected promptloop: PromptLoop;
    @inject('item-service')
    protected itemService: ItemService;

    constructor(names: string[], commandNotPossibleStrings: string[]) {
        this._names = names;
        this._commandNotPossibleStrings = commandNotPossibleStrings;
    }

    public get names(): string[] {
        return this._names;
    }
    public get commandNotPossibleStrings(): string[] {
        return this._commandNotPossibleStrings;
    }
    public get isPossible(): boolean {
        return this._isPossible;
    }
    public set isPossible(isPossible: boolean) {
        this._isPossible = isPossible;
    }
    public abstract run(): void;
}
