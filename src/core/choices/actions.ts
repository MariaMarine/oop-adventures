import { IChoice } from './interface/choice';
import { injectable } from 'inversify';
import { Choice } from './choice';

@injectable()
export class Actions {

    private loot: IChoice;

    private exit: IChoice;

    private currentInventory: IChoice;

    private trade: IChoice;

    private attack: IChoice;

    public constructor() {
        this.loot = new Choice(['search', 'loot'], ['You found nothing', 'You search for a while - in vain', 'Nothing here']);
        this.exit = new Choice(['exit', 'continue'], ['You try to escape but...']);
        this.currentInventory = new Choice(['items', 'show items', 'inventory', 'bag', 'display'], ['Not now!']);
        this.trade = new Choice(['trade', 'buy', 'sell', 'exchange'],
                                ['No one to trade with!', 'You can`t trade with yourself!', 'Nobody wants to trade with you here.']);

        this.attack = new Choice(['attack', 'kill', 'battle'], ['Can`t attack right now', 'Atack who??!', 'Noone here right now']);
    }

    public getAllActions(): { loot: IChoice; exit: IChoice; inventory: IChoice; trade: IChoice; attack: IChoice } {
    return { loot: this.loot, exit: this.exit, inventory: this.currentInventory, trade: this.trade, attack: this.attack };
}

}
