import { MagicResistanceText } from '../enums/magicResistance';

export interface IAlive {
    name: string;
    life: number;
    strength: number;
    magicResistance: number;
    fearFactor: number;
    say(): string;
}
