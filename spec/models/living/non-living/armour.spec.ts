import { Armour } from './../../../../src/models/non-living/classes/armour';
import { IArmour } from '../../../../src/models/non-living/interfaces/armour';

describe (`Armour`, () => {
    describe ('name should', () => {
        it ('not throw when the passed value is valid', () => {
            // Arrange
            const testArmour: IArmour = new Armour(1, 100, 99, 44, 'Dented Armour');
            // Act & Assert
            expect(() => (testArmour.name = 'Repaired armour')).not.toThrow();
        });
        it (`correctly assign passed value`, () => {
            // Arrange
            const testArmour: IArmour = new Armour(1, 100, 99, 44, 'Dented Armour');
            // Act
            testArmour.name = 'Repaired armour';
            // Assert
            expect(testArmour.name).toBe('Repaired armour');
        });
        it (`throw Error when passed value is invalid.`, () => {
            // Arrange
            const testArmour: IArmour = new Armour(1, 100, 99, 44, 'Dented Armour');

            // Act & Assert
            expect(() => (testArmour.name = 'УФ')).toThrow('Name must contain at least 3 characters!');
        });
    });
});
