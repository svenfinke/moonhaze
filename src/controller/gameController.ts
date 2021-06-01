import { GamestateType } from "../types/gamestateType";
import { Controller } from "./controller";

export class GameController extends Controller{
    gamestate: GamestateType;

    constructor(){
        super()
        this.actions['index'] = this.indexAction;
        this.actions['dashboard'] = this.dashboardAction;
    }

    init(): void {
        console.log('init');
        this.gamestate = new GamestateType();
        console.log(this.gamestate.load(), this.gamestate);
    }

    shutdown(): void {
        this.gamestate.persist();
    }

    indexAction(): void{
        console.log('indexAction');
        console.log(this.gamestate);
        this.gamestate.data.playerLevel = Math.random();
    }

    dashboardAction(): void{
        console.log('dashboardAction');
    }
}