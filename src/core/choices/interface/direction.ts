import { IChoice } from './choice';
// THESE PROPERTIES ARE NOW INCLUDED IN CHOICE INTERFACE in order to be usable on nextCommand
// REMOVE?
export interface IDirection extends IChoice {
    xDirection: number;
    yDirection: number;
}
