import { MagicResistanceText } from '../models/living/enums/magicResistance';
import { Hero } from '../models/living/classes/hero';
import { IAlive } from '../models/living/interfaces/alive';
import { Heroes } from '../core/namespaces/heroes';

export class HeroFactory {
    public createPersonHero(): IAlive {
        return new Hero(
            Heroes.personHeroName,
            Heroes.personHeroLife,
            Heroes.personHeroStrength,
            Heroes.personHeroMagicResistance,
            MagicResistanceText.some,
            Heroes.personHeroFearFactor,
            Heroes.personHeroEquipment,
            Heroes.personHeroInventory);
    }
    public createMagicianHero(): IAlive {
        return new Hero(
            Heroes.magicianHeroName,
            Heroes.magicianHeroLife,
            Heroes.magicianHeroStrength,
            Heroes.magicianHeroMagicResistance,
            MagicResistanceText.superb,
            Heroes.magicianHeroFearFactor,
            Heroes.magicianHeroEquipment,
            Heroes.magicianHeroInventory);
    }
}
