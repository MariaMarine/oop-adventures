import { Ireader } from './interfaces/reader';
import { Iwriter } from './interfaces/writer';
import { inject, injectable } from 'inversify';
import { IChoice } from '../choices/interface/choice';
import { Ihero } from '../../models/living/interfaces/hero';
import { IDbService } from '../../db/service/interfaces/db-service';
import { CollectionNames } from '../../db/service/collection-names';
import { Randomizer } from '../../factory/randomizer';

@injectable()

export class PromptLoop {
    private reader: Ireader;
    private writer: Iwriter;
    private dbService: IDbService;
    public constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('ui-reader') reader: Ireader,
        @inject('database-service') dbService: IDbService) {
        this.dbService = dbService;
        this.reader = reader;
        this.writer = writer;
    }
    public multiple(promptStrings: string[], choices: IChoice[]): IChoice {
        let i: number = 0;
        let commandToReturn: IChoice = {
            names: [],
            commandNotPossibleStrings: [],
            isPossible: false
        };
        let oneOfThePossibleChoicesInputed: boolean = false;
        // tslint:disable-next-line:no-constant-condition
        while (!oneOfThePossibleChoicesInputed) {
            const currentPromptString: string = promptStrings[i];

            this.writer.write(currentPromptString);

            let input: string = this.reader.read().toLowerCase();
            while (input === 'options') {
                this.writer.write(choices.reduce((acc: string, choice: IChoice) =>
                `${acc} ${choice.names[0]}`,     `You have the following options: `), '\x1b[31m');
                input = this.reader.read().toLowerCase();
            }
            choices.forEach((choice: IChoice) => {
                choice.names.forEach((choiceName: string) => {
                    if (choiceName === input) {
                        if (choice.isPossible) {
                            commandToReturn = choice;
                            oneOfThePossibleChoicesInputed = true;
                        } else {
                            this.writer.write(choice.commandNotPossibleStrings[i] || choice.commandNotPossibleStrings[0]);
                        }
                    }
                });
            });

            if (i < promptStrings.length - 1) {
                i += 1;
            }
        }

        return commandToReturn;
    }

    public setName(): string {
        const promptStrings: string[] = ['Please enter your name:',
            'Your name should be between 5 and 15 characters, letters only',
            'Please try again'];
        let name: string = '';
        let i: number = 0;
        let correctNameChosen: boolean = false;
        // tslint:disable-next-line:no-constant-condition
        while (!correctNameChosen) {
            const currentPromptString: string = promptStrings[i];
            this.writer.write(currentPromptString, '\x1b[31m');
            const input: string = this.reader.read();
            const regEx: RegExp = /^[a-zA-Z]*$/;
            if (input.length > 4 && input.length < 16 && regEx.test(input)) {
                name = input;
                correctNameChosen = true;
            }
            if (i < promptStrings.length - 1) {
                i += 1;
            }
        }

        return name;
    }

    public chooseHero(): Ihero {
        const heroesPossibleNames: string[] = this.dbService.getCollectionsKeys(CollectionNames.heroes);

        this.writer.write('It is time to choose the Hero you want to resurect from the dead to fight for you!', '\x1b[34m');
        this.writer.write(`You have the following options: \n`, '\x1b[31m');
        heroesPossibleNames.forEach((name: string) => {
            const hero: Ihero = <Ihero>this.dbService.readByKey(CollectionNames.heroes, name);
            this.writer.write(`${name}: ${hero.info}`, '\x1b[34m');
        });
        let currentInput: string = '';
        const promptStrings: string[] = ['Try again!', 'Invalid name', 'No such Hero'];
        while (!heroesPossibleNames.includes(currentInput)) {
            currentInput = this.reader.read();
            if (heroesPossibleNames.includes(currentInput)) {
                continue;
            }
            currentInput = Randomizer.GETRANDOMARRAYELEMENT(promptStrings);
            this.writer.write(currentInput);
        }

        return <Ihero>this.dbService.readByKey(CollectionNames.heroes, currentInput);
    }

    public chooseTradeItem(possibleDeals: string[]): string {
        this.writer.write(`To trade, type 'buy' or 'sell' followed by the item code \n`);
        let currentInput: string = '';
        const promptStrings: string[] = ['Try again!', 'Invalid name', 'No such item'];
        while (!possibleDeals.includes(currentInput)) {
            currentInput = this.reader.read();
            if (possibleDeals.includes(currentInput)) {
                console.log('ok');
                continue;
            }
            currentInput = Randomizer.GETRANDOMARRAYELEMENT(promptStrings);
            this.writer.write(currentInput);
        }

        return currentInput;
    }
}
