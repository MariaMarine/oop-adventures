import { IPerson } from './../interfaces/person';
import { IEquipment } from '../../non-living/interfaces/equipment';
import { IInventory } from '../../non-living/interfaces/inventory';
import { IAlive } from '../interfaces/alive';
import { LivingBeingModel } from './livingBeing-model';
import { Ihero } from '../interfaces/hero';
export class Hero extends LivingBeingModel implements IPerson, IAlive, Ihero {
    private readonly _equipment: IEquipment;
    private readonly _inventory: IInventory;
    private readonly _info: string;
    public constructor(
        name: string,
        info: string,
        life: number,
        strength: number,
        magicResistance: number,
        fearFactor: number,
        equipment: IEquipment,
        inventory: IInventory,
        isMagical: boolean,
        magicStrings?: string[]
        ) {
        super(name, life, strength, magicResistance, fearFactor, isMagical, magicStrings);
        this._equipment = equipment;
        this._inventory = inventory;
    }
    public get info(): string {
        return this._info;
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
