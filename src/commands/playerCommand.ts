import commander, { Command } from "commander";
import { RepositoryFactory } from "../repositories/repository";
import { RenderService } from "../services/renderService";
import { GamestateType } from "../types/gamestateType";

export class PlayerCommand {
    private renderService: RenderService;
    
    constructor(program: Command){
        // Check which Repository to use
        GamestateType.getGamestate(RepositoryFactory.getRepository());
        this.renderService = new RenderService();
        
        let playerCommand = new commander.Command('player');
        let showCommand = playerCommand.command('show');
        showCommand.action(this.showHandler.bind(this));

        program.addCommand(playerCommand);
    }

    showHandler(command){        
        this.renderService.renderGamestate();
    }
}