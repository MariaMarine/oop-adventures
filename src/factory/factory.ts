
import { Ihero } from '../models/living/interfaces/hero';
import { Hero } from '../models/living/classes/hero';
import { inject, injectable } from 'inversify';
import { CollectionNames } from '../db/service/collection-names';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Inventory } from '../models/non-living/classes/inventory';
import { Equipment } from '../models/non-living/classes/equipment';
import { IEquipment } from '../models/non-living/interfaces/equipment';
import { IDbService } from '../db/service/interfaces/db-service';
import { NonHero } from '../models/living/classes/non-hero';
import { Ifactory } from './interface/Ifactory';
import { Randomizer } from './randomizer';
import { Constants } from '../core/constants/constants';
import { MagicType } from '../models/living/enums/magicType';

@injectable()
export class Factory implements Ifactory {
    private dbService: IDbService;
    private readonly nonHeroTypes: string[] = ['Humanoid', 'Trader', 'Creature', 'Creature'];
    private readonly nonHeroStrengthStrings: { names: string[]; fearFactor: number }[] = [];
    constructor(@inject('database-service') dbService: IDbService) {
        this.dbService = dbService;
        // tslint:disable-next-line:max-line-length
        const strengthStrings: Object[] = <Object[]>this.dbService.readByKey(CollectionNames.settings, 'Strengths');
        strengthStrings.forEach((strengthString: Object) => {
            this.nonHeroStrengthStrings.push(<{ names: string[]; fearFactor: number }>strengthString);
        });
    }

    public createHero(heroData: Ihero): Ihero {
        const heroInventory: IInventory = new Inventory(1);
        heroInventory.addPotion(heroData.inventory.potions[0]);
        const heroEquipment: IEquipment = new Equipment(heroData.equipment.weapon, heroData.equipment.armour);

        return new Hero(heroData.name, heroData.info, heroData.life, heroData.strength, heroData.magicResistance,
                        heroData.fearFactor, heroEquipment, heroInventory, heroData.isMagical, heroData.magicStrings || null);
    }

    public createNonHero(difficultyCoef: number): NonHero {
        const nonHeroType: string = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroTypes);
        const nonHeroes: Object[] = <Object[]>this.dbService.readByKey(CollectionNames.nonHeroes, nonHeroType);
        const nonHero: {
            name: string;
            sayStrings: string[];
        } = <{ name: string; sayStrings: string[] }>Randomizer.GETRANDOMARRAYELEMENT(nonHeroes);

        const nonHeroSayStrings: string[] = nonHero.sayStrings;
        let fearFactor: number = 0;
        let nonHeroStrengthString: string = '';
        const nonHeroInventory: IInventory =  Randomizer.GENERATETRADERINVENTORY(Math.sqrt(difficultyCoef));
        if (difficultyCoef < 3) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[0].names);
            fearFactor = this.nonHeroStrengthStrings[0].fearFactor;
        }
        if (difficultyCoef >= 3 && difficultyCoef < 6) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[1].names);
            fearFactor = this.nonHeroStrengthStrings[1].fearFactor;
        }
        if (difficultyCoef >= 6) {
            nonHeroStrengthString = Randomizer.GETRANDOMARRAYELEMENT(this.nonHeroStrengthStrings[2].names);
            fearFactor = this.nonHeroStrengthStrings[2].fearFactor;
        }
        let nonHeroName: string = '';
        if (nonHeroType !== 'Trader') {
            nonHeroName = `${nonHeroStrengthString} ${nonHero.name}`;
        } else {
            nonHeroName = nonHero.name;
        }

        const randomCoef: number = Math.cbrt(Randomizer.GENERATERANDOMNUMBER(4) + 1);
        const nonHeroLife: number = Math.floor(difficultyCoef * randomCoef * Constants.baseLife);
        const nonHeroStrength: number = Math.floor(difficultyCoef * randomCoef * Constants.baseStrength);
        const nonHeroMagicResistance: number = Math.floor(difficultyCoef * randomCoef * Constants.baseMagicResistance);
        const isMagical: boolean = false;
        const magicStrings: string[] = Array(Randomizer.GETRANDOMENUMOPTION(MagicType));

        return new NonHero(nonHeroType, nonHeroName, nonHeroLife, nonHeroStrength, nonHeroMagicResistance,
                           nonHeroSayStrings, fearFactor, nonHeroInventory, isMagical, magicStrings);
    }
}
