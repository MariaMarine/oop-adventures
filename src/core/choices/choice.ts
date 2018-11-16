import { IChoice } from './interface/choice';

export class Choice implements IChoice {
    private readonly _names: string[];
    private readonly _commandNotPossibleStrings: string[];
    private _isPossible: boolean = false;

    public constructor(names: string[], commandNotPossibleStrings: string[]) {
        this._names = names;
        this._commandNotPossibleStrings = commandNotPossibleStrings;

    }

    public get names(): string[] {
        return this._names.slice();
    }
    public get commandNotPossibleStrings(): string[] {
        return this._commandNotPossibleStrings.slice();
    }
    public get isPossible(): boolean {
        return this._isPossible;
    }
    public set isPossible(isPossible: boolean) {
        this._isPossible = isPossible;
    }
}
