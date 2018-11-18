import { injectable } from 'inversify';
import { Choice } from '../choice';

@injectable()
export class Loot extends Choice {

    constructor() {
        super(['search', 'loot'],
              ['You found nothing', 'You search for a while - in vain', 'Nothing here']);

    }

    public run(): void {
        this.itemService.lootPlace();
    }

}
