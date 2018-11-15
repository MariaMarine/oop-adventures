import { IPlace } from './place';

export interface IMazeCell {
    x: number;
    y: number;
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
// tslint:disable-next-line:no-reserved-keywords
    set: number;
    place: IPlace;
}
