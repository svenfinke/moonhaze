import { GamestateType } from "../types/gamestateType";
import { Controller } from "./controller";

export class GameController extends Controller{
    gamestate: GamestateType;

    constructor(){
        super()
        this.gamestate = GamestateType.getGamestate();
        this.actions['dashboard'] = this.dashboardAction.bind(this);
    }

    dashboardAction(): void{
        
    }
}