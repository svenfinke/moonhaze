import commander, { Command } from "commander";
import { playerServiceSingleton as playerService } from "../services/playerService";
import { RenderService } from "../services/renderService";

export class PlayerCommand {
    private renderService: RenderService;
    
    constructor(program: Command){
        this.renderService = new RenderService();
        
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
        playerService.sleep();
    }
}