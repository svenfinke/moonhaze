import { ItemType } from "./itemType";

export class ShopItemType{
    item: ItemType
    price: number

    constructor(item: ItemType){
        this.item = item;
    }
}