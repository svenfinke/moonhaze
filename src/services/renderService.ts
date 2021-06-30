import { GamestateType } from "../types/gamestateType";
import { terminal, Terminal } from "terminal-kit";
import { ConfigService } from "./configService";

export class RenderService {
    configService: ConfigService;

    constructor(){
        this.configService = ConfigService.getConfigService();
    }

    renderGamestate(){
        let gamestate = GamestateType.getGamestate();
        let linePos = 0;
        let term = terminal;
        term.clear();

        // Mock Farm Information
        let date = this.generateDate(gamestate.data.day);
        let season = this.generateSeason(gamestate.data.day);
        let farmname = gamestate.data.farmname;
        let balance = `$ ${gamestate.data.balance.toLocaleString("en-US")}`;

        // Render Farm Information
        term(farmname);
        term.moveTo((term.width - date.length), 1, date);
        term.moveTo((term.width - season.length), 2, season);        

        term.moveTo(1, 6, balance);

        linePos = 7;
        gamestate.data.items.forEach((value)=>{
            term.moveTo(
                1, 
                linePos, 
                `${this.pad('       ', value.count.toString(), true)} | ${value.item.id}`
            );
            linePos++;
        });
        
        // Render Plot
        linePos = 5;
        gamestate.data.plots.forEach((value)=>{
            var line = '';
            value.forEach((value)=>{
                // console.log(value);
                line += value.getGlyph();
            })
            term.moveTo.green((term.width - line.length), linePos, line);
            linePos++;
        });

        term("\n");
    }

    private generateDate(day: number): string{
        let days_per_year: number = this.configService.config.daysPerYear;
        // Generate human readable Date with year
        return `Day ${day%days_per_year}, Year ${Math.ceil(day/days_per_year)}`;
    }

    private generateSeason(day: number): string{
        let days_per_year: number = this.configService.config.daysPerYear;
        let season = Math.ceil(day / ((days_per_year) / 4)) % 4;

        switch(season){
            case 1: return 'Spring';
            case 2: return 'Summer';
            case 3: return 'Fall';
            case 0: return 'Winter';
            default: return 'Unicornish'
        }
    }

    private pad(pad: string, str: string, padLeft: boolean) {
        if (typeof str === 'undefined') 
            return pad;
        if (padLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }
}