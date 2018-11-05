import { Armour } from './armour';

export class Shield extends Armour {

    public constructor(physicalResistance?: number, magicalResistance?: number, price?: number, name?: string) {
        super(physicalResistance, magicalResistance, price, name);
    }
}
