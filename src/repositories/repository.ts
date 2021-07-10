import { GamestateType } from "../types/gamestateType";
import { FileRepository } from "./fileRepository";

export interface IRepository {
    load(): GamestateType
    save(gamestate: GamestateType)
}

export class RepositoryFactory {
    static repository: IRepository = new FileRepository('gamestate.json')

    static setRepository(repository: IRepository){
        this.repository = repository;
    }
    static getRepository(): IRepository{
        return this.repository;
    }
}