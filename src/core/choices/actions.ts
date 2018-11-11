import { IChoice } from './interface/choice';

export class Actions {

    private loot: IChoice;
    private exit: IChoice;

    private currentInventory: IChoice;

    public constructor (possibleLoot: boolean, possibleExit: boolean, possibleShowItems: boolean) {
        this.loot = {
            names: ['search', 'loot'],
            isPossible: possibleLoot,
            xDirection: 0,
            yDirection: 0,
            commandNotPossibleStrings: ['You found nothing', 'You search for a while - in vain', 'Nothing here']
        };
        this.exit = {
            names: ['exit', 'continue'],
            isPossible: possibleExit,
            xDirection: 0,
            yDirection: 0,
            commandNotPossibleStrings: ['You try to escape but...']
        };
        this.currentInventory = {
            names: ['items', 'show items', 'inventory', 'bag', 'display'],
            isPossible: possibleShowItems,
            xDirection: 0,
            yDirection: 0,
            commandNotPossibleStrings: ['Not now!']
        };
    }
    public getAllActions(): IChoice[] {
        return [this.loot, this.exit, this.currentInventory];
    }

}
