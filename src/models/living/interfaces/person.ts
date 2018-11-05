import { IInventory } from '../../non-living/interfaces/inventory';
import { IEquipment } from '../../non-living/interfaces/equipment';

export interface Iperson {
    equipment: IEquipment;
    inventory: IInventory;
}
