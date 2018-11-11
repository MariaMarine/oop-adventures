// tslint:disable
import { IMazePrinter } from './../core/UI/interfaces/maze-printer';
import { Container } from 'inversify';
import { Iwriter } from '../core/UI/interfaces/writer';
import { Init } from './../core/init';
import { Ireader } from './../core/UI/interfaces/reader';
import { ConsoleReader } from './../core/UI/readers/console-reader';
import { ConsoleWriter } from './../core/UI/writers/console-writer';
import { LocalStorageService } from './../session-data-service/implementations/local-storage-service';
import { IsessionDataService } from './../session-data-service/interfaces/sessionDataService';
import { PromptLoop } from '../core/UI/promptLoop';
import { MainEngine } from '../core/engine';
import { MazeDashPrinter } from '../core/UI/maze-printer';
import { TYPES } from './types';

const container: Container = new Container();

container.bind<Init>(TYPES.init).to(Init);
container.bind<Iwriter>('ui-writer').to(ConsoleWriter);
container.bind<Ireader>('ui-reader').to(ConsoleReader);
container.bind<IsessionDataService>('session-data').to(LocalStorageService);
container.bind<PromptLoop>('prompt-loop').to(PromptLoop);
container.bind<MainEngine>('main-engine').to(MainEngine).inSingletonScope();
container.bind<IMazePrinter>('maze-printer').to(MazeDashPrinter);

export { container };
