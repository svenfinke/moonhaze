import commander, { Command } from "commander";
import { RepositoryFactory } from "../repositories/repository";
import { GamestateService } from "../services/gamestateService";
import { PlayerService } from "../services/playerService";
import { RenderService } from "../services/renderService";
import { GamestateType } from "../types/gamestateType";

export class PlayerCommand {
    private renderService: RenderService;
    private playerService: PlayerService;
    
    constructor(program: Command){
        // Check which Repository to use
        GamestateService.getGamestateService(RepositoryFactory.getRepository());
        this.renderService = new RenderService();
        this.playerService = PlayerService.getPlayerService();
        
        let playerCommand = new commander.Command('player');
        // Will probably be moved to a different parent command...
        let showCommand = playerCommand.command('show');
        showCommand.action(this.showHandler.bind(this));

        let sleepCommand = playerCommand.command('sleep');
        sleepCommand.action(this.sleepAction.bind(this));

        program.addCommand(playerCommand);
    }

    showHandler(command){        
        this.renderService.renderGamestate();
    }

    sleepAction(command){
        this.playerService.sleep();
    }
}