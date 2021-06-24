import { Command } from "commander";
import { RepositoryFactory } from "../repositories/repository";
import { RenderService } from "../services/renderService";
import { GamestateType } from "../types/gamestateType";

export class PlayerCommand {
    private renderService: RenderService;
    
    constructor(){
        this.renderService = new RenderService();
    }

    addCommand(program: Command){
        let playerCommand = program.command('player');
        playerCommand
            .arguments('<action>')
            .action(this.actionHandler.bind(this));
    }

    actionHandler(action, command){
        // Check which Repository to use
        GamestateType.getGamestate(RepositoryFactory.getRepository());

        switch (action) {
            case 'sleep':
                this.sleep(command);
        }
        
        this.renderService.renderGamestate();
    }

    private sleep(command){
        
    }
}