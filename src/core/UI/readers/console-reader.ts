import * as readlineSync from 'readline-sync';
import { Iparser } from '../interfaces/parser';
import { Ireader } from '../interfaces/reader';
import { Parser } from '../parser';

export class ConsoleReader implements Ireader {

    public read(): string {
        return readlineSync.prompt();
    }

}
