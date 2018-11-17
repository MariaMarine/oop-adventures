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
import { ItemService } from '../engine-helpers/item-service';
import { Randomizer } from '../../factory/randomizer';

@injectable()
export class Battle {
    private readonly _promptLoop: PromptLoop;
    private readonly _battleChoices: IbattleChoices;
    private _enemy: NonHero;
    private _tempMagicBoost: number = 0;
    private _tempStrengthBoost: number = 0;
    private _rounds: number = 0;
    private repository: IRepository;
    private writer: Iwriter;
    private itemService: ItemService;
    constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('repository') repository: IRepository,
        @inject('prompt-loop') promptLoop: PromptLoop,
        @inject('battle-choices') battleChoices: IbattleChoices,
        @inject('item-service') itemService: ItemService
    ) {
        this.itemService = itemService;
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
        this.enemy = this.repository.currentPlace.creature;
        this.rounds = 0;
        while (this.enemy.life > 0) {
            this.writer.write(`ROUND ${this.rounds}\n`, '\x1b[31m');
            this.setCurrentChoices();
            const nextChoice: IChoice =
                this.promptLoop.multiple([`Choose what you do next`,
                    `Let's do this`, `What now?`,
                    `Will you survive to tell the story?`],
                                         Object.values(this.battleChoices));
            if (nextChoice.names[0] === 'potion') {
                this.drinkPotion();
            }
            if (nextChoice.names[0] === 'hit') {
                this.hitRound();
            }
            if (nextChoice.names[0] === 'magic') {
                this.magicRound();
            }
            this.rounds += 1;
        }
        this.tempMagicBoost = 0;
        this.tempStrengthBoost = 0;

    }

    private drinkPotion(): void {
        const potionIndex: number = this.promptLoop.choosePotion(this.repository.hero.inventory.potions);
        const potionToDrink: IPotion = this.repository.hero.inventory.removePotion(potionIndex);
        if (potionToDrink.name === PotionType[0]) {
            this.repository.hero.life += potionToDrink.power;
            this.writer.write(`You boost your life by ${potionToDrink.power} which is now ${this.repository.hero.life}`);
        }
        if (potionToDrink.name === PotionType[1]) {
            this.tempMagicBoost = potionToDrink.power;
            this.writer.write(`You temporarily boost your magic power by ${potionToDrink.power}`);
        }
        if (potionToDrink.name === PotionType[2]) {
            this.tempStrengthBoost = potionToDrink.power;
            this.writer.write(`You temporarily boost your strength by ${potionToDrink.power}`);
        }
        this.writer.write(`Drank postion ${potionToDrink.name} successfully`, '\x1b[34m');
    }

    private hitRound(): void {
        const heroHitDamage: number = Math.floor((this.repository.hero.strength + this.tempStrengthBoost) * 1.75 +
        this.repository.hero.equipment.weapon.physicalDamage);
        const enemyHitDamage: number = Math.floor(this.enemy.strength * 2.25);
        this.repository.hero.life -= enemyHitDamage;
        this.enemy.life -= heroHitDamage;
        this.writer.write(`You hit the ${this.enemy.name} and it takes ${heroHitDamage} damage!`, '\x1b[35m');
        this.writer.write(`The ${this.enemy.name} hits back and you take ${enemyHitDamage} damage!`, '\x1b[35m');
        if (this.repository.hero.life === 0) {
            let i: number = 500;
            let output: string = '';
            while (i !== 0) {
                output += `YOU ARE DEAD `;
                this.writer.write(output, '\x1b[32m');
                i += 1;
            }
        }
        if (this.enemy.life === 0) {
            this.writer.write(`The ${this.enemy.name} is now dead!!`, '\x1b[34m');
            this.writer.write(`It dropped some stuff`, '\x1b[34m');
            this.repository.currentPlace.loot.consumeInventory(this.enemy.inventory);
            this.repository.currentPlace.containsCreature = false;
        } else {
            // tslint:disable-next-line:max-line-length
            this.writer.write(`The ${this.enemy.name} is left with ${this.enemy.life} health, you have ${this.repository.hero.life}!`, '\x1b[34m');
        }

    }

    private magicRound(): void {
        const heroMagicDamage: number = Math.floor(this.repository.hero.equipment.weapon.magicalDamage + this.tempMagicBoost * 1.5);
        const magicString: string = Randomizer.GETRANDOMARRAYELEMENT(this.repository.hero.magicStrings);
        this.enemy.life -= heroMagicDamage;
        this.writer.write(`You performed ${magicString} and the ${this.enemy.name} takes ${heroMagicDamage} damage!`, '\x1b[35m');
        if (this.repository.hero.life === 0) {
            let i: number = 500;
            let output: string = '';
            while (i !== 0) {
                output += `YOU ARE DEAD `;
                this.writer.write(output, '\x1b[32m');
                i += 1;
            }
        }
        if (this.enemy.life === 0) {
            this.writer.write(`The ${this.enemy.name} is now dead!!`, '\x1b[34m');
            this.writer.write(`It dropped some stuff`, '\x1b[34m');
            this.repository.currentPlace.loot.consumeInventory(this.enemy.inventory);
            this.repository.currentPlace.containsCreature = false;
        } else {
            this.writer.write(`The ${this.enemy.name} looks shocked, but approaches you nevertheless!!!`, '\x1b[35m');
            // tslint:disable-next-line:max-line-length
            this.writer.write(`Your enemy is left with ${this.enemy.life} health, you have ${this.repository.hero.life}!\n`, '\x1b[34m');
        }
    }
    private setCurrentChoices(): void {
        if (this.repository.hero.inventory.potions.length > 0) {
            this.battleChoices.drinkPotion.isPossible = true;
        } else {
            this.battleChoices.drinkPotion.isPossible = false;
        }
        if (this.repository.hero.isMagical) {
            if (this.rounds < 2) {
                this.battleChoices.performMagic.isPossible = true;
            } else {
                this.battleChoices.performMagic.isPossible = false;
            }
        }

        if (this.rounds < 2) {
            this.battleChoices.hit.isPossible = false;
            this.battleChoices.approach.isPossible = true;
        } else {
            this.battleChoices.hit.isPossible = true;
            this.battleChoices.approach.isPossible = false;
        }

    }
}
