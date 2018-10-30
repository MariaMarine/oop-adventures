import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { Ireader } from './UI/interfaces/reader';
import { Iwriter } from './UI/interfaces/writer';

export class Init {
    private readonly writer: Iwriter;
    private readonly reader: Ireader;
    private readonly sessionDataService: IsessionDataService;
    public constructor(writer: Iwriter, reader: Ireader, sessionDataService: IsessionDataService) {
        if (!writer) {
            throw new Error('Invalid writer, please try again');
        }
        if (!reader) {
            throw new Error('Invalid reader, please try again');
        }
        this.sessionDataService =  sessionDataService;
        this.writer = writer;
        this.reader = reader;
    }

}
