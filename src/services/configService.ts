import { ConfigType } from "../types/configType";

export class ConfigService{
    constructor(){
        this.config = new ConfigType();
    }

    config: ConfigType;
}

export const configServiceSingleton = new ConfigService();