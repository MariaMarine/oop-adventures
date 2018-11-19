// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { FileReader } from '../../db/service/implementations/file-reader';
import { IdatabaseReader } from '../../db/service/interfaces/db-reader';
import { CollectionNames } from '../../db/service/collection-names';

describe('File reader should', () => {
    describe('Read By Key should', () => {
        it('Not throw error when passed valid input', () => {

            // Arrange
            const reader: IdatabaseReader = new FileReader();

            // Act&&Assert
            expect(() => reader.readByKey(CollectionNames.heroes, 'Gandalf')).not.toThrowError();
            expect(() => reader.readByKey(CollectionNames.heroes, 'Atalanta')).not.toThrowError();
            expect(() => reader.readByKey(CollectionNames.heroes, 'Arthur')).not.toThrowError();
        });
        it('To throw error when invalid data is passed', () => {

            // Arrange
            const reader: IdatabaseReader = new FileReader();

            // Act&& Assert
            expect(() => reader.readByKey(CollectionNames.heroes, 'Arthur1')).toThrowError();
        });
        it('To have been called the expected amount of times', () => {

            // Arrange
            const reader: IdatabaseReader = new FileReader();
            const spy: jest.SpyInstance = jest.spyOn(reader, 'readByKey');

            // Act

            reader.readByKey(CollectionNames.nonHeroes, 'Humanoid');
            reader.readByKey(CollectionNames.heroes, 'Arthur');
            reader.readByKey(CollectionNames.heroes, 'Atalanta');

            // Assert
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });
    describe('getCollectionKeys should', () => {
        it('Not throw error when passed valid input', () => {

            // Arrange
            const reader: IdatabaseReader = new FileReader();

            // Act&&Assert
            expect(() => reader.getCollectionsKeys(CollectionNames.heroes)).not.toThrowError();
        });
        it('To have been called the expected amount of times', () => {

            // Arrange
            const reader: IdatabaseReader = new FileReader();
            const spy: jest.SpyInstance = jest.spyOn(reader, 'getCollectionsKeys');

            // Act

            reader.getCollectionsKeys(CollectionNames.nonHeroes);
            reader.getCollectionsKeys(CollectionNames.heroes);

            // Assert
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
