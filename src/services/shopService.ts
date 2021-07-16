import { ShopItemType } from "../types/items/shopItemType";
import { InsufficientBalanceError, ItemNotFoundError, NotEnoughItemsError } from "../utilities/exceptions";
import { gamestateServiceSingleton as gamestateService } from "./gamestateService";
import { inventoryServiceSingleton as inventoryService } from "./inventoryService";
import { itemsServiceSingleton as itemsService } from "./itemsService";


export class shopService{
    listItems(shop: string = "farmer"): ShopItemType[]{
        return itemsService.getShopItems(shop);
    }

    buyItems(itemId: string, count: number = 1){
        let item = itemsService.getShopItem(itemId);
        if (!item) {
            throw new ItemNotFoundError(`Item with ID ${item} could not be found.`);
        }
        
        let price = item.item.price * count;
        if (price > gamestateService.data.balance) {
            throw new InsufficientBalanceError(`Not enough money to buy ${count} ${itemId}`);
        }

        gamestateService.data.balance -= price;
        inventoryService.add(item, count);
    }

    sellItems(itemId: string, count: number = 1){
        let item = itemsService.getShopItem(itemId);
        let inventoryItem = inventoryService.get(item.item);
        if (!item) {
            throw new ItemNotFoundError(`Item with ID ${item} could not be found.`);
        }
        if (inventoryItem.count < count) {
            throw new NotEnoughItemsError(`Item with ID ${item} can't be sold ${count}x, only ${inventoryItem.count} availiable`)
        }
        
        let value = item.item.value * count;
    
        gamestateService.data.balance += value;
        inventoryService.remove(item, count);
    }
}

export const shopServiceSingleton = new shopService();