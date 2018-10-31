import * as readlineSync from 'readline-sync';

import { Ireader } from '../interfaces/reader';
import { injectable } from 'inversify';

@injectable()

export class ConsoleReader implements Ireader {

    public read(): string {
        return readlineSync.prompt();
    }

}
