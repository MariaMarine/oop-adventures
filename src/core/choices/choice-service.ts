import { IChoiceProvider } from './interface/choice-provider';
import { inject, injectable } from 'inversify';
import { IRepository } from '../../models/non-living/interfaces/repository';
import { IChoiceService } from './interface/choice-service';

@injectable()
export class ChoiceService implements IChoiceService {
    private repository: IRepository;
    private choiceProvider: IChoiceProvider;
    public constructor(
        @inject('repository') repository: IRepository,
        @inject('choice-provider') choiceProvider: IChoiceProvider
    ) {
        this.choiceProvider = choiceProvider;
        this.repository = repository;
    }
    public setMapChoices(): void {

        const creatureExists: boolean = this.repository.currentPlace.containsCreature;
        this.choiceProvider.showItems.isPossible = true;
        this.choiceProvider.equip.isPossible = true;
        this.choiceProvider.loot.isPossible = !creatureExists;
        this.choiceProvider.trade.isPossible = creatureExists && this.repository.currentPlace.creature.nonHeroType === 'Trader';
        this.choiceProvider.attack.isPossible = creatureExists && this.repository.currentPlace.creature.nonHeroType !== 'Trader';
        this.choiceProvider.north.isPossible = !this.repository.map[this.repository.currentX][this.repository.currentY].top;
        this.choiceProvider.south.isPossible = !this.repository.map[this.repository.currentX][this.repository.currentY].bottom;
        this.choiceProvider.east.isPossible = !this.repository.map[this.repository.currentX][this.repository.currentY].right;
        this.choiceProvider.west.isPossible = !this.repository.map[this.repository.currentX][this.repository.currentY].left;
    }

    public setBattleChoices(rounds: number): void {
        if (this.repository.hero.inventory.potions.length > 0) {
            this.choiceProvider.drinkPotion.isPossible = true;
        } else {
            this.choiceProvider.drinkPotion.isPossible = false;
        }
        if (this.repository.hero.isMagical) {
            if (rounds < 2) {
                this.choiceProvider.performMagic.isPossible = true;
            } else {
                this.choiceProvider.performMagic.isPossible = false;
            }
        }

        if (rounds < 2) {
            this.choiceProvider.hit.isPossible = false;
            this.choiceProvider.approach.isPossible = true;
        } else {
            this.choiceProvider.hit.isPossible = true;
            this.choiceProvider.approach.isPossible = false;
        }
    }
}
