import { GamestateData } from "../types/gamestateType";
import { IRepository } from "./repository";

export class InMemoryRepository implements IRepository {
    load(): GamestateData{
        return new GamestateData();
    }
    save(gamestate: GamestateData){
        // Don't do anything
    }
}