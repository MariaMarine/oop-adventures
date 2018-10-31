import { Iwriter } from '../interfaces/writer';
import { injectable } from 'inversify';

@injectable()
export class ConsoleWriter implements Iwriter {
    public write(input: string): void {
        console.log(input);
    }

}
