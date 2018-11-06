import { Icommand } from './command';

export interface Idirection extends Icommand {
    xDirection: number;
    yDirection: number;
}
