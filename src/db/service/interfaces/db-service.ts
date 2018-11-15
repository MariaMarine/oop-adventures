import { IdatabaseReader } from './db-reader';
import { IdatabaseWriter } from './db-writer';

export interface IDbService extends IdatabaseReader, IdatabaseWriter {

}
