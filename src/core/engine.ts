import { Iparser } from './UI/interfaces/parser';
import { Modes } from './modes/enums/modes';
import { inject } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IMap } from '../models/non-living/interfaces/map';

export class MainEngine {
    private readonly parser: Iparser;
    private _currentMode: Modes;
    private readonly promptLoop: PromptLoop;
    private readonly currentX: number;
    private readonly currentY: number;
    // tslint:disable-next-line:no-any
    private readonly map: IMap<any>;
    public constructor(
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('ui-parser') parser: Iparser) {
        this.currentMode = Modes.explore;
        this.promptLoop = promptloop;
        this.parser = parser;
    }

    public set currentMode(mode: Modes) {
        this._currentMode = mode;
    }
    public start(): void {

    }
}
