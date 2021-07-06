import { GamestateType } from "../types/gamestateType";
import { GamestateService } from "./gamestateService";

export class PlayerService {
    private static playerService: PlayerService
    static getPlayerService(): PlayerService{
        if (!this.playerService) {
            this.playerService = new PlayerService();
        }
        
        return this.playerService;
    }

    private gamestateService: GamestateService

    private constructor(){
        this.gamestateService = GamestateService.getGamestateService();
    }

    sleep(){
        this.gamestateService.data.energy = this.gamestateService.data.energyMax;
        this.gamestateService.data.day++;
    }
}