import { Controller } from "../controller/controller";
import { IRequest } from "../types/request";

export class ControlerManager{
    controllers: { [path: string]: Controller } = {};
    
    registerController(path: string, controller:Controller): void{
        this.controllers[path] = controller;
    }

    render(request: IRequest): void{
        let controller = this.controllers[request.controller];

        controller.init();
        controller.render(request.action, request.parameters);
        controller.shutdown();
    }
}