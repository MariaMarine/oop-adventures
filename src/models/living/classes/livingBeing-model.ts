import { IAlive } from './../interfaces/alive';

export abstract class LivingBeingModel implements IAlive {
  protected static _minStrength: number = 0;
  protected static _maxStrength: number = 3000;
  protected static _minMagicResistance: number = 0;
  protected static _maxMagicResistance: number = 1000;
  protected static _minFearFactor: number = 0;
  protected static _maxFearFactor: number = 1000;
  private readonly _name: string;
  private _life: number;
  private readonly _maxlife: number;
  private _strength: number;
  private readonly _magicResistance: number;
  private readonly _fearFactor: number;
  private readonly _isMagical: boolean;
  private readonly _magicStrings: string[];
  public constructor(
    name: string,
    life: number,
    strength: number,
    magicResistance: number,
    fearFactor: number,
    isMagical: boolean,
    magicStrings?: string[]
  ) {
    this._name = name;
    this._life = life;
    this._maxlife = life;
    this.validateStrength(strength);
    this._strength = strength;

    this.validateMagicResistance(magicResistance);
    this._magicResistance = magicResistance;

    this.validateFearFactor(fearFactor);
    this._fearFactor = fearFactor;
    this._isMagical = isMagical;
    if (magicStrings) {
      this._magicStrings = magicStrings;
    }
  }
  public get name(): string {
    return this._name;
  }
  public get isMagical(): boolean {
    return this._isMagical;
  }
  public get magicStrings(): string[] {
    return this._magicStrings;
  }
  public get life(): number {
    return this._life;
  }
  public set life(newLife: number) {
    if (newLife > this.maxLife) {
      this.life = this._maxlife;
    } else {
      this._life = newLife;
    }

  }
  public get strength(): number {
    return this._strength;
  }
  public set strength(newStrength: number) {
    this._strength = newStrength;
  }
  public get magicResistance(): number {
    return this.magicResistance;
  }
  public get fearFactor(): number {
    return this.fearFactor;
  }
  public get maxLife(): number {
    return this._maxlife;
  }

  // To implement say()
  public abstract say(): string;

  protected validateStrength(strength: number): void {
    if (strength < LivingBeingModel._minStrength || strength > LivingBeingModel._maxStrength) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minStrength} strength \
or more than ${LivingBeingModel._maxStrength} strength.`
      );
    }
  }
  protected validateMagicResistance(magicResistance: number): void {
    if (magicResistance < LivingBeingModel._minMagicResistance || magicResistance > LivingBeingModel._maxMagicResistance) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minMagicResistance} magic resistance \
or more than ${LivingBeingModel._maxMagicResistance} magic resistance.`
      );
    }
  }

  protected validateFearFactor(fearFactor: number): void {
    if (fearFactor < LivingBeingModel._minFearFactor || fearFactor > LivingBeingModel._maxFearFactor) {
      throw new Error(
        `A living-being cannot have less than ${LivingBeingModel._minFearFactor} fear factor \
or more than ${LivingBeingModel._maxFearFactor} fear factor.`
      );
    }
  }
}
