import { inject, injectable } from 'inversify';
import { ICollectable } from './../../models/non-living/interfaces/collectable';
import { PromptLoop } from './../UI/promptLoop';
import { Potion } from './../../models/non-living/classes/potion';
import { Weapon } from './../../models/non-living/classes/weapon';
import { Armour } from './../../models/non-living/classes/armour';
import { Inventory } from './../../models/non-living/classes/inventory';
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

    public setTradeItem(myInventory: IInventory, traderInventory: IInventory): void {
        // Reaplce with hero inventory
        this.writer.write(`You have the following items:\n${myInventory.listItems()}`);
        this.writer.write(`Trader has the following items:\n${traderInventory.listItems()}`);
        const possibleBuys: string[] = [...traderInventory.armour.map((item: IArmour, index: number) => `buy a${index}`),
        ...traderInventory.weapons.map((item: IWeapon, index: number) => `buy w${index}`),
        ...traderInventory.potions.map((item: IPotion, index: number) => `buy p${index}`)];
        const possibleSells: string[] = [...myInventory.armour.map((item: IArmour, index: number) => `sell a${index}`),
        ...myInventory.weapons.map((item: IWeapon, index: number) => `sell w${index}`),
        ...myInventory.potions.map((item: IPotion, index: number) => `sell p${index}`)];
        const result: string[] = this.promptLoop.chooseTradeItem([...possibleBuys, ...possibleSells, 'exit']).split(' ');
        if (result[0] === 'sell') {
            this.sellItem(traderInventory, myInventory, result[1]);
        }
        if (result[0] === 'buy') {
        this.buyItem(traderInventory, myInventory, result[1]);
        }
    }
    private sellItem(traderInventory: IInventory, myInventory: IInventory, itemToSell: string): void {
        const itemType: string = itemToSell[0];
        const itemIndex: number = +itemToSell.substr(1, itemToSell.length);
        let soldItem: ICollectable;
        if (itemType === 'a') {
            soldItem = myInventory.removeArmour(itemIndex);
        } else if (itemType === 'w') {
            soldItem = myInventory.removeWeapon(itemIndex);
        } else {
            soldItem = myInventory.removePotion(itemIndex);
        }
        myInventory.addCoins(soldItem.price);
    }

    private buyItem(traderInventory: IInventory, myInventory: IInventory, itemToBuy: string): void {
        const itemType: string = itemToBuy[0];
        const itemIndex: number = +itemToBuy.substr(1, itemToBuy.length);
        let boughtItem: IArmour | IWeapon | IPotion;
        if (itemType === 'a' && traderInventory.armour[itemIndex].price <= myInventory.coins) {
            boughtItem = traderInventory.removeArmour(itemIndex);
            myInventory.addArmour(boughtItem);
            myInventory.subtractCoins(boughtItem.price);
        } else if (itemType === 'w' && traderInventory.weapons[itemIndex].price <= myInventory.coins) {
            boughtItem = traderInventory.removeWeapon(itemIndex);
            myInventory.addWeapon(boughtItem);
            myInventory.subtractCoins(boughtItem.price);
        } else if (itemType === 'p' && traderInventory.potions[itemIndex].price <= myInventory.coins) {
            boughtItem = traderInventory.removePotion(itemIndex);
            myInventory.addPotion(boughtItem);
            myInventory.subtractCoins(boughtItem.price);
        } else {
            this.writer.write(`You cannot afford that!`);
        }
    }
}
