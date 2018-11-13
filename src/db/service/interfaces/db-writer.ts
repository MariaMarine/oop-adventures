import { CollectionNames } from '../collection-names';

export interface IdatabaseWriter {
    write(dbname: CollectionNames, key: string, value: Object): void;
}
