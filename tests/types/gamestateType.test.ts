import { expect } from "chai";
import { GamestateType } from "../../src/types/gamestateType";

describe('CliRequest_Test', () => {
    it('should create gamestate as singleton', () => {
        var gamestate = GamestateType.getGamestate();
        var initialPlayerLevel = gamestate.data.playerLevel;
        var secondGamestate = GamestateType.getGamestate();
        secondGamestate.data.playerLevel = 999;

        expect(initialPlayerLevel).not.eql(gamestate.data.playerLevel);
        expect(gamestate.data).to.eql(gamestate.data);
    });
});