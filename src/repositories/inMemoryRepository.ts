import { GamestateType } from "../types/gamestateType";
import { IRepository } from "./repository";

export class InMemoryRepository implements IRepository {
    load(): GamestateType{
        return new GamestateType();
    }
    save(gamestate: GamestateType){
        // Don't do anything
    }
}