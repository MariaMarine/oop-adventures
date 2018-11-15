import { IChoice } from './interface/choice';
import { injectable } from 'inversify';

@injectable()
export class Actions {

    private loot: IChoice;

    private exit: IChoice;

    private currentInventory: IChoice;

    private trade: IChoice;

    public constructor() {
        this.loot = {
            names: ['search', 'loot'],
            isPossible: false,
            commandNotPossibleStrings: ['You found nothing', 'You search for a while - in vain', 'Nothing here']
        };
        this.exit = {
            names: ['exit', 'continue'],
            isPossible: false,
            commandNotPossibleStrings: ['You try to escape but...']
        };
        this.currentInventory = {
            names: ['items', 'show items', 'inventory', 'bag', 'display'],
            isPossible: false,
            commandNotPossibleStrings: ['Not now!']
        };
        this.trade = {
            names: ['trade', 'buy', 'sell', 'exchange'],
            isPossible: false,
            commandNotPossibleStrings: ['No one to trade with!', 'You can`t trade with yourself!', 'Nobody wants to trade with you here.']
        };
    }
    public getAllActions(): { loot: IChoice; exit: IChoice; inventory: IChoice; trade: IChoice } {
        return { loot: this.loot, exit: this.exit, inventory: this.currentInventory, trade: this.trade };
    }

}
