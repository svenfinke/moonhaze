export abstract class Controller{
    actions: { [ name: string ]: CallableFunction } = {};
    
    render(action: string, args?: string[]): void{
        this.actions[action]();
    }
}