import { inject, injectable } from 'inversify';
import { ICollectable } from './../../models/non-living/interfaces/collectable';
import { PromptLoop } from './../UI/promptLoop';
import { IPlace } from './../../models/non-living/interfaces/place';
import { IPotion } from './../../models/non-living/interfaces/potion';
import { IWeapon } from './../../models/non-living/interfaces/weapon';
import { IArmour } from './../../models/non-living/interfaces/armour';
import { IInventory } from './../../models/non-living/interfaces/inventory';
import { Iwriter } from '../UI/interfaces/writer';

@injectable()
export class ItemService {
    public writer: Iwriter;
    public promptLoop: PromptLoop;

    public constructor(@inject('prompt-loop') promptLoop: PromptLoop, @inject('ui-writer') writer: Iwriter) {
        this.promptLoop = promptLoop;
        this.writer = writer;
    }
    public lootPlace(currentPlace: IPlace, myInventory: IInventory): void {
        this.writer.write(`You found:\n${currentPlace.loot.listItems()}`);
        currentPlace.loot.armour.forEach((armour: IArmour) => myInventory.addArmour(armour));
        currentPlace.loot.weapons.forEach((weapon: IWeapon) => myInventory.addWeapon(weapon));
        currentPlace.loot.potions.forEach((potion: IPotion) => myInventory.addPotion(potion));
        myInventory.addCoins(currentPlace.loot.coins);
        currentPlace.loot.removeAll();
    }

    public setTradeItem(heroInventory: IInventory, traderInventory: IInventory): void {
        // Reaplce with hero inventory
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
            this.sellItem(traderInventory, heroInventory, result[1]);
        }
        if (result[0] === 'buy') {
        this.buyItem(traderInventory, heroInventory, result[1]);
        }
    }
    private sellItem(traderInventory: IInventory, heroInventory: IInventory, itemToSell: string): void {
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

    private buyItem(traderInventory: IInventory, heroInventory: IInventory, itemToBuy: string): void {
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
