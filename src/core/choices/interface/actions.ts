import { IChoice } from './choice';

export interface IActions {
    loot: IChoice;

    exit: IChoice;

    currentInventory: IChoice;

    trade: IChoice;

    attack: IChoice;
}
