import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { Iengine } from './interfaces/engine';
import { IChoice } from './choices/interface/choice';
import { PlaceGenerator } from './engine-helpers/current-place-generator';
import { Constants } from './constants/constants';
import { Iwriter } from './UI/interfaces/writer';
import { Battle } from './modes/battle';
import { IRepository } from '../models/non-living/interfaces/repository';
import { IChoiceProvider } from './choices/interface/choice-provider';
import { IChoiceService } from './choices/interface/choice-service';


@injectable()
export class MainEngine implements Iengine {
    private readonly promptLoop: PromptLoop;
    private currentChoices: IChoice[] = [];
    private placeGenerator: PlaceGenerator;
    private writer: Iwriter;
    private repository: IRepository;
    private choiceService: IChoiceService;
    private choiceProvider: IChoiceProvider;
    private battle: Battle;
    public constructor(
        @inject('battle') battle: Battle,
        @inject('repository') repository: IRepository,
        @inject('current-place-generator') placeGenerator: PlaceGenerator,
        @inject('ui-writer') writer: Iwriter,
        @inject('prompt-loop') promptloop: PromptLoop,
        @inject('choice-service') choiceService: IChoiceService,
        @inject('choice-provider') choiceProvider: IChoiceProvider
    ) {
        this.battle = battle;
        this.choiceProvider = choiceProvider;
        this.choiceService = choiceService;
        this.repository = repository;
        this.writer = writer;
        this.promptLoop = promptloop;
        this.placeGenerator = placeGenerator;
    }

    public start(): void {

        this.placeGenerator.setNewPlace();
        while (this.repository.currentX !== Constants.gameRows - 1 || this.repository.currentY !== Constants.gameCols - 1) {
            this.choiceService.setMapChoices();

            const nextChoice: IChoice = this.promptLoop.multiple(
                ['What would you like to do?', 'Well...', 'For all possible choices type "options"', 'Please try again'],
                this.choiceProvider.getMapChoices());

            nextChoice.run();
            if (nextChoice.names[0] === 'attack') {
                this.battle.start();
            }
            this.placeGenerator.setNewPlace();
        }
        this.writer.write(`CONGRATULATIONS!!! You've found your way out of the OOP labyrinth\n
        You win a beautiful Telerik t-shirt :)`);
    }

}
