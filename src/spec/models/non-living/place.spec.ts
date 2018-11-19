// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Place } from '../../../models/non-living/classes/place';
import { Inventory } from '../../../models/non-living/classes/inventory';
import { IPlace } from '../../../models/non-living/interfaces/place';
jest.mock('../../../models/non-living/classes/inventory');

describe('Place should', () => {
    let place: IPlace;
    beforeEach(() => {
        place = new Place(1, true, 'end', new Inventory(1));
    });
    describe('constructur should', () => {
        it('correctly assign passed values', () => {
            // Assert
            expect(place.containsCreature).toBe(true);
            expect(place.introText).toBe(`You enter end.`);
        });
    });
    describe('introText should', () => {
        it('return next visit text if visited is true', () => {
            // Arrange
            place.visited = false;
            // Act&&Assert
            expect(place.introText).toBe(`You enter end.`);
        });
        it('return intro text if visited is false', () => {
            // Arrange
            place.visited = true;
            // Act&&Assert
            expect(place.introText).toBe(`You are back to end.`);
        });
    });
});
