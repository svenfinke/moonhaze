import { expect } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { GamestateService } from "../../src/services/gamestateService";

describe('GamestateService_Test', () => {
    // Generate Gamestate with InMemoryRepository
    GamestateService.getGamestateService(new InMemoryRepository());

    it('should create gamestate as singleton', () => {
        let gamestate = GamestateService.getGamestateService();
        gamestate.data.energy += 100;
        let secondGamestate = GamestateService.getGamestateService();

        expect(gamestate.data.energy).to.equal(secondGamestate.data.energy);
    });

    it('should be able to reset the gamestate', () => {
        let gamestate = GamestateService.getGamestateService();
        gamestate.data.energy += 100;
        const initialEnergy = gamestate.data.energy;
        gamestate.reset();

        expect(initialEnergy).not.equal(gamestate.data.energy);
    });
});