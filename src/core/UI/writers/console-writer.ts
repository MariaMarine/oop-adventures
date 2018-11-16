import { Iwriter } from '../interfaces/writer';
import { injectable } from 'inversify';

@injectable()
export class ConsoleWriter implements Iwriter {
    public write(input: string, color?: string): void {
        console.log(color || '\x1b[33m', input, '\x1b[0m');
    }

}
