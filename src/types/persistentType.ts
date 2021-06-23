import { entity } from "@google-cloud/datastore/build/src/entity";
import { readFileSync, existsSync, writeFileSync } from "fs";

export abstract class PersistentType {
    key: entity.Key | entity.Key[];
    filename: string;

    abstract persist(): boolean;
    abstract load(): boolean;
    
    persistToFile(data: string): boolean{
        writeFileSync(this.filename, data);
        return false;
    }

    loadFromFile(): string{
        if (existsSync(this.filename)) {
            let file = readFileSync(this.filename, 'utf8');
            return file;
        }

        return "";
    }
}