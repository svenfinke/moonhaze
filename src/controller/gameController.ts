import { GamestateType } from "../types/gamestateType";
import { Controller } from "./controller";

export class GameController extends Controller{
    gamestate: GamestateType;

    constructor(){
        super()
        this.gamestate = new GamestateType();
        this.actions['index'] = this.indexAction.bind(this);
        this.actions['dashboard'] = this.dashboardAction.bind(this);
    }

    init(): void {
        this.gamestate.load();
    }

    shutdown(): void {
        this.gamestate.persist();
    }

    indexAction(): void{
        // Render Plot
        this.gamestate.data.plots.forEach((value)=>{
            var line = '';
            value.forEach((value)=>{
                // console.log(value);
                line += value.getGlyph();
            })
            console.log(line);
        })
    }

    dashboardAction(): void{
        
    }
}