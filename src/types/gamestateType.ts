import { configServiceSingleton as configService } from "../services/configService";
import { InventoryItemType } from "./items/inventoryItemType";
import { ItemType } from "./items/itemType";
import { PlantType } from "./plantType";

export class GamestateType{
    items: InventoryItemType[] = [];
    plants: PlantType[] = [];

    energy: number = 20;
    energyMax: number = 20;
    balance: number = 0;
    day: number = 1;
    farmname: string = "Awesome Farm";
    playername: string = "John Doe";
    
    constructor(){
        this.balance = configService.config.startingBalance;
    }
}