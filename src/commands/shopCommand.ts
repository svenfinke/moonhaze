import commander, { Command } from "commander";
import { terminal } from "terminal-kit";
import { RepositoryFactory } from "../repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../services/gamestateService";
import { itemsServiceSingleton as itemsService } from "../services/itemsService";
import { renderServiceSingleton as renderService } from "../services/renderService";
import { shopServiceSingleton as shopService } from "../services/shopService";
import { pad } from "../utilities/renderUtilities";

export class ShopCommand {    
    constructor(program: Command){
        let shopCommand = new commander.Command('shop');
        let listItemsCommand = shopCommand.command('list-items');
        listItemsCommand.action(this.listItemsHandler.bind(this));

        program.addCommand(shopCommand);
    }

    private listItemsHandler(command){
        renderService.renderTable(shopService.listItems());
    }

    private buyItemsHandler(command){

    }
}