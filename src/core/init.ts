import { inject, injectable } from 'inversify';
import { IsessionDataService } from '../session-data-service/interfaces/sessionDataService';
import { PromptLoop } from './UI/promptLoop';

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

        const userName: string = this.promptLoop.setName();
        this.sessionDataService.write('username', userName);
        this.promptLoop.multiple(['Choose direction', 'Invalid direction', 'Please try again'], ['North', 'South', 'East', 'West']);
    }

}
