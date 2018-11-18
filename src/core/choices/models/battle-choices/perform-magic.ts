import { Choice } from '../choice';
import { injectable } from 'inversify';
import { Randomizer } from '../../../../factory/randomizer';
import { NonHero } from '../../../../models/living/classes/non-hero';

@injectable()
export class PerformMagic extends Choice {
    public constructor() {
        super(['magic', 'cast'], [`Well...`, `Can't do that`]);
    }
    public run(): void {
        const enemy: NonHero = this.repository.currentPlace.creature;
        // tslint:disable-next-line:max-line-length
        const heroMagicDamage: number = Math.floor(this.repository.hero.equipment.weapon.magicalDamage + this.repository.hero.tempMagicBoost * 1.5);
        const magicString: string = Randomizer.GETRANDOMARRAYELEMENT(this.repository.hero.magicStrings);
        enemy.life -= heroMagicDamage;
        this.writer.write(`You performed ${magicString} and the ${enemy.name} takes ${heroMagicDamage} damage!`, '\x1b[35m');
        if (this.repository.hero.life === 0) {
            let i: number = 500;
            let output: string = '';
            while (i !== 0) {
                output += `YOU ARE DEAD `;
                this.writer.write(output, '\x1b[32m');
                i += 1;
            }
        }
        if (enemy.life === 0) {
            this.writer.write(`The ${enemy.name} is now dead!!`, '\x1b[34m');
            this.writer.write(`It dropped some stuff`, '\x1b[34m');
            this.repository.currentPlace.loot.consumeInventory(enemy.inventory);
            this.repository.currentPlace.containsCreature = false;
        } else {
            this.writer.write(`The ${enemy.name} looks shocked, but approaches you nevertheless!!!`, '\x1b[35m');
            this.writer.write(`Your enemy is left with ${enemy.life} health, you have ${this.repository.hero.life}!\n`, '\x1b[34m');
        }
    }
}
