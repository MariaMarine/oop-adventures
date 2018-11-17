import { IChoice } from './choice';

export interface IbattleChoices {
    hit: IChoice;
    performMagic: IChoice;
    drinkPotion: IChoice;
    escape: IChoice;
    approach: IChoice;
}
