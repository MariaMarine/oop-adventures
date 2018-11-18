export interface IAlive {
    name: string;
    life: number;
    strength: number;
    magicResistance: number;
    fearFactor: number;
    isMagical: boolean;
    say(): string;
}
