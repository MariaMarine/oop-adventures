import { IMagical } from './../interfaces/magical';
import { IEquipment } from './../../non-living/interfaces/equipment';
import { IAlive } from '../interfaces/alive';
import { LivingBeingModel } from './livingBeing-model';
import { MagicResistanceText } from '../enums/magicResistance';
import { MagicType } from '../enums/magicType';
export class Enemy extends LivingBeingModel implements IAlive, IMagical {
    private readonly _equipment: IEquipment;
    private readonly _magicAttach: MagicType;

    public constructor(
        name: string,
        life: number,
        strength: number,
        magicResistance: number,
        fearFactor: number,
        equipment: IEquipment,
        magicAttach: MagicType
    ) {
            super(name, life, strength, magicResistance, fearFactor);
            this._equipment = equipment;
            this._magicAttach = magicAttach;
        }
        public get equipment(): IEquipment {
            return this._equipment;
        }
        public get magicAttach(): MagicType {
            return this._magicAttach;
        }
// To implement say()
    public say(): string {
            return ('Hello');
          }
}
