import { Iwriter } from '../interfaces/writer';

export class ConsoleWriter implements Iwriter {
    public write(input: string): void {
        console.log(input);
    }

}
