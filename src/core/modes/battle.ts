import { inject, injectable } from 'inversify';
import { PromptLoop } from '../UI/promptLoop';
import { Ihero } from '../../models/living/interfaces/hero';
import { IbattleChoices } from '../choices/interface/battle-choices';
import { NonHero } from '../../models/living/classes/non-hero';
import { IChoice } from '../choices/interface/choice';
import { IPotion } from '../../models/non-living/interfaces/potion';
import { PotionType } from '../../models/non-living/enums/potionTypes';
import { IRepository } from '../../models/non-living/interfaces/repository';
import { Iwriter } from '../UI/interfaces/writer';
import { write } from 'fs';

@injectable()
export class Battle {
    private readonly _promptLoop: PromptLoop;
    private readonly _battleChoices: IbattleChoices;
    private _hero: Ihero;
    private _enemy: NonHero;
    private _tempMagicBoost: number;
    private _tempStrengthBoost: number;
    private _rounds: number;
    private repository: IRepository;
    private writer: Iwriter;
    constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('repository') repository: IRepository,
        @inject('prompt-loop') promptLoop: PromptLoop,
        @inject('battle-choices') battleChoices: IbattleChoices
    ) {
        this.writer = writer;
        this.repository = repository;
        this._promptLoop = promptLoop;
        this._battleChoices = battleChoices;
    }
    public get promptLoop(): PromptLoop {
        return this._promptLoop;
    }
    public get battleChoices(): IbattleChoices {
        return this._battleChoices;
    }
    public get hero(): Ihero {
        return this._hero;
    }
    public set hero(hero: Ihero) {
        this._hero = hero;
    }
    public get tempMagicBoost(): number {
        return this._tempMagicBoost;
    }
    public set tempMagicBoost(boost: number) {
        this._tempMagicBoost = boost;
    }
    public get tempStrengthBoost(): number {
        return this._tempStrengthBoost;
    }
    public set tempStrengthBoost(boost: number) {
        this._tempStrengthBoost = boost;
    }
    public get enemy(): NonHero {
        return this._enemy;
    }
    public set enemy(enemy: NonHero) {
        this._enemy = enemy;
    }
    public get rounds(): number {
        return this._rounds;
    }
    public set rounds(rounds: number) {
        this._rounds = rounds;
    }
    public start(): void {
        const enemy: NonHero = this.repository.currentPlace.creature;
        while (enemy.life > 0) {
            this.setCurrentChoices();
            const nextChoice: IChoice =
                this.promptLoop.multiple([`Choose what you do next`, `Let's do this`], Object.values(this.battleChoices));
            if (nextChoice.names[0] === 'potion') {
                this.drinkPotion();
            }
            this.rounds += 1;
        }

    }

    private drinkPotion(): void {
        const potionIndex: number = this.promptLoop.choosePotion(this.repository.hero.inventory.potions);
        const potionToDrink: IPotion = this.repository.hero.inventory.removePotion(potionIndex);
        if (potionToDrink.name === PotionType[0]) { //heal
            this.hero.life += potionToDrink.power;
        }
        if (potionToDrink.name === PotionType[1]) { //magic
            this.tempMagicBoost = potionToDrink.power;
        }
        if (potionToDrink.name === PotionType[2]) { //strength
            this.tempStrengthBoost = potionToDrink.power;
        }
        this.writer.write(`Drank postion ${potionToDrink.name} successfully`);
    }

    private hitRound(): void {

    }

    private setCurrentChoices(): void {
        if (this.repository.hero.inventory.potions.length > 0) {
            this.battleChoices.drinkPotion.isPossible = true;
        } else {
            this.battleChoices.drinkPotion.isPossible = false;
        }
        if (this.repository.hero.isMagical) {
            this.battleChoices.performMagic.isPossible = true;
        } else {
            this.battleChoices.performMagic.isPossible = false;
        }
        if (this.rounds < 2) {
            this.battleChoices.hit.isPossible = false;
        } else {
            this.battleChoices.hit.isPossible = true;
        }

    }
}
