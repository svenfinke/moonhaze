import { gamestateServiceSingleton as gamestateService } from "./gamestateService";

export class PlayerService {
    sleep(){
        gamestateService.data.energy = gamestateService.data.energyMax;
        gamestateService.data.day++;
    }
}

export const playerServiceSingleton = new PlayerService();