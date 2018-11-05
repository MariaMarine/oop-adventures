import { Iparser } from './UI/interfaces/parser';
import { Modes } from './modes/enums/modes';
import { inject } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IMap } from '../models/non-living/interfaces/map';

export class MainEngine {
    private readonly parser: Iparser;
    private _currentMode: Modes;
    private readonly promptLoop: PromptLoop;
    private readonly currentX: number = 0;
    private readonly currentY: number = 0;
    private readonly map: Object;

    public constructor(
        @inject('prompt-loop') promptloop: PromptLoop) {
        this.promptLoop = promptloop;
    }

    public set currentMode(mode: Modes) {
        this._currentMode = mode;
    }
    public static START(): void {

    }
}
