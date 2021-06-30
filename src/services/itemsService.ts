import { ItemType } from "../types/items/itemType";
import { ShopItemType } from "../types/items/shopItemType";

export class ItemsService{
    // SINGLETON
    private static itemsService;
    static getConfigService():ItemsService {
        if (!this.itemsService) {
            this.itemsService = new ItemsService();
        }
        return this.itemsService;
    }

    private shopItems:ShopItemType[];
    private Items:ItemType[];

    private ItemData = {
        "items": [
            {
                "id": "mushroomSeed",
                "value": 20,
                "price": 80,
                "shops": ["farmer"],
                "type": "seed",
                "metadata": {
                    "growTime": 5,
                    "produceCount": 1,
                    "produceItem": "mushroom"
                }
            },
            {
                "id": "mushroom",
                "value": 150,
                "price": 250,
                "shops": [],
                "type": "vegetable",
                "metadata": {}
            },
            {
                "id": "leekSeed",
                "value": 10,
                "price": 50,
                "shops": ["farmer"],
                "type": "seed",
                "metadata": {
                    "growTime": 8,
                    "produceCount": 1,
                    "produceItem": "leek"
                }
            },
            {
                "id": "leek",
                "value": 80,
                "price": 200,
                "shops": [],
                "type": "vegetable",
                "metadata": {}
            }
        ]
    }

    getItems():ItemType[]{
        let items = [];
        this.ItemData.items.forEach((item)=>{
            items.push(new ShopItemType(item));
        });

        return items;
    }

    getShopItems(shop: string = "farmer"):ShopItemType[]{
        let items = [];
        this.ItemData.items.forEach((item)=>{
            if (item.shops.includes(shop)) {
                items.push(new ShopItemType(item));
            }
        });

        return items;
    }
}