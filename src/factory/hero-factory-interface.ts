import { IAlive } from '../models/living/interfaces/alive';

export interface IHeroFactory {
    createPersonHero() : IAlive;
    createMagicianHero() : IAlive;
}
