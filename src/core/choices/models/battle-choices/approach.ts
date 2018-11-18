import { Choice } from '../choice';
import { injectable } from 'inversify';

@injectable()
export class Approach extends Choice {
    public constructor() {
        super(['approach', 'charge'], ['Already there', 'Can`t do that']);
    }
    public run(): void {
        this.writer.write('You approached the enemy !!!');
    }
}
