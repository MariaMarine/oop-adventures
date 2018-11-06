import { Ireader } from './interfaces/reader';
import { Iwriter } from './interfaces/writer';
import { inject, injectable } from 'inversify';
import { Icommand } from '../commands/interface/command';

@injectable()

export class PromptLoop {
    private reader: Ireader;
    private writer: Iwriter;

    public constructor(
        @inject('ui-writer') writer: Iwriter,
        @inject('ui-reader') reader: Ireader) {
        this.reader = reader;
        this.writer = writer;
    }
    public multiple(promptStrings: string[], commands: Icommand[]): Icommand {
        let i: number = 0;
        let commandToReturn: Icommand = {
            names: [],
            commandNotPossibleStrings: [],
            isPossible: false
        };
        let oneOfThePossibleChoicesInputed: boolean = false;
        // tslint:disable-next-line:no-constant-condition
        while (!oneOfThePossibleChoicesInputed) {
            const currentPromptString: string = promptStrings[i];

            this.writer.write(currentPromptString);

            const input: string = this.reader.read().toLowerCase();

            commands.forEach((command: Icommand) => {
                command.names.forEach((commandName: string) => {
                    if (commandName === input) {
                        if (command.isPossible) {
                            commandToReturn = command;
                            oneOfThePossibleChoicesInputed = true;
                        } else {
                            this.writer.write(command.commandNotPossibleStrings[i] || command.commandNotPossibleStrings[0]);
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
            this.writer.write(currentPromptString);
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
}
