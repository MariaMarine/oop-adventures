import { Choice } from '../choice';
import { injectable } from 'inversify';
import { IPotion } from '../../../../models/non-living/interfaces/potion';
import { PotionType } from '../../../../models/non-living/enums/potionTypes';

@injectable()
export class DrinkPotion extends Choice {
    public constructor() {
        super(['potion', 'drink'], ['No potions', 'Can`t do that if you have no potion']);
    }
    public run(): void {
        const potionIndex: number = this.promptloop.choosePotion(this.repository.hero.inventory.potions);
        const potionToDrink: IPotion = this.repository.hero.inventory.removePotion(potionIndex);
        if (potionToDrink.name === PotionType[0]) {
            this.repository.hero.life += potionToDrink.power;
            this.writer.write(`You boost your life by ${potionToDrink.power} which is now ${this.repository.hero.life}`);
        }
        if (potionToDrink.name === PotionType[1]) {
         //   this.tempMagicBoost = potionToDrink.power;
            this.writer.write(`You temporarily boost your magic power by ${potionToDrink.power}`);
        }
        if (potionToDrink.name === PotionType[2]) {
          //  this.tempStrengthBoost = potionToDrink.power;
            this.writer.write(`You temporarily boost your strength by ${potionToDrink.power}`);
        }
        this.writer.write(`Drank postion ${potionToDrink.name} successfully`, '\x1b[34m');
    }
}
