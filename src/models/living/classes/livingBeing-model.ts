import { IAlive } from './../interfaces/alive';
import { MagicResistanceText } from '../enums/magicResistance';

export abstract class LivingBeingModel implements IAlive {
    protected static _minStrength: number = 0;
    protected static _maxStrength: number = 300;
    protected static _minMagicResistance: number = 0;
    protected static _maxMagicResistance: number = 1;
    protected static _minFearFactor: number = 0;
    protected static _maxFearFactor: number = 1;
    private readonly _name: string;
    private _life: number;
    private readonly _maxlife: number;
    private  _strength: number; //between 0 and 300
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
    this._life = life;

    this.validateStrength(strength);
    this._strength = strength;

    this.validateMagicResistance(magicResistance);
    this._magicResistance = magicResistance;

    this._magicResistanceText = magicResistanceText;

    this.validateFearFactor(fearFactor);
    this._fearFactor = fearFactor;
}
public get name(): string {
    return this._name;
  }
  public get life(): number {
    return this._life;
  }
  public set life(newLife: number) {
    this._life = newLife;
  }
  public get strength(): number {
    return this._strength;
  }
  public set strength(newStrength: number) {
    this._strength = newStrength;
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
  public abstract say(): string;

  protected validateStrength(strength: number): void {
    if (strength < LivingBeingModel._minStrength || strength > LivingBeingModel._maxStrength) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minStrength} strength
        or more than ${LivingBeingModel._maxStrength} strength.`
      );
    }
  }
  protected validateMagicResistance(magicResistance: number): void {
    if (magicResistance < LivingBeingModel._minMagicResistance || magicResistance > LivingBeingModel._maxMagicResistance) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minMagicResistance} magic resistance
        or more than ${LivingBeingModel._maxMagicResistance} magic resistance.`
      );
    }
  }

  protected validateFearFactor(fearFactor: number): void {
    if (fearFactor < LivingBeingModel._minFearFactor || fearFactor > LivingBeingModel._maxFearFactor) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minFearFactor} fear factor
        or more than ${LivingBeingModel._maxFearFactor} fear factor.`
      );
    }
  }
}
