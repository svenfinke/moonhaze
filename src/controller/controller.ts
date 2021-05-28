export abstract class Controller{
    methods: { [ name: string ]: CallableFunction } = {};
    
    render(method: string): void{
        console.log("GameControllerThingy");
        this.methods[method]();
    }
}