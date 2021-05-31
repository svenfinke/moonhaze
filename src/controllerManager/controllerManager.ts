import { Controller } from "../controller/controller";

export class ControlerManager{
    controllers: { [path: string]: Controller } = {};
    
    registerController(path: string, controller:Controller): void{
        this.controllers[path] = controller;
    }

    render(path: string): void{
        let parsedPath = this.parsePath(path);
        this.controllers[parsedPath.controller]
            .render(parsedPath.action, parsedPath.arguments);
    }

    private parsePath(path: string): {
        controller:string,
        action: string,
        arguments: string[]
    }{
        if (path[0] == '/') {
            path = path.slice(1);
        }

        let slicedPath = path.split('/');
        
        return {
            controller: slicedPath[0] ? slicedPath[0] : 'index',
            action: slicedPath[1] ? slicedPath[1] : 'index',
            arguments: slicedPath.slice[2] ? slicedPath.slice[2] : []
        };
    }
}