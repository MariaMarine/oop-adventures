import { IInventory } from './../../non-living/interfaces/inventory';
import { IEquipment } from './../../non-living/interfaces/equipment';
export interface Ihero {
    name: string;
    life: number;
    strength: number;
    magicResistance: number;
    fearFactor: number;
    equipment: IEquipment;
    inventory: IInventory;
    info: string;
    isMagical: boolean;
    magicStrings: string[];
}
