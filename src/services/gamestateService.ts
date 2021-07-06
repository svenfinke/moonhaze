import { IRepository, RepositoryFactory } from "../repositories/repository";
import { GamestateType } from "../types/gamestateType";

export class GamestateService{
    // SINGLETON
    private static gamestateService:GamestateService;
    static getGamestateService(repository: IRepository = null): GamestateService{
        if (!this.gamestateService) {            
            if (repository == null) {
                repository = RepositoryFactory.getRepository();
            }
            this.gamestateService = new GamestateService(repository);
        }
        return this.gamestateService;
    }
    
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

    private constructor(repository: IRepository){
        this.data = new GamestateType();
        
        this.repository = repository;
        this.load();
    }    

    
}