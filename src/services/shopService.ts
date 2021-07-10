import { ShopItemType } from "../types/items/shopItemType";
import { itemsServiceSingleton as itemsService } from "./itemsService";


export class shopService{
    listItems(shop: string = "farmer"): ShopItemType[]{
        return itemsService.getShopItems(shop);
    }
}

export const shopServiceSingleton = new shopService();