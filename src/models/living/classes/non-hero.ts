import { MagicResistanceText } from '../enums/magicResistance';
import { LivingBeingModel } from './livingBeing-model';
import { IAlive } from '../interfaces/alive';

export class NonHero extends LivingBeingModel implements IAlive {
    public constructor(
        name: string,
        life: number,
        strength: number,
        magicResistance: number,
        magicResistanceText: MagicResistanceText,
        fearFactor: number) {
            super(name, life, strength, magicResistance, magicResistanceText, fearFactor);
        }
        // To implement say()
    public say(): string {
            return ('Hello');
          }
}
