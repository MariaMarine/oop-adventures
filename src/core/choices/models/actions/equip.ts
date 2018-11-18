import { injectable } from 'inversify';
import { Choice } from '../choice';

@injectable()
// tslint:disable-next-line:export-name
export class Equip extends Choice {

    constructor() {
        super(['equip', 'equipment'],
              [`You can't change your equipment at the moment`]);

    }

    public run(): void {
        this.itemService.equipItem();
    }
}
