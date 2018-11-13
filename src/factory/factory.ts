import { IFactory } from './hero-factory-interface';
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

@injectable()
export class Factory implements IFactory {
    private dbService: IDbService;
    constructor(@inject('database-service') dbService: IDbService) {
        this.dbService = dbService;
    }

    public createHero(name: string): Ihero {
        const heroData: Ihero = <Ihero>this.dbService.readByKey(CollectionNames.heroes, name);
        const heroInventory: IInventory = new Inventory(1,
                                                        heroData.inventory.weapons,
                                                        heroData.inventory.armour,
                                                        heroData.inventory.potions,
                                                        heroData.inventory.coins);
        const heroEquipment: IEquipment = new Equipment(heroData.equipment.weapon, heroData.equipment.armour);

        return new Hero(heroData.name, heroData.info, heroData.life, heroData.strength, heroData.magicResistance,
                        MagicResistanceText.medium, heroData.fearFactor, heroEquipment, heroInventory);
    }
}
