import { injectable } from 'inversify';
import { Choice } from '../choice';

@injectable()
export class ShowItems extends Choice {

    constructor() {
        super(['items', 'show items', 'inventory', 'bag', 'display'],
              ['Not now!']);

    }

    public run(): void {
        this.writer.write(`You have the following items:\n${this.repository.hero.inventory.listItems()}`, '\x1b[34m');
    }

}
