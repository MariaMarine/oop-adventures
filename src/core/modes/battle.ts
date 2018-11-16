import { inject } from 'inversify';
import { PromptLoop } from '../UI/promptLoop';
import { Ihero } from '../../models/living/interfaces/hero';

export class Battle {
    private promptLoop: PromptLoop;
    constructor(@inject('prompt-loop') promptLoop: PromptLoop) {
        this.promptLoop = promptLoop;
    }

    public start(hero, enemy):Ihero{

    }
    
}