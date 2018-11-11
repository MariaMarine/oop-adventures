import { MagicResistanceText } from '../models/living/enums/magicResistance';
import { IEquipment } from '../models/non-living/interfaces/equipment';
import { IInventory } from '../models/non-living/interfaces/inventory';
import { Hero } from '../models/living/classes/hero';
import { IAlive } from '../models/living/interfaces/alive';
import { Equipment } from '../models/non-living/classes/equipment';
import { Inventory } from '../models/non-living/classes/inventory';
import { Armour } from '../models/non-living/classes/armour';
import { Weapon } from '../models/non-living/classes/weapon';
import { IWeapon } from '../models/non-living/interfaces/weapon';

export class HeroFactory {
     public hero: IAlive = this.createPersonHero();

    public createPersonHero(): IAlive {

        const beginnerEquipment: IEquipment =
            new Equipment (new Weapon(10, true, 1, 10, 15, 'Rusty Knife'),
                           new Armour (1, 20, 50, 70, 'Average Overpriced Armour'));
        const rw: IWeapon = new Weapon(3);
        const loot: IInventory = new Inventory (3, [rw], [new Armour(3, 10, 10, 10, 'shd')]);

        return new Hero(
        'Arthur', 100, 100, 100, MagicResistanceText.strong, 0, beginnerEquipment, loot);
    }
    public createMagicianHero(): IAlive {

        const beginnerEquipment: IEquipment =
            new Equipment (new Weapon(30, true, 1, 10, 15, 'Magic wand'),
                           new Armour (1, 40, 50, 80, 'Strong Iron Armour'));
        const rw: IWeapon = new Weapon(3);
        const loot: IInventory = new Inventory (3, [rw], [new Armour(3, 10, 10, 10, 'shd')]);

        return new Hero('Sorcerer', 100, 100, 100, MagicResistanceText.medium, 100, beginnerEquipment, loot);
    }
}

