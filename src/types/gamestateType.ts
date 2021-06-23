import { PersistentType } from "./persistentType";
import { EmptyPlot, IPlot, PlotFactory } from "./plotType";

export class GamestateType extends PersistentType{
    // SINGLETON
    private static gamestate:GamestateType;
    static getGamestate(filename: string = 'gamestate.json'): GamestateType{
        if (this.gamestate == undefined) {
            this.gamestate = new GamestateType(filename);
        }
        return this.gamestate;
    }
    
    data: {
        plots: IPlot[][]
        playerLevel: number        
    }
    constructor(filename: string = 'gamestate.json'){
        super();
        this.filename = 'gamestate.json';
        this.data = {
            playerLevel: 1,
            plots: this.generatePlots()
        }
    }
    generatePlots(): IPlot[][] {
        var plots: IPlot[][] = [];
        for (let y = 0; y < 10; y++){
            plots[y] = [];
            for (let x = 0; x < 10; x++){
                plots[y][x] = new EmptyPlot({ 'progress': 100 });
            }
        }

        return plots;
    }
    load(): boolean {
        let jsonString = this.loadFromFile();
        if (jsonString == "") return;

        var jsonData = JSON.parse(jsonString);

        // Load static data
        this.data.playerLevel = jsonData.playerLevel;

        // Load objects
        var plotFactory = PlotFactory.getFactory();
        jsonData.plots.forEach((column, y)=>{
            this.data.plots[y] = [];
            column.forEach((plot, x)=>{
                this.data.plots[y][x] = plotFactory.create(plot.className, plot);
            });
        });

        // Turn loaded data into objects again
        return false;
    }

    persist(): boolean {
        // turn data into persistable data
        var persistableData: any = {};

        // Copy data and replace everything that has to be re-written
        persistableData = Object.assign(persistableData, this.data)
        persistableData.plots = [];

        // Write Plots
        this.data.plots.forEach((column,y)=>{
            persistableData.plots[y] = [];
            column.forEach((plot, x)=>{
                persistableData.plots[y][x] = {
                    className: plot.className,
                    args: plot
                }
            });
        })

        return this.persistToFile(JSON.stringify(persistableData));
    }
}