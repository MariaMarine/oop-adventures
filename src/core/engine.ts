import { Iparser } from './UI/interfaces/parser';
import { Modes } from './modes/enums/modes';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { Place } from '../models/non-living/classes/place';
import { IPlace } from '../models/non-living/interfaces/place';

@injectable()
export class MainEngine {
    private readonly parser: Iparser;
    private _currentMode: Modes;
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private readonly map: Object;
    private readonly sessionDataService: IsessionDataService;
    private currentPlace: IPlace;

    public constructor(
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('session-data') sessionDataService: IsessionDataService) {
        this.promptLoop = promptloop;
        this.sessionDataService = sessionDataService;
    }

    public set currentMode(mode: Modes) {
        this._currentMode = mode;
    }

    public get currentY(): number {
        return this._currentY;
    }
    public set currentY(y: number) {
        this._currentY = y;
    }
    public get currentX(): number {
        return this._currentX;
    }
    public set currentX(x: number) {
        this._currentX = x;
    }
    public setCurrentPlace(): void {
        console.log(this.sessionDataService.read('map')[0][0]);
    }

    public start(): void {
        this.setCurrentPlace();
    }
}
