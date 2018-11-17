import { IChoice } from '../interface/choice';

export class Direction implements IChoice {
    private _xDirection: number;
    private _yDirection: number;
    private _names: string[];
    private _commandNotPossibleStrings: string[];
    private _isPossible: boolean;

    constructor(names: string[], isPossible: boolean, xDirection: number, yDirection: number) {
        this._names = names;
        this._isPossible = isPossible;
        this._xDirection = xDirection;
        this._yDirection = yDirection;
        this._commandNotPossibleStrings = ['Path is blocked', 'There is a giant rock on the way', 'No path', 'Ooops', 'Can`t do that'];
    }

    public get xDirection(): number {
        return this._xDirection;
    }
    public get yDirection(): number {
        return this._yDirection;
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

}
