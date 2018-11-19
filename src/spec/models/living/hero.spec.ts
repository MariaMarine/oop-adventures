// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Hero } from '../../../models/living/classes/hero';
import { Ihero } from '../../../models/living/interfaces/hero';
import { Equipment } from '../../../models/non-living/classes/equipment';
import { Inventory } from '../../../models/non-living/classes/inventory';
import { Weapon } from '../../../models/non-living/classes/weapon';
import { Armour } from '../../../models/non-living/classes/armour';
import { IWeapon } from '../../../models/non-living/interfaces/weapon';
import { IArmour } from '../../../models/non-living/interfaces/armour';
import { IEquipment } from '../../../models/non-living/interfaces/equipment';
import { IInventory } from '../../../models/non-living/interfaces/inventory';
jest.mock('../../../models/non-living/classes/weapon');
jest.mock('../../../models/non-living/classes/armour');
jest.mock('../../../models/non-living/classes/inventory');
jest.mock('../../../models/non-living/classes/equipment');
describe('Hero class should', () => {
    let testHero: Ihero;
    let mockWeapon: IWeapon;
    let mockArmour: IArmour;
    let mockEquipment: IEquipment;
    let mockInventory: IInventory;
    beforeEach(() => {
        mockWeapon = new Weapon(1, true, 50, 50, 50, 'Mock');
        mockArmour = new Armour(1, 50, 50, 50, 'Mock');
        mockEquipment = new Equipment(mockWeapon, mockArmour);
        mockInventory = new Inventory(1);
        testHero = new Hero('Lambada', 'He', 500, 50, 1, 1, mockEquipment, mockInventory, true);
    });
    describe('constructur should', () => {
        it('correctly assign passed values', () => {
            // Assert
            expect(testHero.info).toBe('He');
            expect(testHero.life).toBe(500);
            expect(testHero.strength).toBe(50);
            expect(testHero.name).toBe('Lambada');
            expect(testHero.magicResistance).toBe(1);
            expect(testHero.isMagical).toBe(true);
            expect(testHero.fearFactor).toBe(1);
        });
    });
    describe('temp magic boost should', () => {
        it('throw error if passed boost is below 0', () => {
            // Act&&Assert
            expect(() => (testHero.tempMagicBoost = -1)).toThrowError();
        });
        it('not throw error if passed value is valid', () => {
            // Act&&Assert
            expect(() => (testHero.tempMagicBoost = 1)).not.toThrowError();
        });
    });
    describe('temp strength boost should', () => {
        it('throw error if passed boost is below 0', () => {
            // Act&&Assert
            expect(() => (testHero.tempStrengthBoost = -1)).toThrowError();
        });
        it('not throw error if passed value is valid', () => {
            // Act&&Assert
            expect(() => (testHero.tempStrengthBoost = 1)).not.toThrowError();
        });
    });
});
