import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './UI/interfaces/engine';
import { Ichoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';

@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private readonly sessionDataService: IsessionDataService;
    private currentPlace: IPlace;
    private currentChoices: Ichoice[] = [];
    private placeGenerator: PlaceGenerator;

    public constructor(
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('session-data') sessionDataService: IsessionDataService) {
        this.promptLoop = promptloop;
        this.sessionDataService = sessionDataService;
        this.placeGenerator = new PlaceGenerator(sessionDataService);
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

    public start(): void {
        this.setNewPlace();
        this.setCurrentChoices();
        console.log(this.currentPlace);
        const nextCommand: Ichoice = this.promptLoop.multiple(
            [`Choose direction`, 'Please choose a valid direction'], this.currentChoices);
        console.log(nextCommand);
    }

    private setNewPlace(): void {
        this.currentPlace = this.placeGenerator.setCurrentPlace(this.currentPlace, this.currentX, this._currentY);
    }
    private setCurrentChoices(): void {
        this.currentChoices = [];
        this.currentChoices.push(...this.currentPlace.directions);
    }
}
