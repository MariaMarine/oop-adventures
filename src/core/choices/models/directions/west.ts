import { injectable } from 'inversify';
import { Choice } from '../choice';
import { Constants } from '../../../constants/constants';

@injectable()
export class West extends Choice {

    public constructor() {
        super(['west', 'left'], Constants.directionNotPossible);
    }
    public run(): void {
        this.repository.currentY += -1;
    }
}
