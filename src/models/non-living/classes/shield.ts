import { Armour } from './armour';

export class Shield extends Armour {

    public constructor(diffCoef: number, physicalResistance: number, magicalResistance: number, price: number, name: string) {
        super(diffCoef, physicalResistance, magicalResistance, price, name);
    }
}
