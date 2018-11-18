import { Weapon } from './../../../../src/models/non-living/classes/weapon';
import { Armour } from './../../../../src/models/non-living/classes/armour';
import { IInventory } from './../../../../src/models/non-living/interfaces/inventory';
import { Inventory } from '../../../../src/models/non-living/classes/inventory';
import { Potion } from '../../../../src/models/non-living/classes/potion';
import { IPotion } from '../../../../src/models/non-living/interfaces/potion';

describe (`Inventory`, () => {
    describe (`SubtractCoins() should`, () => {
        it('throw Error when passed coin value is larger than available coins', () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);

            // Act & Assert
            expect(() => testInventory.subtractCoins(42)).toThrow(`Insufficient amount of coins!`);
        });
        it('throw Error when passed value is invalid', () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);

            // Act & Assert
            expect(() => testInventory.subtractCoins(-1)).toThrow(`Not a valid amount of coins to remove!`);
        });
    });
    describe(`addPotion() should`, () => {
        it(`correctly add a potion to inventory`, () => {
        // Arrange
        const testInventory: IInventory = new Inventory(1);
        const testPotion: IPotion = new Potion(1, 666, 777, 'Potion of Invisibility');

        // Act
        testInventory.addPotion(testPotion);

        // Assert
        expect(testInventory.potions[0]).toEqual(testPotion);
        });
    });
    describe(`removeAll() should`, () => {
        it (`it remove all items and coins from current inventory`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);
            testInventory.addArmour(new Armour(1, 10, 10, 10, 'Dented Armour'));
            testInventory.addWeapon(new Weapon(1, true, 10, 10, 10, 'Bent Sword'));
            testInventory.addPotion(new Potion(1, 666, 777, 'Potion of Invisibility'));
            testInventory.addCoins(42);

            // Act
            testInventory.removeAll();

            // Assert
            expect(testInventory.armour.length).toBe(0);
            expect(testInventory.weapons.length).toBe(0);
            expect(testInventory.potions.length).toBe(0);
            expect(testInventory.coins).toBe(0);
        });
    });
    describe(`listitems() should`, () => {
        it(`return the correct result when there are no items in current inventory`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);

            // Act
            const result: string = testInventory.listItems();

            // Assert
            expect(result).toBe(`No items`);
        });
    });
});
