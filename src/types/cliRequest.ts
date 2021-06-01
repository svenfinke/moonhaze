import { IRequest } from './request';

export class CliRequest implements IRequest{
    controller: string;
    action: string;
    parameters: {[name:string]:string}

    constructor(argv: string[]){
        let path = process.argv[2] ? process.argv[2] : '/';
        this.parsePath(path);
    }

    private parsePath(path: string){
        if (path[0] == '/') {
            path = path.slice(1);
        }

        let slicedPath = path.split('/');
        
        
        this.controller = slicedPath[0] ? slicedPath[0] : 'index';
        this.action = slicedPath[1] ? slicedPath[1] : 'index';
        this.parameters = {
            "something": "awesome"
        };
    }
}