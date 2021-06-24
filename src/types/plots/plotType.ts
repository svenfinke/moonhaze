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

export class PlotFactory{
    static plotFactory: PlotFactory;
    static getFactory(): PlotFactory{
        if (!this.plotFactory) {
            this.plotFactory = new PlotFactory();
        }

        return this.plotFactory;
    }

    plotClasses: IPlot[] = [];

    private constructor(){
    }
    
    register(className: string, classConstructor: CallableFunction): void{
        this.plotClasses[className] = classConstructor;
    }

    create(className: string, args: PlotArguments): IPlot{
        return new this.plotClasses[className](args);
    }
}