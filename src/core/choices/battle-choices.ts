import { IbattleChoices } from './interface/battle-choices';
import { IChoice } from './interface/choice';
import { Choice } from './choice';
import { injectable } from 'inversify';

@injectable()
export class BattleChoices implements IbattleChoices {
    private readonly _performMagic: IChoice;
    private readonly _drinkPotion: IChoice;
    private readonly _escape: IChoice;
    private readonly _hit: IChoice;

    public constructor() {
        this._drinkPotion = new Choice(['potion', 'drink'], ['No potions', 'Can`t do that if you have no potion']);
        this._escape = new Choice(['escape', 'run'], ['Escape is not possible!', 'Can`t do that right now']);
        this._hit = new Choice(['hit', 'attack'], ['Already dead', 'Don`t play with dead things', 'YOu might wake a Zombie']);
        this._performMagic = new Choice(['magic', 'cast'], ['No mana left, sorry', 'Oh, you are so dead, poor Wizard']);
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
}
