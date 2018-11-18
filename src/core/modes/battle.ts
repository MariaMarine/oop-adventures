import { inject, injectable } from 'inversify';
import { PromptLoop } from '../UI/promptLoop';
import { NonHero } from '../../models/living/classes/non-hero';
import { IChoice } from '../choices/interface/choice';
import { IRepository } from '../../models/non-living/interfaces/repository';
import { Iwriter } from '../UI/interfaces/writer';
import { IChoiceService } from '../choices/interface/choice-service';
import { IChoiceProvider } from '../choices/interface/choice-provider';

@injectable()
export class Battle {
    private readonly _promptLoop: PromptLoop;
    private _tempMagicBoost: number = 0;
    private _tempStrengthBoost: number = 0;
    private _rounds: number = 0;
    private repository: IRepository;
    private writer: Iwriter;
    private choiceProvider: IChoiceProvider;
    private choiceService: IChoiceService;
    constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('repository') repository: IRepository,
        @inject('prompt-loop') promptLoop: PromptLoop,
        @inject('choice-service') choiceService: IChoiceService,
        @inject('choice-provider') choiceProvider: IChoiceProvider
    ) {
        this.choiceProvider = choiceProvider;
        this.choiceService = choiceService;
        this.writer = writer;
        this.repository = repository;
        this._promptLoop = promptLoop;

    }
    public get promptLoop(): PromptLoop {
        return this._promptLoop;
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

    public get rounds(): number {
        return this._rounds;
    }
    public set rounds(rounds: number) {
        this._rounds = rounds;
    }
    public start(): void {
        const enemy: NonHero = this.repository.currentPlace.creature;
        this.rounds = 0;
        while (enemy.life > 0) {
            this.writer.write(`ROUND ${this.rounds}\n`, '\x1b[31m');

            this.choiceService.setBattleChoices(this.rounds);

            const nextChoice: IChoice =
                this.promptLoop.multiple(
                    [
                        `Choose what you do next`,
                        `Let's do this`,
                        `What now?`,
                        `Will you survive to tell the story?`],
                    this.choiceProvider.getBattleChoices());

            nextChoice.run();
            this.rounds += 1;
        }
        this.tempMagicBoost = 0;
        this.tempStrengthBoost = 0;

    }
}
