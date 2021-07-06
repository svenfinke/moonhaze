import commander, { Command } from "commander";
import { RepositoryFactory } from "../repositories/repository";
import { GamestateService } from "../services/gamestateService";
import { PlayerService } from "../services/playerService";
import { RenderService } from "../services/renderService";
import { GamestateType } from "../types/gamestateType";

export class GameCommand {
    private renderService: RenderService;
    
    constructor(program: Command){
        // Check which Repository to use
        GamestateService.getGamestateService(RepositoryFactory.getRepository());
        this.renderService = new RenderService();
        
        let gameCommand = new commander.Command('game');
        // Will probably be moved to a different parent command...
        let showCommand = gameCommand.command('show');
        showCommand.action(this.showHandler.bind(this));

        let resetCommand = gameCommand.command('reset');
        resetCommand.action(this.resetAction.bind(this));

        program.addCommand(gameCommand);
    }

    showHandler(command){        
        this.renderService.renderGamestate();
    }

    resetAction(command){
        GamestateService.getGamestateService().reset();
    }
}