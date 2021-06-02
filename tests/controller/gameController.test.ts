import { expect } from "chai";
import { spy } from "sinon";
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
    });

    it('should run gamestate.load', () => {
        let gameController = new GameController();
        var gamestateSpy = spy(gameController.gamestate, "load");

        gameController.init();
        expect(gamestateSpy.calledOnce).true;
    });
});

describe('GameController_Shutdown_Test', () => {
    it('should run gamestate.persist', () => {
        var gameController = new GameController();
        var gamestateSpy = spy(gameController.gamestate, "persist");
        
        gameController.init();
        gameController.shutdown();
        expect(gamestateSpy.calledOnce).true;
    })
});

describe('GameController_Index_Test', () => {
    it('should change playerLevel', () => {
        var gameController = new GameController();
        gameController.init();
        
        var initialPlayerLevel = gameController.gamestate.data.playerLevel;
        gameController.indexAction();
        expect(gameController.gamestate.data.playerLevel).not.eql(initialPlayerLevel)
    })
});