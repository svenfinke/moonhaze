import { Command } from "commander";
import { PlayerCommand } from "./commands/playerCommand";
import { ShopCommand } from "./commands/shopCommand";
import { FileRepository } from "./repositories/fileRepository";
import { InMemoryRepository } from "./repositories/inMemoryRepository";
import { RepositoryFactory } from "./repositories/repository";
import { ConfigService } from "./services/configService";
import { GamestateData, GamestateType } from "./types/gamestateType";

// Set Default Repository

let configService = ConfigService.getConfigService();
switch(configService.config.gamestateRepository) {
    case 'memory':
        RepositoryFactory.setRepository(new InMemoryRepository());
    default:
        RepositoryFactory.setRepository(new FileRepository('gamestate.json'));
}

let program = new Command();
program
    .option('-d, --debug', 'output extra debugging')

new PlayerCommand(program);
new ShopCommand(program);

program.parse(process.argv);
GamestateType.getGamestate().save();