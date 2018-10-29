import { MagicResistanceText } from "../enums/magicResistance";

export interface Ialive {
    name: string;
    life: number; //between 0 and 1000
    strength: number; //between 0 and 300
    magicResistance: number; //betweeen 0 and 1
    magicResistanceText: MagicResistanceText;
    fearFactor: number; // between 0 and 1
}

//left out the "say()" method for Creature interface. humanoids may have "talk()"
