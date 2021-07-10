import commander, { Command } from "commander";
import { gamestateServiceSingleton as gamestateService } from "../services/gamestateService";
import { RenderService } from "../services/renderService";

export class GameCommand {
    private renderService: RenderService;
    
    constructor(program: Command){
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
        gamestateService.reset();
    }
}