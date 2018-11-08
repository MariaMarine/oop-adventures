import { MazeDashPrinter } from './UI/maze-printer';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './UI/interfaces/engine';
import { Ichoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { Directions } from './choices/directions';
import { Constants } from './namespaces/constants';

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
        //only needed if working with external map JSON
        //const mazeprinter: MazeDashPrinter = new MazeDashPrinter();
        //mazeprinter.visualize(Object(this.sessionDataService.read('map')), 5, 5);
        this.setNewPlace();
        while (this._currentX !== Constants.gameRows - 1 || this.currentY !== Constants.gameCols - 1) {
            this.setCurrentChoices();
            //console.log(this.currentPlace.loot);
            const nextCommand: Ichoice = this.promptLoop.multiple(
                [`What next?`, 'Can`t do that', 'For all possible choices type "options"', 'Well...', 'Invalid entry', 'Please try again'],
                this.currentChoices);
            this._currentX += nextCommand.xDirection;
            this._currentY += nextCommand.yDirection;
            this.setNewPlace();
        }
        console.log(`You win :)`);
    }

    private setNewPlace(): void {
        this.currentPlace = this.placeGenerator.setCurrentPlace(this.currentX, this._currentY);
    }
    private setCurrentChoices(): void {

        // More code!!!!!!!!!!!!!!!!!!!
        this.currentChoices = [];
        this.currentChoices.push(...this.currentPlace.directions);
    }
}
