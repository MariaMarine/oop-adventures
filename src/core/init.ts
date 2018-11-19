import { MazeDashPrinter } from './UI/maze-printer';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { MainEngine } from './engine';
import { Maze } from '../ioc-config/maze-generator';
import { container } from '../ioc-config/ioc.config';
import { Constants } from './constants/constants';
import { Ihero } from '../models/living/interfaces/hero';
import { Ifactory } from '../factory/interface/Ifactory';
import { IRepository } from '../models/non-living/interfaces/repository';

@injectable()
export class Init {
    private readonly promptLoop: PromptLoop;
    private readonly engine: MainEngine;
    private readonly factory: Ifactory;
    private repository: IRepository;
    public constructor(@inject('repository') repository: IRepository,
                       @inject('factory') factory: Ifactory,
                       @inject('prompt-loop') promptLoop: PromptLoop,
                       @inject('main-engine') engine: MainEngine) {
        this.repository = repository;
        this.factory = factory;
        this.promptLoop = promptLoop;
        this.engine = engine;

    }
    public initialize(): void {
        this.repository.userName = this.promptLoop.setName();
        const randomMaze: Maze = new Maze(Constants.gameRows, Constants.gameCols, container.get<MazeDashPrinter>('maze-printer'));
        this.repository.map = randomMaze.maze;

        randomMaze.printer.visualize(randomMaze.maze, Constants.gameCols, Constants.gameRows);
        const hero: Ihero = this.promptLoop.chooseHero();
        this.repository.hero = this.factory.createHero(hero);

        this.engine.start();
    }

}
