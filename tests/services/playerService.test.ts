import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { RepositoryFactory } from "../../src/repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../../src/services/gamestateService";
import { playerServiceSingleton as playerService } from "../../src/services/playerService";
import { NotEnoughEnergyError } from "../../src/utilities/exceptions";

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

    it('do should decrease energy', () => {
        gamestateService.reset();
        let initialEnergy = gamestateService.data.energy;
        playerService.do();
        
        expect(gamestateService.data.energy).to.lessThan(initialEnergy);
    });

    it('do should fail if energy is too low', () => {
        gamestateService.reset();
        gamestateService.data.energy = 0;
        
        expect(playerService.do.bind(playerService)).to.throw(NotEnoughEnergyError);
    });
});