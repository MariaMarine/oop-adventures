// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Init } from './core/init';
import { Ireader } from './core/UI/interfaces/reader';
import { Iwriter } from './core/UI/interfaces/writer';
import { ConsoleReader } from './core/UI/readers/console-reader';
import { ConsoleWriter } from './core/UI/writers/console-writer';
import { LocalStorageService } from './session-data-service/implementations/local-storage-service';
import { IsessionDataService } from './session-data-service/interfaces/sessionDataService';

// Write your code here

console.log(__dirname);

const writer: Iwriter = new ConsoleWriter();
const reader: Ireader = new ConsoleReader();
const sessionDataService: IsessionDataService = new LocalStorageService();
const init: Init = new Init(writer, reader, sessionDataService);

init.initialize();
