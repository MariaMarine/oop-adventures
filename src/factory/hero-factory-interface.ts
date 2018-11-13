import { Ihero } from './../models/living/interfaces/hero';

export interface IFactory {
    createHero(name: string) : Ihero;

}
