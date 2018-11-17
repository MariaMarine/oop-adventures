import { Ihero } from '../../models/living/interfaces/hero';
import { IAlive } from '../../models/living/interfaces/alive';

export interface Ifactory {
    createHero(heroData: Ihero): Ihero;
    createNonHero(difficultyCoef: number): IAlive;
}
