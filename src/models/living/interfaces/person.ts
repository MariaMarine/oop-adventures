import { IInventory } from '../../non-living/interfaces/inventory';
import { IEquipment } from '../../non-living/interfaces/equipment';
import { Ialive } from './alive';

export interface Iperson extends Ialive {
    equipment: IEquipment;
    inventory: IInventory;
}
