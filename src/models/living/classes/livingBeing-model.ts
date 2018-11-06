import { IAlive } from './../interfaces/alive';
import { MagicResistanceText } from '../enums/magicResistance';

export abstract class LivingBeingModel implements IAlive {
    private readonly _name: string;
    private readonly _life: number;
    private readonly maxlife: number = 1000;
    private readonly _strength: number; //between 0 and 300
    private readonly _magicResistance: number; //betweeen 0 and 1
    private readonly _magicResistanceText: MagicResistanceText;
    private readonly _fearFactor: number; // between 0 and 1

    public constructor(
    name: string,
    life: number,
    strength: number,
    magicResistance: number,
    magicResistanceText: MagicResistanceText,
    fearFactor: number
) {
    this._name = name;
    if (this.life < this.maxlife) {
        this._life = life;
    } else {
        this._life = this.maxlife;
    }
    this._strength = strength;
    this._magicResistance = magicResistance;
    this._magicResistanceText = magicResistanceText;
    this._fearFactor = fearFactor;
}
public get name(): string {
    return this._name;
  }
  public get life(): number {
    return this._life;
  }
  public get strength(): number {
    return this._strength;
  }
  public get magicResistance(): number {
      return this._magicResistance;
  }
  public get magicResistanceText(): MagicResistanceText {
    return this._magicResistanceText;
}
public get fearFactor(): number {
    return this._fearFactor;
}
// To implement say()
public say(): string {
    return ('Hello');
  }

}
