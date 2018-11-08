import { Ichoice } from './choice';
// THESE PROPERTIES ARE NOW INCLUDED IN CHOICE INTERFACE in order to be usable on nextCommand
// REMOVE?
export interface Idirection extends Ichoice {
    xDirection: number;
    yDirection: number;
}
