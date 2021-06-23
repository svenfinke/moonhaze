export interface IPlot{
    name: string
    progress: number
    className: string

    getGlyph(): string
    grow(): void
}

export class PlotArguments{
    progress: number
}

export class EmptyPlot implements IPlot{
    name: string = "empty"
    progress: number = 100
    className: string = "emptyPlot"

    constructor(args: PlotArguments){
        this.progress = args.progress;
    }

    getGlyph(): string{
        return '#';
    }
    grow(){
        // Do nothing
    }
}

export class PlotFactory{
    static plotFactory: PlotFactory;
    
    plotClasses: IPlot[] = [];

    static getFactory(): PlotFactory{
        if (!this.plotFactory) {
            this.plotFactory = new PlotFactory();
        }

        return this.plotFactory;
    }

    constructor(){
        this.register('emptyPlot', EmptyPlot);
    }
    
    register(className: string, classConstructor: CallableFunction): void{
        this.plotClasses[className] = classConstructor;
    }

    create(className: string, args: PlotArguments): IPlot{
        return new this.plotClasses[className](args);
    }
}