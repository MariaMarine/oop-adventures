import { IMazePrinter } from './UI/interfaces/maze-printer';
import { IMap } from './../models/non-living/interfaces/map';
import { MazeDashPrinter } from './UI/maze-printer';
import { inject, injectable } from 'inversify';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { PromptLoop } from './UI/promptLoop';
import * as fs from 'fs';
import { MainEngine } from './engine';
import { Maze } from '../factory/maze-generator';
import { MazeCell } from '../models/non-living/classes/maze-cell';
import { constants } from 'os';
import { Constants } from './namespaces/constants';
import { container } from '../ioc-config/ioc.config';
@injectable()
export class Init {
    private readonly promptLoop: PromptLoop;
    private readonly sessionDataService: IsessionDataService;
    private readonly engine: MainEngine;
    public constructor(@inject('prompt-loop') promptLoop: PromptLoop,
                       @inject('session-data') sessionDataService: IsessionDataService,
                       @inject('main-engine') engine: MainEngine) {
        this.sessionDataService = sessionDataService;
        this.promptLoop = promptLoop;
        this.engine = engine;
    }
    public initialize(): void {
        //   const userName: string = this.promptLoop.setName();
        // this.sessionDataService.write('username', userName);
        //   this.promptLoop.multiple(['Choose direction', 'Invalid direction'], ['North', 'South', 'East', 'West']);
        //  const difficulty: string = this.promptLoop.multiple(['Choose difficulty'], ['easy', 'intermediate', 'hard']);
        // here we will generate the map, but for now we use the test map
        // this.sessionDataService.write('map', JSON.parse(fs.readFileSync(__dirname.concat('/test-map.json'), 'UTF-8')));
        const randomMaze: Maze = new Maze(Constants.gameRows, Constants.gameCols, container.get<MazeDashPrinter>('maze-printer'));
        this.sessionDataService.write('map', randomMaze.maze);
        randomMaze.printer.visualize(randomMaze.maze, Constants.gameCols, Constants.gameRows);
        this.engine.start();
    }

}
