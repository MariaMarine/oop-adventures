import { Modes } from './modes/enums/modes';
import { Iparser } from './UI/interfaces/parser';
import { Ireader } from './UI/interfaces/reader';
import { Iwriter } from './UI/interfaces/writer';

export class MainEngine {
    private readonly writer: Iwriter;
    private readonly reader: Ireader;
    private readonly parser: Iparser;
    private _currentMode: Modes;
    public constructor(reader: Ireader, writer: Iwriter, parser: Iparser) {
        this.currentMode = Modes.explore;
        this.reader = reader;
        this.writer = writer;
        this.parser = parser;
    }

    public set currentMode(mode: Modes) {
        this._currentMode = mode;
    }
    public start(): void {
        // tslint:disable-next-line:no-constant-condition
        while (true) {
            const input: string = this.reader.read();
            if (input === 'end') {
                this.writer.write('You choose to end the game. Loser.');
                continue;
            }

        }
    }
}
