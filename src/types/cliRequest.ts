import { IRequest } from './request';

export class CliRequest implements IRequest{
    controller: string = "index";
    action: string = "index";
    parameters: {[name:string]:string} = {};

    constructor(argv: string[]){
        // Cut paths
        let args = argv.slice(2);
        if (args.length == 0) {
            return;
        }

        this.parse(args);
    }

    parse(args: string[]) {
        if (args[0] != "") {
            this.controller = args[0];

            if (args[1] != "") {
                this.controller = args[1];

                // Cut controller and action
                args = args.slice(2);
                while (args.length != 0) {
                    args = this.parseParameters(args);
                }
            }
        }
    }

    parseParameters(args: string[]): string[]{
        if (args[0].slice(0,2) == "--") {
            let param = args[0].slice(2).split("=");
            // --name value
            if (param.length == 1) {
                this.parameters[param[0]] = args[1];    
                return args.slice(2);       
            }
            // --name=value
            this.parameters[param[0]] = param[1];
        }
        return args.slice(1);
    }
}