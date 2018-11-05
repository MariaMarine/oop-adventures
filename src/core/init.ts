import { inject, injectable } from 'inversify';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { PromptLoop } from './UI/promptLoop';
import * as fs from 'fs';
import * as path from 'path';
import { ENGINE_METHOD_ALL } from 'constants';
import { MainEngine } from './engine';
@injectable()
export class Init {
    private readonly promptLoop: PromptLoop;
    private readonly sessionDataService: IsessionDataService;

    public constructor(@inject('prompt-loop') promptLoop: PromptLoop,
                       @inject('local-data') sessionDataService: IsessionDataService) {
        this.sessionDataService = sessionDataService;
        this.promptLoop = promptLoop;
    }
    public initialize(): void {

        //   const userName: string = this.promptLoop.setName();
        // this.sessionDataService.write('username', userName);
        //   this.promptLoop.multiple(['Choose direction', 'Invalid direction'], ['North', 'South', 'East', 'West']);
        //  const difficulty: string = this.promptLoop.multiple(['Choose difficulty'], ['easy', 'intermediate', 'hard']);
        // here we will generate the map, but for now we use the test map
        this.sessionDataService.write('map', JSON.parse(fs.readFileSync(__dirname.concat('/test-map.json'), 'UTF-8')));
        MainEngine.START();
    }

}
