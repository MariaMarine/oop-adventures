import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { Place } from '../models/non-living/classes/place';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './UI/interfaces/engine';
import { Icommand } from './commands/interface/command';
import { Directions } from './commands/directions';

@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private readonly sessionDataService: IsessionDataService;
    private currentPlace: IPlace;
    private visitedPlaces: any = new Map();
    public constructor(
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('session-data') sessionDataService: IsessionDataService) {
        this.promptLoop = promptloop;
        this.sessionDataService = sessionDataService;
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
            // Get the current map position
            const currentMapMatrixPosition: {
                x: number; y: number;
                top: boolean; left: boolean;
                bottom: boolean; right: boolean;
                // tslint:disable-next-line:no-reserved-keywords
                set: number;
            }
                = Object(this.sessionDataService.read('map')[this.currentX][this.currentY]);
            // Set the new possible directions
            const newDirections: Directions = new Directions(
                currentMapMatrixPosition.top,
                currentMapMatrixPosition.bottom,
                currentMapMatrixPosition.right,
                currentMapMatrixPosition.left);
            // Create the new Place
            this.currentPlace = new Place(newDirections.getAllDirections());
            this.currentPlace.visited = true;
            this.visitedPlaces[placeCoordinates] = this.currentPlace;
        }
    }

    public start(): void {
        this.setCurrentPlace();
        console.log(this.currentPlace);
        const nextCommand: Icommand = this.promptLoop.multiple(
            [`Choose direction`, 'Please choose a valid direction'], this.currentPlace.directions);
        this.setCurrentPlace();
        console.log(nextCommand);
    }
}
