import { IChoice } from './interface/choice';
import { IChoiceProvider } from './interface/choice-provider';
import { inject, injectable } from 'inversify';

@injectable()
export class ChoiceProvider implements IChoiceProvider {

    private _loot: IChoice;
    private _attack: IChoice;
    private _trade: IChoice;
    private _showItems: IChoice;
    private _equip: IChoice;
    private _north: IChoice;
    private _south: IChoice;
    private _east: IChoice;
    private _west: IChoice;
    private _hit: IChoice;
    private _drinkPotion: IChoice;
    private _performMagic: IChoice;
    private _approach: IChoice;

    public constructor(
        @inject('hit') hit: IChoice,
        @inject('drink-potion') drinkPotion: IChoice,
        @inject('perform-magic') performMagic: IChoice,
        @inject('approach') approach: IChoice,
        @inject('west') west: IChoice,
        @inject('south') south: IChoice,
        @inject('north') north: IChoice,
        @inject('east') east: IChoice,
        @inject('loot') loot: IChoice,
        @inject('show-items') showItems: IChoice,
        @inject('attack') attack: IChoice,
        @inject('trade') trade: IChoice,
        @inject('equip') equip: IChoice
    ) {
        this.hit = hit;
        this.drinkPotion = drinkPotion;
        this.approach = approach;
        this.equip = equip;
        this.performMagic = performMagic;
        this.equip = equip;
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
        this.loot = loot;
        this.showItems = showItems;
        this.attack = attack;
        this.trade = trade;
    }
    public set performMagic(performMagic: IChoice) {
        this._performMagic = performMagic;
    }
    public get performMagic(): IChoice {
        return this._performMagic;
    }
    public set drinkPotion(drinkPotion: IChoice) {
        this._drinkPotion = drinkPotion;
    }
    public get drinkPotion(): IChoice {
        return this._drinkPotion;
    }
    public set hit(hit: IChoice) {
        this._hit = hit;
    }
    public get hit(): IChoice {
        return this._hit;
    }
    public set approach(approach: IChoice) {
        this._approach = approach;
    }
    public get approach(): IChoice {
        return this._approach;
    }
    public get north(): IChoice {
        return this._north;
    }
    public set north(north: IChoice) {
        this._north = north;
    }
    public get south(): IChoice {
        return this._south;
    }
    public set south(south: IChoice) {
        this._south = south;
    }
    public get west(): IChoice {
        return this._west;
    }
    public set west(west: IChoice) {
        this._west = west;
    }
    public get east(): IChoice {
        return this._east;
    }
    public set east(east: IChoice) {
        this._east = east;
    }
    public get loot(): IChoice {
        return this._loot;
    }
    public set loot(loot: IChoice) {
        this._loot = loot;
    }
    public get trade(): IChoice {
        return this._trade;
    }
    public set trade(trade: IChoice) {
        this._trade = trade;
    }
    public get showItems(): IChoice {
        return this._showItems;
    }
    public set showItems(showItems: IChoice) {
        this._showItems = showItems;
    }
    public get attack(): IChoice {
        return this._attack;
    }
    public set attack(attack: IChoice) {
        this._attack = attack;
    }
    public get equip(): IChoice {
        return this._equip;
    }
    public set equip(equip: IChoice) {
        this._equip = equip;
    }

    public getMapChoices(): IChoice[] {
        return [this.north, this.south, this.east, this.west, this.trade, this.attack, this.loot, this.showItems, this.equip];
    }

    public getBattleChoices(): IChoice[] {
        return [this.hit, this.performMagic, this.approach, this.drinkPotion];
    }
}
