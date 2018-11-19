// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { IArmour } from '../../../models/non-living/interfaces/armour';
import { Armour } from '../../../models/non-living/classes/armour';

describe('Armour should', () => {
    describe('constructor should', () => {
        it('correctly assign passed values', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'hah');

            // Assert
            expect(armour.price).toBe(1);
            expect(armour.magicalResistance).toBe(1);
            expect(armour.physicalResistance).toBe(1);
            expect(armour.name).toBe('hah');
        });
        it('throw error if diff coef is invalid', () => {
            // Arrange&Assert
            expect(() => (new Armour(-1, 1, 1, 1, 'hah'))).toThrowError();
        });
    });
    describe('physical resistanse should', () => {
        it('throw error if passed value is negative', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.physicalResistance = -1)).toThrowError();
        });
        it('not throw error if passed value is non-negative', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.physicalResistance = 1)).not.toThrowError();
        });
    });
    describe('magical resistanse should', () => {
        it('throw error if passed value is negative', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.magicalResistance = -1)).toThrowError();
        });
        it('not throw error if passed value is non-negative', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.magicalResistance = 1)).not.toThrowError();
        });
    });
    describe('name resistanse should', () => {
        it('throw error if passed value`s length is < 3', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.name = 'da')).toThrowError();
        });
        it('not throw error if passed value`s length is > 2', () => {
            // Arrange
            const armour: IArmour = new Armour(1, 1, 1, 1, 'haha');
            // Act && Assert
            expect(() => (armour.name = 'dada')).not.toThrowError();
        });
    });
});