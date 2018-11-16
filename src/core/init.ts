import { MazeDashPrinter } from './UI/maze-printer';
import { inject, injectable } from 'inversify';
import { PromptLoop } from './UI/promptLoop';
import { MainEngine } from './engine';
import { Maze } from '../factory/maze-generator';

import { container } from '../ioc-config/ioc.config';
import { Constants } from './constants/constants';
import { MazeCell } from '../models/non-living/classes/maze-cell';
import { Ihero } from '../models/living/interfaces/hero';
import { Ifactory } from '../factory/interface/Ifactory';
import { Iwriter } from './UI/interfaces/writer';
@injectable()
export class Init {
    private readonly promptLoop: PromptLoop;
    private readonly engine: MainEngine;
    private readonly factory: Ifactory;
    private readonly writer: Iwriter;
    public constructor(@inject('ui-writer') writer: Iwriter,
                       @inject('factory') factory: Ifactory,
                       @inject('prompt-loop') promptLoop: PromptLoop,
                       @inject('main-engine') engine: MainEngine) {
        this.factory = factory;
        this.promptLoop = promptLoop;
        this.engine = engine;
        this.writer = writer;
    }
    public initialize(): void {
        const userName: string = this.promptLoop.setName();
        //  const difficulty: string = this.promptLoop.multiple(['Choose difficulty'], ['easy', 'intermediate', 'hard']);
        this.writer.write('Welcome to this wondrous OOP Adventure!\n');
        const hero: Ihero = this.promptLoop.chooseHero();
        const randomMaze: Maze = new Maze(Constants.gameRows, Constants.gameCols, container.get<MazeDashPrinter>('maze-printer'));
        const map: MazeCell[][] = randomMaze.maze;
        randomMaze.printer.visualize(randomMaze.maze, Constants.gameCols, Constants.gameRows);
        this.engine.start(map, hero, userName);
    }

}
