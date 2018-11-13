import { Ihero } from './../models/living/interfaces/hero';
import { IAlive } from '../models/living/interfaces/alive';

export interface IFactory {
    createHero(name: string) : Ihero;

}
