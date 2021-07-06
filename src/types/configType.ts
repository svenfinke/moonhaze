export class ConfigType {
    gamestateRepository: string = "file"
    daysPerYear: number = 84;

    // Initial Values
    startingBalance: number = 200;
    startingPlotCount: number = 12;
    
    /*DEPRECATED*/ startingPlotRows: number = 5;
    /*DEPRECATED*/ startingPlotColumns: number = 25;
}