import { injectable } from 'inversify';
import { Choice } from '../choice';
import { Constants } from '../../../constants/constants';

@injectable()
export class North extends Choice {

    public constructor() {
        super(['north', 'up'], Constants.directionNotPossible);
    }
    public run(): void {
        this.repository.currentX += -1;
    }
}
