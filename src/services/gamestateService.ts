import { IRepository, RepositoryFactory } from "../repositories/repository";
import { GamestateType } from "../types/gamestateType";

export class GamestateService{
    data: GamestateType
    repository: IRepository

    save(){
        this.repository.save(this.data);
    }
    load(){
        let loadedData = this.repository.load();
        if (loadedData) {
            this.data = this.repository.load();
        }
    }
    reset(){
        this.data = new GamestateType();
    }

    constructor(){
        let repository = RepositoryFactory.getRepository();
        this.data = new GamestateType();
        
        this.repository = repository;
        this.load();
    }    

    
}

export const gamestateServiceSingleton = new GamestateService();