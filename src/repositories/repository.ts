import { GamestateType } from "../types/gamestateType";

export interface IRepository {
    load(): GamestateType
    save(gamestate: GamestateType)
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