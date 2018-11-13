import { IFactory } from './hero-factory-interface';
import { IHeroData } from '../core/namespaces/IHeroData';
import { Ihero } from '../models/living/interfaces/hero';
import { MagicResistanceText } from '../models/living/enums/magicResistance';
import { Hero } from '../models/living/classes/hero';
import { inject } from 'inversify';
import { HeroesData } from '../core/namespaces/heroes';

export class Factory implements IFactory {
     private heroesData: IHeroData;
    constructor() {
        this.heroesData = new HeroesData();
    }
    public createHero(name: string): Ihero {
        const heroData: Ihero = this.heroesData.getHeroData(name);

        return new Hero(heroData.name, heroData.life, heroData.strength, heroData.magicResistance,
                        MagicResistanceText.medium, heroData.fearFactor, heroData.equipment, heroData.inventory);
    }
}
