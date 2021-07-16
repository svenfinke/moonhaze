import { ShopItemType } from "../types/items/shopItemType";
import { InsufficientBalanceError, ItemNotFoundError } from "../utilities/exceptions";
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
}

export const shopServiceSingleton = new shopService();