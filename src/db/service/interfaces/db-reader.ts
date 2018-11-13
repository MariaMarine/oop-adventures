import { CollectionNames } from '../collection-names';

export interface IdatabaseReader {
    readByKey(dbname: CollectionNames, key?: string): Object;
    getCollectionsKeys(dbname: CollectionNames): string[];
}
