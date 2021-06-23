export abstract class Controller{
    actions: { [ name: string ]: CallableFunction } = {};
    
    render(action: string, args?: {[name: string]:string}): void{
        this.actions[action]();
    }
}