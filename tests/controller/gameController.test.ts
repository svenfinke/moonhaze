import { expect } from "chai";
import { GameController } from "../../src/controller/gameController";

describe('GameController_Constructor_Test', () => {
    it('should define actions', () => {
        const gameController = new GameController();

        expect(gameController.actions['index']).not.undefined;
        expect(gameController.actions['dashboard']).not.undefined;
    })
});

describe('GameController_Init_Test', () => {
    it('should create gamestate', () => {
        let gameController = new GameController();
        gameController.init();

        expect(gameController.gamestate).not.undefined;
    })
});