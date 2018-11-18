import { IPotion } from './../../../src/models/non-living/interfaces/potion';
import { IInventory } from './../../../src/models/non-living/interfaces/inventory';
import { Armour } from './../../../src/models/non-living/classes/armour';
import { Weapon } from './../../../src/models/non-living/classes/weapon';
import { Potion } from './../../../src/models/non-living/classes/potion';
import { Inventory } from './../../../src/models/non-living/classes/inventory';
import { IWeapon } from '../../../src/models/non-living/interfaces/weapon';

describe (`Inventory`, () => {
    describe (`subtractCoins() should`, () => {
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
        it('correctly remove the amount of coins from current inventory when passed value is valid', () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);
            testInventory.addCoins(666);

            // Act
            testInventory.subtractCoins(66);

            // Assert
            expect(testInventory.coins).toBe(600);
        });
    });
    describe(`addPotion() should`, () => {
        it(`correctly add a potion to inventory`, () => {
        // Arrange
        const testInventory: IInventory = new Inventory(1);
        const testPotion: IPotion = new Potion(1, 666, 777, 'Potion of Invisibility');

        // Act
        testInventory.potions.push(testPotion);

        // Assert
        expect(testInventory.potions[0]).toEqual(testPotion);
        });
    });
    describe(`removeWeapon() should`, () => {
        it(`correctly return removed weapon`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);
            const weaponToAdd: IWeapon = new Weapon(1, true, 10, 10, 10, 'Bent Sword');
            testInventory.weapons.push(weaponToAdd);

            // Act
            const noobWeapon: IWeapon = testInventory.removeWeapon(0);

            // Assert
            expect(noobWeapon).toEqual(weaponToAdd);
        });
        it(`throw Error when weapon to remove index is not valid`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);

            // Act & Assert
            expect(() => testInventory.removeWeapon(-1)).toThrow();
        });
    });
    describe(`removeAll() should`, () => {
        it (`it remove all items from current inventory`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);
            testInventory.armour.push(new Armour(1, 10, 10, 10, 'Dented Armour'));
            testInventory.weapons.push(new Weapon(1, true, 10, 10, 10, 'Bent Sword'));
            testInventory.potions.push(new Potion(1, 666, 777, 'Potion of Invisibility'));

            // Act
            testInventory.removeAll();

            // Assert
            expect(testInventory.armour.length).toBe(0);
            expect(testInventory.weapons.length).toBe(0);
            expect(testInventory.potions.length).toBe(0);
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
        it(`return the correct result when there are some items in current inventory`, () => {
            // Arrange
            const testInventory: IInventory = new Inventory(1);
            const testPotion: IPotion = new Potion(1, 666, 777, 'Potion of Invisibility');
            testInventory.potions.push(testPotion);
            // Act
            const result: string = testInventory.listItems();

            // Assert
            expect(result).toContain(testPotion.name);
        });
    });
});
