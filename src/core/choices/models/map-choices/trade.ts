import { injectable } from 'inversify';
import { Choice } from '../choice';

@injectable()
export class Trade extends Choice {

    constructor() {
        super(['trade', 'buy', 'sell', 'exchange'],
              ['No one to trade with!', 'You can`t trade with yourself!', 'Nobody wants to trade with you here.']);

    }

    public run(): void {
        this.itemService.setTradeItem();
    }

}
