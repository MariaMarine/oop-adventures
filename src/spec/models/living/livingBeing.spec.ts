import { IAlive } from './../../../models/living/interfaces/alive';
// tslint:disable-next-line
import 'reflect-metadata';
import { LivingBeingMock } from './livingBeing.mock';

describe('LivingBeing', () => {
    describe('constructor should', () => {
        it('correctly assign passed values', () => {
            // Arrange & Act
            const livingBeing: IAlive = new LivingBeingMock('name', 100, 100, 100, 150);
            // Assert
            expect(livingBeing.name).toBe('name');
            expect(livingBeing.life).toBe(100);
            expect(livingBeing.strength).toBe(100);
            expect(livingBeing.magicResistance).toBe(100);
            expect(livingBeing.fearFactor).toBe(150);
        });
    });
    describe('validateStrength should:', () => {
        it('throw an error if strength is below 0', () => {
            expect(() => new LivingBeingMock('name', 100, -1, 100, 150))
              .toThrow(`A living-being cannot have less than 0 strength or more than 3000 strength.`);
        });
        it('throw an error if strength is above 3000', () => {
            expect(() => new LivingBeingMock('name', 100, 3200, 100, 150))
              .toThrow(`A living-being cannot have less than 0 strength or more than 3000 strength.`);
        });
    });
    describe('validateMagicResistance should:', () => {
        it('throw an error if magic resistance is below 0', () => {
            expect(() => new LivingBeingMock('name', 100, 100, -1, 150))
              .toThrow(`A living-being cannot have less than 0 magic resistance or more than 1000 magic resistance.`);
        });
        it('throw an error if magic resistance is above 1000', () => {
            expect(() => new LivingBeingMock('name', 100, 100, 1200, 150))
              .toThrow(`A living-being cannot have less than 0 magic resistance or more than 1000 magic resistance.`);
        });
    });

    describe('validateFearFactor should:', () => {
        it('throw an error if fear factor is below 0', () => {
            expect(() => new LivingBeingMock('name', 100, 100, 100, -1))
              .toThrow(`A living-being cannot have less than 0 fear factor or more than 1000 fear factor.`);
        });
        it('throw an error if fear factor is above 1000', () => {
            expect(() => new LivingBeingMock('name', 100, 100, 100, 1200))
              .toThrow(`A living-being cannot have less than 0 fear factor or more than 1000 fear factor.`);
        });
    });
});
