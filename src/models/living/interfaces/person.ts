import { IInventory } from '../../non-living/interfaces/inventory';
import { IEquipment } from '../../non-living/interfaces/equipment';

export interface IPerson {
    equipment: IEquipment;
    inventory: IInventory;
}
