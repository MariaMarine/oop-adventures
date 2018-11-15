
import { Ihero } from '../models/living/interfaces/hero';
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
    private readonly nonHeroStrengthStrings: { names: string[]; fearFactor: number }[] = [];
    constructor(@inject('database-service') dbService: IDbService) {
        this.dbService = dbService;
        // tslint:disable-next-line:max-line-length
        const strengthStrings: Object[] = <Object[]>this.dbService.readByKey(CollectionNames.settings, 'Strengths');
        strengthStrings.forEach((strengthString: Object) => {
            this.nonHeroStrengthStrings.push(<{ names: string[]; fearFactor: number }>strengthString);
        });
    }

    public createHero(name: string): Ihero {
        const heroData: Ihero = <Ihero>this.dbService.readByKey(CollectionNames.heroes, name);
        const heroInventory: IInventory = new Inventory(1);
        heroInventory.addPotion(heroData.inventory.potions[0]);
        const heroEquipment: IEquipment = new Equipment(heroData.equipment.weapon, heroData.equipment.armour);

        return new Hero(heroData.name, heroData.info, heroData.life, heroData.strength, heroData.magicResistance,
                        heroData.fearFactor, heroEquipment, heroInventory);
    }

    public createNonHero(difficultyCoef: number): IAlive {
        const nonHeroType: string = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroTypes);
        const nonHeroes: Object[] = <Object[]>this.dbService.readByKey(CollectionNames.nonHeroes, nonHeroType);
        const nonHero: {
            name: string;
            sayStrings: string[];
        } = <{ name: string; sayStrings: string[] }>Randomizer.GETRANDOMARRAYELEMENT(nonHeroes);

        const nonHeroSayStrings: string[] = nonHero.sayStrings;
        let fearFactor: number = 0;
        let nonHeroStrengthString: string = '';
        if (difficultyCoef < 5) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[0].names);
            fearFactor = this.nonHeroStrengthStrings[0].fearFactor;
        }
        if (difficultyCoef > 5 && difficultyCoef < 8) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[1].names);
            fearFactor = this.nonHeroStrengthStrings[1].fearFactor;
        }
        if (difficultyCoef > 7) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[2].names);
            fearFactor = this.nonHeroStrengthStrings[2].fearFactor;
        }

        const nonHeroName: string = `${nonHeroStrengthString} ${nonHero.name}`;
        const randomCoef: number = Randomizer.GENERATERANDOMNUMBER(10) / 10;
        const nonHeroLife: number = difficultyCoef * randomCoef * Constants.baseLife;
        const nonHeroStrength: number = difficultyCoef * randomCoef * Constants.baseStrength;
        const nonHeroMagicResistance: number = difficultyCoef * randomCoef * Constants.baseMagicResistance;

        return new NonHero(nonHeroType, nonHeroName, nonHeroLife, nonHeroStrength, nonHeroMagicResistance, nonHeroSayStrings, fearFactor);
    }
}
