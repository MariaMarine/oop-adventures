import { LivingBeingModel } from './livingBeing-model';
import { IAlive } from '../interfaces/alive';
import { Randomizer } from '../../../factory/randomizer';

export class NonHero extends LivingBeingModel implements IAlive {
    private sayStrings: string[];
    private _nonHeroType: string;
    public constructor(
        nonHeroType: string,
        name: string,
        life: number,
        strength: number,
        magicResistance: number,
        sayStrings: string[],
        fearFactor: number,
        isMagical: boolean,
        magicStrings?: string[]
        ) {
            super(name, life, strength, magicResistance, fearFactor, isMagical, magicStrings);
            this.sayStrings = sayStrings;
            this._nonHeroType = nonHeroType;
        }
        public get nonHeroType(): string {
            return this._nonHeroType;
        }
    // To implement say()
    public say(): string {
            return Randomizer.GETRANDOMARRAYELEMENT(this.sayStrings);
          }
}
