import { terminal } from "terminal-kit";
import { configServiceSingleton as configService } from "./configService";
import { gamestateServiceSingleton as gamestateService } from "./gamestateService";
import { pad } from "../utilities/renderUtilities";
import { IPrintable } from "../types/printable";

export class RenderService {

    renderPlayer(){
        let term = terminal;

        this.renderHeader();
    }

    renderGamestate(){
        let term = terminal;

        this.renderHeader();

        // Mock Farm Information
        let date = this.generateDate(gamestateService.data.day);
        let season = this.generateSeason(gamestateService.data.day);
        let farmname = gamestateService.data.farmname;
        let balance = `$ ${gamestateService.data.balance.toLocaleString("en-US")}`;
        let energy = `${gamestateService.data.energy}/${gamestateService.data.energyMax}`;

        // Render Farm Information
        term.left(2000)(farmname);
        term.left(2000).right(term.width - date.length)(date);
        term.down(1);
        term.left(2000)(farmname);
        term.left(2000).right(term.width - date.length)(season);       
        term.down(2);
        
        term.left(2000);
        term.saveCursor();
        term(balance);
    

        // Render inventory
        gamestateService.data.items.forEach((value)=>{
            term.down(1);
            term.left(2000);
            term(`${pad('       ', value.count.toString(), true)} | ${value.item.id}`);
        });
        
        // Render Plot
        term.restoreCursor();
        gamestateService.data.plots.forEach((value)=>{
            var line = '';
            value.forEach((value)=>{
                line += value.getGlyph();
            })
            term.left(2000).right(term.width - line.length).green(line);
            term.down(1);
        });

        term("\n");
    }

    renderTable(rows: IPrintable[], headers: string[] = []){
        let term = terminal;
        let columnWidth = 0;
        
        this.renderHeader();

        if (rows.length == 0) {
            term("No Data \n");
            return;
        }
        if (headers.length != 0) {
            columnWidth = Math.floor(term.width / headers.length);
        }

        if (columnWidth == 0) {
            columnWidth = Math.floor(term.width / rows[0].to_string_array().length);
        }

        rows.forEach((row)=>{
            let data = row.to_string_array();
            
            term.left(2000);
            term.down(1);
            data.forEach((col)=>{
                term(pad(columnWidth, col, false));
            });
        });

        term("\n");
    }

    private renderHeader(){
        let term = terminal;
        term.clear();
        // Header
        term.down(1);
        for (let index = 0; index < term.width; index++) {
            term("=");
        }
        term.down(2);
    }

    private generateDate(day: number): string{
        let days_per_year: number = configService.config.daysPerYear;
        // Generate human readable Date with year
        return `Day ${day%days_per_year}, Year ${Math.ceil(day/days_per_year)}`;
    }

    private generateSeason(day: number): string{
        let days_per_year: number = configService.config.daysPerYear;
        let season = Math.ceil(day / ((days_per_year) / 4)) % 4;

        switch(season){
            case 1: return 'Spring';
            case 2: return 'Summer';
            case 3: return 'Fall';
            case 0: return 'Winter';
            default: return 'Unicornish'
        }
    }
}

export const renderServiceSingleton = new RenderService();