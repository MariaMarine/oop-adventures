import { IRepository } from '../interfaces/repository';
import { Ihero } from '../../living/interfaces/hero';
import { MazeCell } from './maze-cell';
import { IPlace } from '../interfaces/place';
import { injectable } from 'inversify';

@injectable()
export class Repository implements IRepository {
    private _hero: Ihero;
    private _currentX: number = 0;
    private _currentY: number = 0;
    private _map: MazeCell[][];
    private _currentPlace: IPlace;
    private _userName: string;

    public get hero(): Ihero {
        return this._hero;
    }
    public set hero(hero: Ihero) {
        this._hero = hero;
    }

    public get currentX(): number {
        return this._currentX;
    }
    public set currentX(currentX: number) {
        this._currentX = currentX;
    }
    public get currentY(): number {
        return this._currentY;
    }
    public set currentY(currentY: number) {
        this._currentY = currentY;
    }
    public get map(): MazeCell[][] {
        return this._map;
    }
    public set map(map: MazeCell[][]) {
        this._map = map;
    }
    public get currentPlace(): IPlace {
        return this._currentPlace;
    }
    public set currentPlace(place: IPlace) {
        this._currentPlace = place;
    }

    public get userName(): string {
        return this._userName;
    }
    public set userName(name: string) {
        this._userName = name;
    }
}
