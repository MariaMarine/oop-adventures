import { MagicResistanceText } from '../enums/magicResistance';

export interface Ialive {
    name: string;
    life: number;
    strength: number;
    magicResistance: number;
    magicResistanceText: MagicResistanceText;
    fearFactor: number;
    say(): string;
}
