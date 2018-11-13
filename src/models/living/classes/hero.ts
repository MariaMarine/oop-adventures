import { IPerson } from './../interfaces/person';
import { IEquipment } from '../../non-living/interfaces/equipment';
import { IInventory } from '../../non-living/interfaces/inventory';
import { IAlive } from '../interfaces/alive';
import { MagicResistanceText } from '../enums/magicResistance';
import { LivingBeingModel } from './livingBeing-model';
import { Ihero } from '../interfaces/hero';
export class Hero extends LivingBeingModel implements IPerson, IAlive, Ihero {
    private readonly _equipment: IEquipment;
    private readonly _inventory: IInventory;

    public constructor(
    name: string,
    life: number,
    strength: number,
    magicResistance: number,
    magicResistanceText: MagicResistanceText,
    fearFactor: number,
    equipment: IEquipment,
    inventory: IInventory) {
        super(name, life, strength, magicResistance, magicResistanceText, fearFactor);
        this._equipment = equipment;
        this._inventory = inventory;
    }

    public get equipment(): IEquipment {
        return this._equipment;
    }
    public get inventory(): IInventory {
        return this._inventory;
    }

    // To implement say()
    public say(): string {
        return ('Hello');
      }

}
