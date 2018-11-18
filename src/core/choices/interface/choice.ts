export interface IChoice {
    names: string[];
    commandNotPossibleStrings: string[];
    isPossible: boolean;
    run(): void;
}
