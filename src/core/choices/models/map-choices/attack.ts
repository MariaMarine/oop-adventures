import { injectable } from 'inversify';
import { Choice } from '../choice';

@injectable()
export class Attack extends Choice {

    constructor() {
        super(['attack', 'kill', 'battle', 'fight'],
              ['Can`t attack right now', 'Atack who??!', 'Noone here right now']);

    }

    public run(): void {
        this.writer.write(`You decided to attack!!`, '\x1b[34m');
    }

}
