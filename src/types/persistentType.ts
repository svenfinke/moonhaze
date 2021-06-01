import { entity } from "@google-cloud/datastore/build/src/entity";
import { readFileSync, existsSync, writeFileSync } from "fs";

export abstract class PersistentType {
    key: entity.Key | entity.Key[];
    data: any;
    filename: string;

    abstract persist(): boolean;
    abstract load(): boolean;
    
    persistToFile(): boolean{
        let jsonString = JSON.stringify(this.data)
        writeFileSync(this.filename, jsonString);
        return false;
    }

    loadFromFile(): boolean{
        if (existsSync(this.filename)) {
            let file = readFileSync(this.filename, 'utf8');
            let jsonString = "";
            this.data = JSON.parse(file);
            return true;
        }

        return false;
    }
}