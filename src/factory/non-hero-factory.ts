import { IAlive } from '../models/living/interfaces/alive';
import { NonHero } from '../models/living/classes/non-hero';
import { MagicResistanceText } from '../models/living/enums/magicResistance';

export class NonHeroFactory {
    public createNonHero(
        name: string,
        life: number,
        strength: number,
        magicResistance: number,
        magicResistanceText: MagicResistanceText,
        fearFactor: number): IAlive {
        return new NonHero(name, life, strength, magicResistance, magicResistanceText, fearFactor);
    }
}
