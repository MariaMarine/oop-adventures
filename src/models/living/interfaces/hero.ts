import { IInventory } from './../../non-living/interfaces/inventory';
import { Inventory } from './../../non-living/classes/inventory';
import { IEquipment } from './../../non-living/interfaces/equipment';
export interface Ihero {
    name:string;
    life:number;
    strength:number; 
     magicResistance:number;
     fearFactor: number;
     equipment:IEquipment;
     inventory:IInventory;
     }
