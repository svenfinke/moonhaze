import { IRepository } from "../repositories/repository";
import { ConfigService } from "../services/configService";
import { ItemType } from "./items/itemType";
import { StrawberrySeedItem } from "./items/seeds/strawberrySeedItem";
import { TurnipSeedItem } from "./items/seeds/turnipSeedItem";
import { EmptyPlot } from "./plots/emptyPlot";
import { IPlot } from "./plots/plotType";

export class GamestateType{
    // SINGLETON
    private static gamestate:GamestateType;
    static getGamestate(repository: IRepository = null): GamestateType{
        if (!this.gamestate) {
            if (repository == null) throw Error;
            this.gamestate = new GamestateType(repository);
        }
        return this.gamestate;
    }
    
    data: GamestateData
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

    private constructor(repository: IRepository){
        this.data = new GamestateData();
        
        this.repository = repository;
        this.load();
    }    

    
}

export class GamestateData{
    plots: IPlot[][] = []
    items: ItemType[] = []
    
    energy: number = 10;
    energyMax: number = 20;
    balance: number = 0
    day: number = 1
    farmname: string = "Awesome Farm"


    private configService: ConfigService;
    
    constructor(){
        this.configService = ConfigService.getConfigService();
        this.balance = this.configService.config.startingBalance;
        this.plots = this.generatePlots();

        let turnipSeeds = new TurnipSeedItem();
        turnipSeeds.count = 5;
        this.items.push(turnipSeeds);
    }

    private generatePlots(): IPlot[][] {
        var plots: IPlot[][] = [];
        for (let y = 0; y < this.configService.config.startingPlotRows ; y++){
            plots[y] = [];
            for (let x = 0; x < this.configService.config.startingPlotColumns; x++){
                plots[y][x] = new EmptyPlot({ 'progress': 100 });
            }
        }

        return plots;
    }
}