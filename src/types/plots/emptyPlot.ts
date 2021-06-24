import { IPlot, PlotArguments, PlotFactory } from "./plotType";

export class EmptyPlot implements IPlot{
    name: string = "empty"
    progress: number = 100
    className: string = "emptyPlot"

    constructor(args: PlotArguments){
        this.progress = args.progress;
    }

    getGlyph(): string{
        return "#";
    }
    grow(){
        // Do nothing
    }
}

let plotFactory = PlotFactory.getFactory();
plotFactory.register('emptyPlot', EmptyPlot);