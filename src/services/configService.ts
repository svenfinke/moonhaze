import { ConfigType } from "../types/configType";

export class ConfigService{
    // SINGLETON
    private static configService;
    static getConfigService():ConfigService {
        if (!this.configService) {
            this.configService = new ConfigService();
        }
        return this.configService;
    }
    private constructor(){
        this.config = new ConfigType();
    }

    config: ConfigType;
}