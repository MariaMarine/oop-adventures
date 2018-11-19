import { IPotion } from './../../../src/models/non-living/interfaces/potion';
// tslint:disable-next-line
import 'reflect-metadata';
import { Potion } from '../../../src/models/non-living/classes/potion';
describe ('Potion', () => {
    describe ('constructor should', () => {
        it ('correctly assign passed values', () => {
            // Arrange
            const mockPotion: IPotion = new Potion(1, 50, 15, 'Red');

            // Assert
            expect(mockPotion.name).toBe('Red');
            expect(mockPotion.power).toBe(50);
            expect(mockPotion.price).toBe(15);
        });
        it ('throw Error when difficultyCoef value is a negative number.', () => {
            // Arrange
            // Act & Assert
            expect(() => (new Potion(-1, 50, 15, 'Red'))).toThrow('Difficulty coefficient must be a positive number!');
        });
    });
});
