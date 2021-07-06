import commander, { Command } from "commander";
import { terminal } from "terminal-kit";
import { RepositoryFactory } from "../repositories/repository";
import { GamestateService } from "../services/gamestateService";
import { ItemsService } from "../services/itemsService";
import { pad } from "../utilities/renderUtilities";

export class ShopCommand {    
    itemsService: ItemsService;
    constructor(program: Command){
        // Check which Repository to use
        GamestateService.getGamestateService(RepositoryFactory.getRepository());
        this.itemsService = new ItemsService();

        let shopCommand = new commander.Command('shop');
        let listItemsCommand = shopCommand.command('list-items');
        listItemsCommand.action(this.listItemsHandler.bind(this));

        program.addCommand(shopCommand);
    }

    private listItemsHandler(command){
        let term = terminal;
        let shopItems = this.itemsService.getShopItems();

        term.clear();
        // Header
        term.down(1);
        for (let index = 0; index < term.width; index++) {
            term("=");
        }
        term.down(2);

        shopItems.forEach((item)=>{
            term.left(2000);
            term(pad('                    ', item.item.id, false));
            term(' | ');
            term(pad('       ', item.item.price.toString(), true));
            term(' $');
            term.down(1);
        });
        term('\n');
    }
}