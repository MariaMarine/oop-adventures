import { IChoice } from './choice';

export interface IChoiceProvider {
    north: IChoice;
    south: IChoice;
    east: IChoice;
    west: IChoice;
    loot: IChoice;
    attack: IChoice;
    trade: IChoice;
    showItems: IChoice;
    equip: IChoice;
    hit: IChoice;
    drinkPotion: IChoice;
    performMagic: IChoice;
    approach: IChoice;
    getMapChoices(): IChoice[];
    getBattleChoices(): IChoice[];
}
