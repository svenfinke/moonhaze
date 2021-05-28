import { Controller } from "../controller/controller";

export class ControlerManager{
    controllers: { [path: string]: Controller } = {};
    
    registerController(path: string, controller:Controller): void{
        this.controllers[path] = controller;
    }

    render(path: string): void{
        this.controllers[path].render('index');
    }
}