import { Potion } from '../models/non-living/classes/potion';
import { Weapon } from '../models/non-living/classes/weapon';
import { Armour } from '../models/non-living/classes/armour';
import { Randomizer } from '../factory/randomizer';

import { IWeapon } from './../models/non-living/interfaces/weapon';
import { IArmour } from './../models/non-living/interfaces/armour';
import { Inventory } from './../models/non-living/classes/inventory';
import { Actions } from './choices/actions';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { IPlace } from '../models/non-living/interfaces/place';
import { Iengine } from './interfaces/engine';
import { IChoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { IPotion } from '../models/non-living/interfaces/potion';
import { Constants } from './constants/constants';
import { Direction } from './choices/direction';
import { Ihero } from '../models/living/interfaces/hero';
import { MazeCell } from '../models/non-living/classes/maze-cell';
import { Ifactory } from '../factory/interface/Ifactory';

@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private currentPlace: IPlace;
    private currentChoices: IChoice[] = [];
    private placeGenerator: PlaceGenerator;
    private actions: { loot: IChoice; exit: IChoice; inventory: IChoice; trade: IChoice };
    // For test purposes
    private map: MazeCell[][];
    private factory: Ifactory;
    private myInventory: IInventory = new Inventory(0);
    private hero: Ihero;
    private userName: string;
    public constructor(
        @inject('factory') factory: Ifactory,
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('actions') actions: Actions) {
        this.actions = actions.getAllActions();
        this.factory = factory;
        this.promptLoop = promptloop;
        this.placeGenerator = new PlaceGenerator(factory);

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
            console.log(this.currentPlace.creature);
            const nextChoice: IChoice = this.promptLoop.multiple(
                ['What would you like to do?', 'Well...', 'For all possible choices type "options"', 'Please try again'],
                this.currentChoices);
            // To implement: adding all items to hero's inventory
            if (nextChoice.names[0] === 'search') {
                this.lootPlace();
            }
            if (nextChoice.names[0] === 'items') {
                console.log(`You have the following items:\n${this.myInventory.listItems()}`);
            }
            if (nextChoice.names[0] === 'trade') {
                this.trade();
            }
            if (nextChoice instanceof Direction) {
                this._currentX += nextChoice.xDirection;
                this._currentY += nextChoice.yDirection;
                this.setNewPlace();
            }
        }
        console.log(`You win :)`);
    }

    private setNewPlace(): void {
        if (this.map[this.currentX][this.currentY] && this.map[this.currentX][this.currentY].place) {
            this.currentPlace = this.map[this.currentX][this.currentY].place;
            console.log(this.currentPlace.nextVisitText);
        } else {
            this.currentPlace = this.placeGenerator.setCurrentPlace(this.map[this.currentX][this.currentY], this.currentX, this.currentY);
            this.map[this.currentX][this.currentY].place = this.currentPlace;
        }

    }
    private setCurrentChoices(): void {
        this.currentChoices = [];
        this.actions.loot.isPossible = !this.currentPlace.containsCreature;
        this.actions.exit.isPossible = true;
        this.actions.inventory.isPossible = !this.currentPlace.containsCreature;
        // Add public creature type to non-hero?
        this.actions.trade.isPossible = this.currentPlace.containsCreature;

        this.currentChoices.push(...this.currentPlace.directions, this.actions.inventory,
                                 this.actions.loot, this.actions.exit, this.actions.trade);

    }

    private lootPlace(): void {
        console.log(`You found:\n${this.currentPlace.loot.listItems()} \nYou put them in your bag.`);
        this.currentPlace.loot.armour.forEach((armour: IArmour) => this.myInventory.addArmour(armour));
        this.currentPlace.loot.weapons.forEach((weapon: IWeapon) => this.myInventory.addWeapon(weapon));
        this.currentPlace.loot.potions.forEach((potion: IPotion) => this.myInventory.addPotion(potion));
        this.myInventory.addCoins(this.currentPlace.loot.coins);
        this.currentPlace.loot.removeAll();
    }
    private trade(): void {
        // Reaplce with hero inventory
        console.log(`You have the following items:\n${this.myInventory.listItems()}`);
        // TEST INVENTORY To be reaplced with trader inventory??
        const currentDifficultyCoef: number = Randomizer.GENERATEDIFFICULTYCOEF(this.currentX, this.currentY);
        const traderInventory: IInventory = new Inventory(currentDifficultyCoef);
        traderInventory.addArmour(new Armour(currentDifficultyCoef));
        traderInventory.addArmour(new Armour(currentDifficultyCoef));
        traderInventory.addArmour(new Armour(currentDifficultyCoef));
        traderInventory.addWeapon(new Weapon(currentDifficultyCoef));
        traderInventory.addWeapon(new Weapon(currentDifficultyCoef));
        traderInventory.addWeapon(new Weapon(currentDifficultyCoef));
        traderInventory.addPotion(new Potion(currentDifficultyCoef));
        traderInventory.addPotion(new Potion(currentDifficultyCoef));
        console.log(`Trader has the following items:\n${traderInventory.listItems()}`);
        const possibleBuys: string[] = [...traderInventory.armour.map((item: IArmour, index: number) => `buy a${index}`),
        ...traderInventory.weapons.map((item: IWeapon, index: number) => `buy w${index}`),
        ...traderInventory.potions.map((item: IPotion, index: number) => `buy p${index}`)];
        const possibleSells: string[] = [...this.myInventory.armour.map((item: IArmour, index: number) => `sell a${index}`),
        ...this.myInventory.weapons.map((item: IWeapon, index: number) => `sell w${index}`),
        ...this.myInventory.potions.map((item: IPotion, index: number) => `sell p${index}`)];
        console.log(this.promptLoop.chooseTradeItem([...possibleBuys, ...possibleSells]));
    }
}
