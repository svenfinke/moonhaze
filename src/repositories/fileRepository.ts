import { IRepository } from "./repository";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { GamestateType } from "../types/gamestateType";
import { PlotFactory } from "../types/plots/plotType";

export class FileRepository implements IRepository {
    filename: string
    
    constructor(filename: string) {
        this.filename = filename;
    }

    load(): GamestateType{
        let gameStateData = new GamestateType();

        let jsonString = "";
        if (existsSync(this.filename)) {
            jsonString = readFileSync(this.filename, 'utf8');
        }
        if (jsonString == "") return gameStateData;

        var jsonData = JSON.parse(jsonString);

        // Load static data
        gameStateData = jsonData;

        // Load objects
        var plotFactory = PlotFactory.getFactory();
        jsonData.plots.forEach((column, y)=>{
            gameStateData.plots[y] = [];
            column.forEach((plot, x)=>{
                gameStateData.plots[y][x] = plotFactory.create(plot.className, plot);
            });
        });

        return gameStateData;
    }
    save(gamestate: GamestateType){
        // turn data into persistable data
        var persistableData: any = {};

        // Copy data and replace everything that has to be re-written
        persistableData = Object.assign(persistableData, gamestate)
        persistableData.plots = [];

        // Write Plots
        gamestate.plots.forEach((column,y)=>{
            persistableData.plots[y] = [];
            column.forEach((plot, x)=>{
                persistableData.plots[y][x] = {
                    className: plot.className,
                    args: plot
                }
            });
        })

        writeFileSync(this.filename, JSON.stringify(persistableData));
    }
}