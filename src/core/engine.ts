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
    private visitedPlaces: any = new Map();
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
        const placeCoordinates: string = `${this.currentX}-${this.currentY}`;
        if (this.visitedPlaces[placeCoordinates]) {
            this.currentPlace = this.visitedPlaces[placeCoordinates];
        } else {
            this.currentPlace = new Place();
            this.currentPlace.visited = true;
            this.visitedPlaces[placeCoordinates] = this.currentPlace;
        }
    }

    public start(): void {
        this.setCurrentPlace();
        console.log(this.currentPlace);
        this.currentPlace.loot.addCoins(1222);
        this.currentX = 1;
        this.currentY = 1;
        this.setCurrentPlace();
        console.log(`new current place\n`, this.currentPlace);
        this.currentX = 0;
        this.currentY = 0;
        this.setCurrentPlace();
        console.log(`new current place\n`, this.currentPlace);
    }
}
