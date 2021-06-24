import { GamestateData } from "../types/gamestateType";

export interface IRepository {
    load(): GamestateData
    save(gamestate: GamestateData)
}

export class RepositoryFactory {
    static repository: IRepository;

    static setRepository(repository: IRepository){
        this.repository = repository;
    }
    static getRepository(): IRepository{
        return this.repository;
    }
}