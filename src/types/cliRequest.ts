import { IRequest } from './request';

export class CliRequest implements IRequest{
    controller: string = "index";
    action: string = "index";
    parameters: {[name:string]:string} = {};

    constructor(argv: string[]){
        let args = argv.slice(2);
        if (args.length == 0) {
            return;
        }

        this.parse(args);
    }

    private parse(args: string[]) {
        this.controller = args[0];

        if (args[1] != "") {
            this.action = args[1];

            args = args.slice(2);
            while (args.length != 0) {
                args = this.parseParameters(args);
            }
        }
    }

    private parseParameters(args: string[]): string[]{
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