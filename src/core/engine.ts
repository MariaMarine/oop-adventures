import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { Iengine } from './interfaces/engine';
import { IChoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { Constants } from './constants/constants';
import { Direction } from './choices/models/direction';
import { IActions } from './choices/interface/actions';
import { Iwriter } from './UI/interfaces/writer';
import { ItemService } from './engine-helpers/item-service';
import { Battle } from './modes/battle';
import { IRepository } from '../models/non-living/interfaces/repository';

@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private currentChoices: IChoice[] = [];
    private placeGenerator: PlaceGenerator;
    private actions: IActions;
    private itemService: ItemService;
    private writer: Iwriter;
    private battle: Battle;
    private repository: IRepository;
    public constructor(
        @inject('repository') repository: IRepository,
        @inject('current-place-generator') placeGenerator: PlaceGenerator,
        @inject('ui-writer') writer: Iwriter,
        @inject('actions') actions: IActions,
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('battle') battle: Battle,
        @inject ('item-service') itemService: ItemService
    ) {
        this.repository = repository;
        this.writer = writer;
        this.actions = actions;
        this.battle = battle;
        this.promptLoop = promptloop;
        this.placeGenerator = placeGenerator;
        this.itemService = itemService;
    }

    public start(): void {

        this.placeGenerator.setNewPlace();
        while (this.repository.currentX !== Constants.gameRows - 1 || this.repository.currentY !== Constants.gameCols - 1) {
            this.setCurrentChoices();
            // Console.log(this.repository.currentPlace.creature);
            const nextChoice: IChoice = this.promptLoop.multiple(
                ['What would you like to do?', 'Well...', 'For all possible choices type "options"', 'Please try again'],
                this.currentChoices);
            if (nextChoice.names[0] === 'search') {
                this.itemService.lootPlace();
            }
            if (nextChoice.names[0] === 'items') {
                this.writer.write(`You have the following items:\n${this.repository.hero.inventory.listItems()}`, '\x1b[34m');
            }
            if (nextChoice.names[0] === 'attack') {
                this.writer.write(`You decided to attack!!`, '\x1b[34m');
                this.battle.start();
                this.repository.currentPlace.containsCreature = false;
            }
            if (nextChoice.names[0] === 'trade') {
                this.itemService.setTradeItem();
            }
            if (nextChoice.names[0] === 'equip') {
                this.itemService.equipItem();
            }
            if (nextChoice instanceof Direction) {
                this.repository.currentX += nextChoice.xDirection;
                this.repository.currentY += nextChoice.yDirection;
                this.placeGenerator.setNewPlace();
            }
        }
        this.writer.write(`CONGRATULATIONS!!! You've found your way out of the OOP labyrinth\n
        You win a beautiful Telerik t-shirt :)`);
    }

    private setCurrentChoices(): void {
        this.currentChoices = [];
        const creatureExists: boolean = this.repository.currentPlace.containsCreature;

        this.actions.loot.isPossible = !creatureExists;
        this.actions.exit.isPossible = true;
        this.actions.currentInventory.isPossible = true;
        this.actions.trade.isPossible = this.repository.currentPlace.containsCreature
        && this.repository.currentPlace.creature.nonHeroType === 'Trader';
        this.actions.attack.isPossible = this.repository.currentPlace.containsCreature
        && this.repository.currentPlace.creature.nonHeroType !== 'Trader';
        this.actions.equip.isPossible = true;
        this.currentChoices.push(...this.repository.currentPlace.directions, ...Object.values(this.actions));
    }
}
