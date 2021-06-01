export interface IRequest{
    controller: string;
    action: string;
    parameters:{[name:string]:string}
}