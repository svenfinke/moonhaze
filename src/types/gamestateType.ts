import { PersistentType } from "./persistentType";



export class GamestateType extends PersistentType{
    data: {
        plots: object[]
        playerLevel: number        
    }

    constructor(){
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