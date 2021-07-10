import { InventoryItemType } from "../types/items/inventoryItemType";
import { ItemType } from "../types/items/itemType";
import { ShopItemType } from "../types/items/shopItemType";
import { ItemNotFoundError } from "../utilities/exceptions";
import { gamestateServiceSingleton as gamestateService } from "./gamestateService";

export class InventoryService{
    add(item: ItemType | ShopItemType, count: number = 1){
        if (item instanceof ShopItemType) {
            item = (item as ShopItemType).item;
        }

        let inventoryItem = this.getItem(item);
        if (!inventoryItem) {
            gamestateService.data.items.push({
                item: item,
                count: count
            });
            return;
        }

        inventoryItem.count += count;
    }
    remove(item: ItemType | ShopItemType, count: number = 1){
        if (item instanceof ShopItemType) {
            item = (item as ShopItemType).item;
        }

        let inventoryItem = this.getItem(item);
        if (!inventoryItem) {
            throw new ItemNotFoundError(`Item ${item.id} not found in your inventory.`);
        }

        inventoryItem.count -= count;
    }
    dump(item: ItemType | ShopItemType){
        if (item instanceof ShopItemType) {
            item = (item as ShopItemType).item;
        }

        let inventoryItem = this.getItem(item);
        if (!inventoryItem) {
            throw new ItemNotFoundError(`Item ${item.id} not found in your inventory.`);
        }

        inventoryItem.count = 0;
        this.cleanup();
    }
    list(): InventoryItemType[]{
        return gamestateService.data.items;
    }

    private getItem(item: ItemType): InventoryItemType{
        for (let inventoryItem of gamestateService.data.items) {
            if (inventoryItem.item.id == item.id) {
                return inventoryItem;
            }
        }

        return null;
    }

    private cleanup(){
        for (let inventoryItem of gamestateService.data.items) {
            if (inventoryItem.count == 0) {
                let index = gamestateService.data.items.indexOf(inventoryItem);
                gamestateService.data.items.splice(index, 1);
            }
        }
    }
}

export const inventoryServiceSingleton = new InventoryService();