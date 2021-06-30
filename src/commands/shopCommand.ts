import commander, { Command } from "commander";
import { RepositoryFactory } from "../repositories/repository";
import { ItemsService } from "../services/itemsService";
import { GamestateType } from "../types/gamestateType";

export class ShopCommand {    
    itemsService: ItemsService;
    constructor(program: Command){
        // Check which Repository to use
        GamestateType.getGamestate(RepositoryFactory.getRepository());
        this.itemsService = new ItemsService();

        let shopCommand = new commander.Command('shop');
        let listItemsCommand = shopCommand.command('list-items');
        listItemsCommand.action(this.listItemsHandler.bind(this));

        program.addCommand(shopCommand);
    }

    private listItemsHandler(command){
        console.log('DAFUQ');
        let shopItems = this.itemsService.getShopItems();

        shopItems.forEach((item)=>{
            console.log(item.item.id, item.price);
        });
    }
}