import * as readlineSync from 'readline-sync';
import { Ireader } from '../interfaces/reader';

export class ConsoleReader implements Ireader {

    public read(): string {
        return readlineSync.prompt();
    }

}
