import { IRepository } from "./repository";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { GamestateType } from "../types/gamestateType";

export class FileRepository implements IRepository {
    filename: string
    
    constructor(filename: string) {
        this.filename = filename;
    }

    load(): GamestateType{
        let gameStateData = new GamestateType();

        let jsonString = "";
        if (existsSync(this.filename)) {
            jsonString = readFileSync(this.filename, 'utf8');
        }
        if (jsonString == "") return gameStateData;

        var jsonData = JSON.parse(jsonString);

        // Load static data
        gameStateData = jsonData;

        return gameStateData;
    }
    save(gamestate: GamestateType){
        // turn data into persistable data
        var persistableData: any = {};

        // Copy data and replace everything that has to be re-written
        persistableData = Object.assign(persistableData, gamestate)
        persistableData.plots = [];

        writeFileSync(this.filename, JSON.stringify(persistableData));
    }
}