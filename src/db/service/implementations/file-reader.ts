import * as path from 'path';
import * as fs from 'fs';
import { IdatabaseReader } from '../interfaces/db-reader';
import { CollectionNames } from '../collection-names';
import { injectable } from 'inversify';
@injectable()
export class FileReader implements IdatabaseReader {

    public readByKey(dbname: CollectionNames, key: string): Object {

        const truePath: string = path.resolve(__dirname, '../..', dbname);
        const data: Object = JSON.parse(fs.readFileSync(`${truePath}.json`, 'UTF-8'))[key];

        if (data) {
            return data;
        } else {
            throw new Error('Data not found');
        }

    }
    public getCollectionsKeys(dbname: CollectionNames): string[] {
        const truePath: string = path.resolve(__dirname, '../..', dbname);

        return Object.keys(JSON.parse(fs.readFileSync(`${truePath}.json`, 'UTF-8')));
    }

}
