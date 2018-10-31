import { LocalStorageService } from './../session-data-service/implementations/local-storage-service';
import { IsessionDataService } from './../session-data-service/interfaces/sessionDataService';
import { SessionDataService } from './../session-data-service/session-data-service';
import { ConsoleReader } from './../core/UI/readers/console-reader';
import { Ireader } from './../core/UI/interfaces/reader';
import { ConsoleWriter } from './../core/UI/writers/console-writer';
import { Init } from './../core/init';
import { Container } from 'inversify';
import { Iwriter } from '../core/UI/interfaces/writer';

const container: Container = new Container();

container.bind<Init>('init').to(Init);
container.bind<Iwriter>('ui-writer').to(ConsoleWriter);
container.bind<Ireader>('ui-reader').to(ConsoleReader);
container.bind<IsessionDataService>('session-data').to(SessionDataService);
container.bind<IsessionDataService>('local-data').to(LocalStorageService).whenInjectedInto(SessionDataService);



export { container };
