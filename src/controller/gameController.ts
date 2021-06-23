import { terminal, Terminal } from "terminal-kit";
import { GamestateType } from "../types/gamestateType";
import { Controller } from "./controller";

export class GameController extends Controller{
    gamestate: GamestateType;

    constructor(){
        super()
        this.gamestate = GamestateType.getGamestate();
        this.actions['dashboard'] = this.dashboardAction.bind(this);
        this.actions['index'] = this.indexAction.bind(this);
    }

    init(): void {
        this.gamestate.load();
    }

    shutdown(): void {
        this.gamestate.persist();
    }

    indexAction(): void{
        let term = terminal;
        term.clear();

        // Render Farm Information


        // Render Plot
        this.gamestate.data.plots.forEach((value)=>{
            var line = '';
            value.forEach((value)=>{
                // console.log(value);
                line += value.getGlyph();
            })
            term.green(line+"\n");
        });

        term.windowTitle("something AWESOME!");
    }

    dashboardAction(): void{
        
    }
}