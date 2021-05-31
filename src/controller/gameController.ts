import { Controller } from "./controller";

export class GameController extends Controller{
    constructor(){
        super()
        this.actions['index'] = this.indexAction;
        this.actions['dashboard'] = this.dashboardAction;
    }

    indexAction(){
        console.log('indexAction');
    }

    dashboardAction(){
        console.log('dashboardAction');
    }
}