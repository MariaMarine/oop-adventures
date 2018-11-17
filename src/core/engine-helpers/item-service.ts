import { inject, injectable } from 'inversify';
import { ICollectable } from './../../models/non-living/interfaces/collectable';
import { PromptLoop } from './../UI/promptLoop';
import { IPlace } from './../../models/non-living/interfaces/place';
import { IPotion } from './../../models/non-living/interfaces/potion';
import { IWeapon } from './../../models/non-living/interfaces/weapon';
import { IArmour } from './../../models/non-living/interfaces/armour';
import { IInventory } from './../../models/non-living/interfaces/inventory';
import { Iwriter } from '../UI/interfaces/writer';
import { IRepository } from '../../models/non-living/interfaces/repository';

@injectable()
export class ItemService {
    private writer: Iwriter;
    private promptLoop: PromptLoop;
    private repository: IRepository;
    public constructor(@inject('prompt-loop') promptLoop: PromptLoop,
                       @inject('ui-writer') writer: Iwriter,
                       @inject('repository') repository: IRepository
                       ) {
        this.repository = repository;
        this.promptLoop = promptLoop;
        this.writer = writer;
    }
    public lootPlace(): void {
        const currentPlace: IPlace = this.repository.currentPlace;
        const myInventory: IInventory = this.repository.hero.inventory;
        this.writer.write(`You found:\n${currentPlace.loot.listItems()}`, '\x1b[34m');
        myInventory.consumeInventory(currentPlace.loot);
    }

    public setTradeItem(): void {
        // Reaplce with hero inventory
        const heroInventory: IInventory = this.repository.hero.inventory;
        const traderInventory: IInventory = this.repository.currentPlace.creature.inventory;
        this.writer.write(`You have the following items:\n${heroInventory.listItems()}`);
        this.writer.write(`Trader has the following items:\n${traderInventory.listItems()}`);
        const possibleBuys: string[] = [...traderInventory.armour.map((item: IArmour, index: number) => `buy a${index}`),
        ...traderInventory.weapons.map((item: IWeapon, index: number) => `buy w${index}`),
        ...traderInventory.potions.map((item: IPotion, index: number) => `buy p${index}`)];
        const possibleSells: string[] = [...heroInventory.armour.map((item: IArmour, index: number) => `sell a${index}`),
        ...heroInventory.weapons.map((item: IWeapon, index: number) => `sell w${index}`),
        ...heroInventory.potions.map((item: IPotion, index: number) => `sell p${index}`)];
        const result: string[] = this.promptLoop.chooseTradeItem([...possibleBuys, ...possibleSells, 'exit']).split(' ');
        if (result[0] === 'sell') {
            this.sellItem(result[1]);
        }
        if (result[0] === 'buy') {
        this.buyItem(result[1]);
        }
    }
    private sellItem(itemToSell: string): void {
        const heroInventory: IInventory = this.repository.hero.inventory;
        const itemType: string = itemToSell[0];
        const itemIndex: number = +itemToSell.substr(1, itemToSell.length);
        let soldItem: ICollectable;

        if (itemType === 'a') {
            soldItem = heroInventory.removeArmour(itemIndex);
        } else if (itemType === 'w') {
            soldItem = heroInventory.removeWeapon(itemIndex);
        } else {
            soldItem = heroInventory.removePotion(itemIndex);
        }
        heroInventory.addCoins(soldItem.price);
    }

    private buyItem(itemToBuy: string): void {
        const heroInventory: IInventory = this.repository.hero.inventory;
        const traderInventory: IInventory = this.repository.currentPlace.creature.inventory;
        const itemType: string = itemToBuy[0];
        const itemIndex: number = +itemToBuy.substr(1, itemToBuy.length);

        let boughtItem: IArmour | IWeapon | IPotion;
        if (itemType === 'a' && traderInventory.armour[itemIndex].price <= heroInventory.coins) {
            boughtItem = traderInventory.removeArmour(itemIndex);
            heroInventory.addArmour(boughtItem);
            heroInventory.subtractCoins(boughtItem.price);
        } else if (itemType === 'w' && traderInventory.weapons[itemIndex].price <= heroInventory.coins) {
            boughtItem = traderInventory.removeWeapon(itemIndex);
            heroInventory.addWeapon(boughtItem);
            heroInventory.subtractCoins(boughtItem.price);
        } else if (itemType === 'p' && traderInventory.potions[itemIndex].price <= heroInventory.coins) {
            boughtItem = traderInventory.removePotion(itemIndex);
            heroInventory.addPotion(boughtItem);
            heroInventory.subtractCoins(boughtItem.price);
        } else {
            this.writer.write(`You cannot afford that!`);
        }
    }
}
