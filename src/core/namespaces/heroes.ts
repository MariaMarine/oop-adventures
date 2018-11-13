import { IHeroData } from './IHeroData';
import { Equipment } from './../../models/non-living/classes/equipment';
import { Weapon } from '../../models/non-living/classes/weapon';
import { Armour } from '../../models/non-living/classes/armour';
import { Inventory } from '../../models/non-living/classes/inventory';
import { Ihero } from '../../models/living/interfaces/hero';
import { inject, injectable } from 'inversify';

@injectable()
export class HeroesData implements IHeroData {

    private readonly heroes: Map<string, Ihero> = new Map();
    public constructor() {
        this.heroes.set('Arthur', {
            name : 'Arthur',
            life: 100,
            strength: 100,
            magicResistance: 0.5,
            fearFactor: 1,
            equipment: new Equipment(new Weapon(10, true, 1, 10, 15, 'Rusty Knife'),
                                     new Armour (1, 20, 50, 70, 'Average Overpriced Armour')),
            inventory: new Inventory (3, [new Weapon(10, true, 1, 10, 15, 'Rusty Knife')],
                                      [new Armour (1, 20, 50, 70, 'Average Overpriced Armour')])
        });
        this.heroes.set('Gandalf', {
            name : 'Gandalf',
            life: 100,
            strength: 100,
            magicResistance: 0.5,
            fearFactor: 1,
            equipment: new Equipment(new Weapon(10, true, 1, 10, 15, 'Rusty Knife'),
                                     new Armour (1, 20, 50, 70, 'Average Overpriced Armour')),
            inventory: new Inventory (3, [new Weapon(10, true, 1, 10, 15, 'Rusty Knife')],
                                      [new Armour (1, 20, 50, 70, 'Average Overpriced Armour')])
        });
    }

    public getHeroData(name: string): Ihero {
         return <Ihero>this.heroes.get(name);
    }

}
