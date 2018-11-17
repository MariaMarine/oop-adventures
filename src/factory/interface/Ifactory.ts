import { Ihero } from "../../models/living/interfaces/hero";
import { IAlive } from "../../models/living/interfaces/alive";
import { NonHero } from "../../models/living/classes/non-hero";

export interface Ifactory {
    createHero(heroData: Ihero): Ihero;
    createNonHero(difficultyCoef: number): NonHero;
}
