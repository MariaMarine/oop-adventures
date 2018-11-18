import { Choice } from '../choice';
import { injectable } from 'inversify';
import { NonHero } from '../../../../models/living/classes/non-hero';

@injectable()
export class Hit extends Choice {
    public constructor() {
        super(['hit', 'attack'], ['Enemy is too far to hit', 'Enemy not in range', 'Can`t reach']);
    }
    public run(): void {
        const enemy: NonHero = this.repository.currentPlace.creature;
        const heroHitDamage: number = Math.floor((this.repository.hero.strength + this.repository.hero.tempStrengthBoost) * 1.75 +
                                                  this.repository.hero.equipment.weapon.physicalDamage);
        const enemyHitDamage: number = Math.floor(enemy.strength * 2.25);

        this.repository.hero.life -= enemyHitDamage;
        enemy.life -= heroHitDamage;

        this.writer.write(`You hit the ${enemy.name} and it takes ${heroHitDamage} damage!`, '\x1b[35m');
        this.writer.write(`The ${enemy.name} hits back and you take ${enemyHitDamage} damage!`, '\x1b[35m');

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
            // tslint:disable-next-line:max-line-length
            this.writer.write(`The ${enemy.name} is left with ${enemy.life} health, you have ${this.repository.hero.life}!`, '\x1b[34m');
        }
    }
}
