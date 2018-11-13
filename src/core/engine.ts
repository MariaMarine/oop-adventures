import { IFactory } from './../factory/hero-factory-interface';
import { IAlive } from './../models/living/interfaces/alive';
import { IWeapon } from './../models/non-living/interfaces/weapon';
import { IArmour } from './../models/non-living/interfaces/armour';
import { Inventory } from './../models/non-living/classes/inventory';
import { Actions } from './choices/actions';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './UI/interfaces/engine';
import { IChoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { IPotion } from '../models/non-living/interfaces/potion';
import { Constants } from './constants/constants';
@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private readonly sessionDataService: IsessionDataService;
    private currentPlace: IPlace;
    private currentChoices: IChoice[] = [];
    private placeGenerator: PlaceGenerator;

    // For test purposes

    private factory: IFactory;
    private player: IAlive;
    private myInventory: IInventory = new Inventory(0);

    public constructor(
        @inject('factory') factory: IFactory,
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('session-data') sessionDataService: IsessionDataService) {
        this.factory = factory;
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
         while (this._currentX !== Constants.gameRows - 1 || this.currentY !== Constants.gameCols - 1) {
            this.setNewPlace();
            this.setCurrentActions();
            console.log('HERO:', this.factory.createHero('Gandalf'));
            const actionCommand: IChoice = this.promptLoop.multiple(
                ['What would you like to do?', 'Well...', 'For all possible choices type "options"', 'Please try again'],
                this.currentChoices);
            // To implement: adding all items to hero's inventory
            if (actionCommand.names[0] === 'search') {
                this.lootPlace();
            }
            if (actionCommand.names[0] === 'items') {
                console.log(`You have the following items:\n${this.myInventory.listItems()}`);
            }
            if (actionCommand.names[0] === 'exit') {
                console.log(`You find your way out.`);
                this.setCurrentChoices();
                const nextCommand: IChoice = this.promptLoop.multiple(
                    [`Where to next?`, 'Can`t do that',
                    'For all possible choices type "options"', 'Well...', 'Invalid entry', 'Please try again'],
                    this.currentChoices);
                this._currentX += nextCommand.xDirection;
                this._currentY += nextCommand.yDirection;
            }
        }
         console.log(`You win :)`);
    }

    private setNewPlace(): void {
        this.currentPlace = this.placeGenerator.setCurrentPlace(this.currentX, this._currentY);
    }
    private setCurrentChoices(): void {
        this.currentChoices = [];
        this.currentChoices.push(...this.currentPlace.directions);
    }
    private setCurrentActions(): void {
        const currentActions: Actions = new Actions (!(this.currentPlace.containsCreature ||
            this.currentPlace.loot.listItems() === `No items`), true, true);
        this.currentChoices = [];
        this.currentChoices.push(...currentActions.getAllActions());
    }
    private lootPlace (): void {
        console.log(`You found:\n${this.currentPlace.loot.listItems()}.\nYou put them in your bag.`);
        this.currentPlace.loot.armour.forEach((armour: IArmour) => this.myInventory.addArmour(armour));
        this.currentPlace.loot.weapons.forEach((weapon: IWeapon) => this.myInventory.addWeapon(weapon));
        this.currentPlace.loot.potions.forEach((potion: IPotion) => this.myInventory.addPotion(potion));
        this.myInventory.addCoins(this.currentPlace.loot.coins);
        this.currentPlace.loot.removeAll();
        this.setCurrentActions();
    }
}
