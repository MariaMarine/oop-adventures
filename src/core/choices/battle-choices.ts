import { IbattleChoices } from './interface/battle-choices';
import { IChoice } from './interface/choice';
import { Choice } from './models/choice';
import { injectable } from 'inversify';

@injectable()
export class BattleChoices implements IbattleChoices {
    private readonly _performMagic: IChoice;
    private readonly _drinkPotion: IChoice;
    private readonly _escape: IChoice;
    private readonly _hit: IChoice;
    private readonly _approach: IChoice;
    public constructor() {
        this._drinkPotion = new Choice(['potion', 'drink'], ['No potions', 'Can`t do that if you have no potion']);
        this._escape = new Choice(['escape', 'run'], ['Escape is not possible!', 'Can`t do that right now']);
        this._hit = new Choice(['hit', 'attack'], ['Enemy is too far to hit', 'Enemy not in range', 'Can`t reach']);
        this._approach = new Choice(['approach', 'charge'], ['Already there', 'Can`t do that']);
        this._performMagic = new Choice(['magic', 'cast'], [`The enemy is too close!!!!`, `Can't do that`]);
    }

    public get performMagic(): IChoice {
        return this._performMagic;
    }
    public get drinkPotion(): IChoice {
        return this._drinkPotion;
    }
    public get escape(): IChoice {
        return this._escape;
    }
    public get hit(): IChoice {
        return this._hit;
    }
    public get approach(): IChoice {
        return this._approach;
    }
}
