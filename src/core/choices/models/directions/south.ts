import { injectable } from 'inversify';
import { Choice } from '../choice';
import { Constants } from '../../../constants/constants';

@injectable()
export class South extends Choice {

    public constructor() {
        super(['south', 'down'], Constants.directionNotPossible);
    }
    public run(): void {
        this.repository.currentX += 1;
    }
}
