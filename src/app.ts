import { Command } from "commander";
import { GameCommand } from "./commands/gameCommand";
import { PlayerCommand } from "./commands/playerCommand";
import { ShopCommand } from "./commands/shopCommand";
import { FileRepository } from "./repositories/fileRepository";
import { InMemoryRepository } from "./repositories/inMemoryRepository";
import { RepositoryFactory } from "./repositories/repository";
import { configServiceSingleton as configService } from "./services/configService";
import { gamestateServiceSingleton as gamestateService } from "./services/gamestateService";

// Set Default Repository
switch(configService.config.gamestateRepository) {
    case 'memory':
        RepositoryFactory.setRepository(new InMemoryRepository());
}

let program = new Command();
program
    .option('-d, --debug', 'output extra debugging')

new PlayerCommand(program);
new ShopCommand(program);
new GameCommand(program);

program.parse(process.argv);
gamestateService.save();