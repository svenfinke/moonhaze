import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { RepositoryFactory } from "../../src/repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../../src/services/gamestateService";
import { playerServiceSingleton as playerService } from "../../src/services/playerService";

describe('PlayerService_Test', () => {
    RepositoryFactory.setRepository(new InMemoryRepository());
    
    it('sleep should increase day', () => {
        gamestateService.reset();
        const startDay = gamestateService.data.day;
        
        playerService.sleep();

        expect(gamestateService.data.day).to.greaterThan(startDay);
    });
    
    it('sleep should set energy to default max', () => {
        gamestateService.reset();
        gamestateService.data.energy = 0;
        
        expect(gamestateService.data.energy).not.equal(gamestateService.data.energyMax);
        
        playerService.sleep();

        expect(gamestateService.data.energy).to.equal(gamestateService.data.energyMax);
    });

    it('sleep should set energy to custom max', () => {
        gamestateService.reset();
        gamestateService.data.energy = 0;
        gamestateService.data.energyMax = 500;
        
        expect(gamestateService.data.energy).not.equal(gamestateService.data.energyMax);
        
        playerService.sleep();

        expect(gamestateService.data.energy).to.equal(gamestateService.data.energyMax);
    });
});