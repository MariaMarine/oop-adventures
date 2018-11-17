import { IChoice } from './interface/choice';
import { injectable } from 'inversify';
import { Choice } from './models/choice';
import { IActions } from './interface/actions';

@injectable()
export class Actions implements IActions {

    private _loot: IChoice;

    private _exit: IChoice;

    private _currentInventory: IChoice;

    private _trade: IChoice;

    private _attack: IChoice;

    public constructor() {
        this._loot = new Choice(['search', 'loot'], ['You found nothing', 'You search for a while - in vain', 'Nothing here']);
        this._exit = new Choice(['exit', 'continue'], ['You try to escape but...']);
        this._currentInventory = new Choice(['items', 'show items', 'inventory', 'bag', 'display'], ['Not now!']);
        this._trade = new Choice(['trade', 'buy', 'sell', 'exchange'], ['No one to trade with!',
        'You can`t see anyone willing to trade.', 'Nobody wants to trade with you here.']);
        this._attack = new Choice(['attack', 'kill', 'battle'], ['Can`t attack right now', 'Atack who??!', 'Noone here right now']);
    }

    public get exit(): IChoice {
        return this._exit;
    }
    public get currentInventory(): IChoice {
        return this._currentInventory;
    }
    public get trade(): IChoice {
        return this._trade;
    }
    public get attack(): IChoice {
        return this._attack;
    }
    public get loot(): IChoice {
        return this._loot;
    }

}
