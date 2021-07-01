import { expect, should } from "chai";
import { InMemoryRepository } from "../../src/repositories/inMemoryRepository";
import { GamestateType } from "../../src/types/gamestateType";

describe('GamestateType_Test', () => {
    // Generate Gamestate with InMemoryRepository
    GamestateType.getGamestate(new InMemoryRepository());

    it('should create gamestate as singleton', () => {
        let gamestate = GamestateType.getGamestate();
        gamestate.data.energy += 100;
        let secondGamestate = GamestateType.getGamestate();

        expect(gamestate.data.energy).to.equal(secondGamestate.data.energy);
    });

    it('should be able to reset the gamestate', () => {
        let gamestate = GamestateType.getGamestate();
        gamestate.data.energy += 100;
        const initialEnergy = gamestate.data.energy;
        gamestate.reset();

        expect(initialEnergy).not.equal(gamestate.data.energy);
    });
});