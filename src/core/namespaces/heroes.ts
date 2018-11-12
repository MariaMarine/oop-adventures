import { Equipment } from './../../models/non-living/classes/equipment';
import { IEquipment } from './../../models/non-living/interfaces/equipment';
import { IWeapon } from './../../models/non-living/interfaces/weapon';
import { Weapon } from '../../models/non-living/classes/weapon';
import { IArmour } from '../../models/non-living/interfaces/armour';
import { Armour } from '../../models/non-living/classes/armour';
import { IInventory } from '../../models/non-living/interfaces/inventory';
import { Inventory } from '../../models/non-living/classes/inventory';

export namespace Heroes {
    export const personHeroName: string = 'Arthur';
    export const personHeroLife: number = 100;
    export const personHeroStrength: number = 100;
    export const personHeroMagicResistance: number = 0.5;
    export const personHeroFearFactor: number = 1;
    export const personHeroWeapon: IWeapon = new Weapon(10, true, 1, 10, 15, 'Rusty Knife');
    export const personHeroArmour: IArmour = new Armour (1, 20, 50, 70, 'Average Overpriced Armour');
    export const personHeroEquipment: IEquipment = new Equipment(personHeroWeapon, personHeroArmour);
    export const personHeroInventory: IInventory = new Inventory (3, [personHeroWeapon], [personHeroArmour]);

    export const magicianHeroName: string = 'Gandalf';
    export const magicianHeroLife: number = 100;
    export const magicianHeroStrength: number = 100;
    export const magicianHeroMagicResistance: number = 0.9;
    export const magicianHeroFearFactor: number = 0.5;
    export const magicianHeroWeapon: IWeapon = new Weapon(10, true, 1, 10, 15, 'Magic wand');
    export const magicianHeroArmour: IArmour = new Armour (1, 20, 50, 70, 'Strong Cheep Armour');
    export const magicianHeroEquipment: IEquipment = new Equipment(magicianHeroWeapon, magicianHeroArmour);
    export const magicianHeroInventory: IInventory = new Inventory (3, [magicianHeroWeapon], [magicianHeroArmour]);

}
