import { PersistentType } from "./persistentType";

export class GamestateType extends PersistentType{
    // SINGLETON
    private static gamestate:GamestateType;
    static getGamestate(filename: string = 'gamestate.json'): GamestateType{
        if (this.gamestate == undefined) {
            this.gamestate = new GamestateType(filename);
        }
        return this.gamestate;
    }
    
    data: {
        plots: object[]
        playerLevel: number        
    }
    constructor(filename: string = 'gamestate.json'){
        super();
        this.filename = 'gamestate.json';
        this.data = {
            playerLevel: 1,
            plots: []
        }
    }
    load(): boolean {
        return this.loadFromFile();
    }
    persist(): boolean {
        return this.persistToFile();
    }
    
}