import { CollectionNames } from './collection-names';
import { IdatabaseWriter } from './interfaces/db-writer';
import { IdatabaseReader } from './interfaces/db-reader';
import { inject, injectable } from 'inversify';
import { IDbService } from './interfaces/db-service';
@injectable()
export class DbService implements IDbService {

    private readonly _reader: IdatabaseReader;
    private readonly _writer: IdatabaseWriter;

    constructor(@inject('database-reader') dbReader: IdatabaseReader) {
        this._reader = dbReader;
    }
    public  getCollectionsKeys(collectionName: CollectionNames): string[] {
        return this._reader.getCollectionsKeys(collectionName);
    }
    public readByKey(collectionName: CollectionNames, key: string): Object {
        return this._reader.readByKey(collectionName, key);
    }

    public write(collectionName: CollectionNames, key: string, value: Object): void {
        throw new Error('Method not implemented.');
    }

}
