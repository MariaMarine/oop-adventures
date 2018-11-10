import { Ichoice } from './interface/choice';

export class Actions {

    private loot: Ichoice;
    private exit: Ichoice;

    public constructor (possibleLoot: boolean, possibleExit: boolean) {
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
    }
    public getAllActions(): Ichoice[] {
        return [this.loot, this.exit];
    }

}
