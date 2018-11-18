import { injectable } from 'inversify';
import { Choice } from '../choice';
import { Constants } from '../../../constants/constants';

@injectable()
export class East extends Choice {

    public constructor() {
        super(['east', 'right'], Constants.directionNotPossible);
    }
    public run(): void {
        this.repository.currentY += 1;
    }
}
