
import { Ihero } from '../models/living/interfaces/hero';
import { MagicResistanceText } from '../models/living/enums/magicResistance';
import { Hero } from '../models/living/classes/hero';
import { inject, injectable } from 'inversify';
import { CollectionNames } from '../db/service/collection-names';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Inventory } from '../models/non-living/classes/inventory';
import { Equipment } from '../models/non-living/classes/equipment';
import { IEquipment } from '../models/non-living/interfaces/equipment';
import { IDbService } from '../db/service/interfaces/db-service';
import { IAlive } from '../models/living/interfaces/alive';
import { NonHero } from '../models/living/classes/non-hero';
import { Ifactory } from './interface/Ifactory';
import { Randomizer } from './randomizer';
import { Constants } from '../core/constants/constants';

@injectable()
export class Factory implements Ifactory {
    private dbService: IDbService;
    private readonly nonHeroTypes: string[] = ['Trader', 'Creature', 'Humanoid'];

constructor(@inject('database-service') dbService: IDbService) {
    this.dbService = dbService;
}

    public createHero(name: string): Ihero {
    const heroData: Ihero = <Ihero>this.dbService.readByKey(CollectionNames.heroes, name);
    const heroInventory: IInventory = new Inventory(1);
    heroInventory.addPotion(heroData.inventory.potions[0]);
    const heroEquipment: IEquipment = new Equipment(heroData.equipment.weapon, heroData.equipment.armour);

    return new Hero(heroData.name, heroData.info, heroData.life, heroData.strength, heroData.magicResistance,
                    MagicResistanceText.medium, heroData.fearFactor, heroEquipment, heroInventory);
}

    public createNonHero(difficultyCoef: number): IAlive {
    const nonHeroType: string = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroTypes);
    const nonHeroNames: string[] = <string[]>this.dbService.readByKey(CollectionNames.nonHeroes, nonHeroType);

    const nonHeroName: string = Randomizer.GETRANDOMARRAYELEMENT(nonHeroNames);

    const randomCoef: number = Randomizer.GENERATERANDOMNUMBER(10) / 10;
    const nonHeroLife: number = difficultyCoef * randomCoef * Constants.baseLife;
    const nonHeroStrength: number = difficultyCoef * randomCoef * Constants.baseStrength;
    const nonHeroMagicResistance: number = difficultyCoef * randomCoef * Constants.baseMagicResistance;
    const fearFactor: number = 0.5;

    return new NonHero(nonHeroName, nonHeroLife, nonHeroStrength, nonHeroMagicResistance, fearFactor);
}
}
