import { NotEnoughEnergyError } from "../utilities/exceptions";
import { gamestateServiceSingleton as gamestateService } from "./gamestateService";

export class PlayerService {
    sleep(){
        gamestateService.data.energy = gamestateService.data.energyMax;
        gamestateService.data.day++;
    }

    do(){
        if (gamestateService.data.energy <= 0) {
            throw new NotEnoughEnergyError('There is not enough energy to do something.');
        }
        gamestateService.data.energy--;
    }
}

export const playerServiceSingleton = new PlayerService();