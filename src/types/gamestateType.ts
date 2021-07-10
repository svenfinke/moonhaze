import { configServiceSingleton as configService } from "../services/configService";
import { ItemType } from "./items/itemType";
import { EmptyPlot } from "./plots/emptyPlot";
import { IPlot } from "./plots/plotType";

export class GamestateType{
    plots: IPlot[][] = []
    items: { "item": ItemType, "count": number }[] = []
    
    energy: number = 20;
    energyMax: number = 20;
    balance: number = 0
    day: number = 1
    farmname: string = "Awesome Farm"
    playername: string = "John Doe";
    
    constructor(){
        this.balance = configService.config.startingBalance;
        this.plots = this.generatePlots();
    }

    private generatePlots(): IPlot[][] {
        var plots: IPlot[][] = [];
        for (let y = 0; y < configService.config.startingPlotRows ; y++){
            plots[y] = [];
            for (let x = 0; x < configService.config.startingPlotColumns; x++){
                plots[y][x] = new EmptyPlot({ 'progress': 100 });
            }
        }

        return plots;
    }
}