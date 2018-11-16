import { inject } from "inversify";
import { PromptLoop } from "../UI/promptLoop";

export class Battle {
    private promptLoop: PromptLoop;
    constructor(@inject('prompt-loop') promptLoop: PromptLoop) {
        this.promptLoop = promptLoop;
    }

    
}