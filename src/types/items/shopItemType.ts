import { IPrintable } from "../printable";
import { ItemType } from "./itemType";

export class ShopItemType implements IPrintable{
    item: ItemType

    constructor(item: ItemType){
        this.item = item;
    }

    to_string_array(): string[]{
        return [
            this.item.id,
            this.item.type,
            this.item.price.toFixed(2) + ' $'
        ]
    }

    print(){
        console.log(this.item);
    }
}