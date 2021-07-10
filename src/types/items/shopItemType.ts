import { IPrintable } from "../printable";
import { ItemType } from "./itemType";

export class ShopItemType implements IPrintable{
    item: ItemType

    constructor(item: ItemType){
        this.item = item;
    }

    to_string_array(): string[]{
        return []
    }

    print(){
        console.log("PRINT")
    }
}