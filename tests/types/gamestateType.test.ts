import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { RepositoryFactory } from "../../src/repositories/repository";
import { gamestateServiceSingleton as gamestateService } from "../../src/services/gamestateService";

describe('GamestateService_Test', () => {
    RepositoryFactory.setRepository(new InMemoryRepository());

    it('should be able to reset the gamestate', () => {
        gamestateService.data.energy += 100;
        const initialEnergy = gamestateService.data.energy;
        gamestateService.reset();

        expect(initialEnergy).not.equal(gamestateService.data.energy);
    });
});