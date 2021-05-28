import { Controller } from "./controller";

export class GameController extends Controller{
    constructor(){
        super()
        this.methods['index'] = this.indexAction;
    }
    indexAction(){
        console.log('indexAction');
    }
}