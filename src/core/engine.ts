import { Inventory } from './../models/non-living/classes/inventory';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './interfaces/engine';
import { IChoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Constants } from './constants/constants';
import { Direction } from './choices/direction';
import { Ihero } from '../models/living/interfaces/hero';
import { MazeCell } from '../models/non-living/classes/maze-cell';
import { Ifactory } from '../factory/interface/Ifactory';
import { IActions } from './choices/interface/actions';
import { Iwriter } from './UI/interfaces/writer';
import { ItemService } from './engine-helpers/item-service';

@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private currentPlace: IPlace;
    private currentChoices: IChoice[] = [];
    private placeGenerator: PlaceGenerator;
    private actions: IActions;
    // For test purposes
    private map: MazeCell[][];
    private factory: Ifactory;
    private myInventory: IInventory = new Inventory(0);
    private itemService: ItemService;
    private hero: Ihero;
    private userName: string;
    private writer: Iwriter;
    public constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('actions') actions: IActions,
        @inject('factory') factory: Ifactory,
        @inject('prompt-loop') promptloop: PromptLoop
    ) {
        this.writer = writer;
        this.actions = actions;
        this.factory = factory;
        this.promptLoop = promptloop;
        this.placeGenerator = new PlaceGenerator(factory);
        this.itemService = new ItemService(this.promptLoop, this.writer);

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

    public start(map: MazeCell[][], hero: Ihero, userName: string): void {
        this.map = map;
        this.hero = hero;
        this.userName = userName;
        this.setNewPlace();
        while (this._currentX !== Constants.gameRows - 1 || this.currentY !== Constants.gameCols - 1) {
            this.setCurrentChoices();
            // Console.log(this.currentPlace.creature);
            const nextChoice: IChoice = this.promptLoop.multiple(
                ['What would you like to do?', 'Well...', 'For all possible choices type "options"', 'Please try again'],
                this.currentChoices);
            // To implement: adding all items to hero's inventory
            if (nextChoice.names[0] === 'search') {
                this.itemService.lootPlace(this.currentPlace, this.myInventory);
            }
            if (nextChoice.names[0] === 'items') {
                this.writer.write(`You have the following items:\n${this.myInventory.listItems()}`, '\x1b[34m');
            }
            if (nextChoice.names[0] === 'trade') {
                this.itemService.setTradeItem(this.myInventory, this.currentPlace.creature.inventory);
            }
            if (nextChoice instanceof Direction) {
                this._currentX += nextChoice.xDirection;
                this._currentY += nextChoice.yDirection;
                this.setNewPlace();
            }
        }
        this.writer.write(`You win :)`);
    }

    private setNewPlace(): void {
        if (this.map[this.currentX][this.currentY] && this.map[this.currentX][this.currentY].place) {
            this.currentPlace = this.map[this.currentX][this.currentY].place;
            this.writer.write(this.currentPlace.nextVisitText);
        } else {
            this.currentPlace = this.placeGenerator.setCurrentPlace(this.map[this.currentX][this.currentY], this.currentX, this.currentY);
            this.map[this.currentX][this.currentY].place = this.currentPlace;
        }

    }
    private setCurrentChoices(): void {
        this.currentChoices = [];
        this.actions.loot.isPossible = !this.currentPlace.containsCreature;
        this.actions.exit.isPossible = true;
        this.actions.currentInventory.isPossible = true;
        this.actions.trade.isPossible = this.currentPlace.containsCreature && this.currentPlace.creature.nonHeroType === 'Trader';
        this.actions.attack.isPossible = this.currentPlace.containsCreature && this.currentPlace.creature.nonHeroType !== 'Trader';
        this.currentChoices.push(...this.currentPlace.directions, ...Object.values(this.actions));

    }

}
