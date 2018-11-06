import { IInventory } from '../../non-living/interfaces/inventory';
import { IEquipment } from '../../non-living/interfaces/equipment';
import { IAlive } from './alive';
export interface IPerson extends IAlive {
    equipment: IEquipment;
    inventory: IInventory;
}
