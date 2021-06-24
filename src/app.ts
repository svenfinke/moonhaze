import { Command } from "commander";
import { PlayerCommand } from "./commands/playerCommand";
import { FileRepository } from "./repositories/fileRepository";
import { InMemoryRepository } from "./repositories/inMemoryRepository";
import { RepositoryFactory } from "./repositories/repository";
import { GamestateData, GamestateType } from "./types/gamestateType";

// Set Default Repository
RepositoryFactory.setRepository(new FileRepository('gamestate.json'));

let program = new Command();
program
    .option('-d, --debug', 'output extra debugging')
    .option('-m, --memory', 'use in-memory gamestate')
    .on('command:*', ()=>{ console.log('404: ERROR\nUnknown Command'); }) // Handle unknown command error better
    .on('option:memory', ()=>{ RepositoryFactory.setRepository(new InMemoryRepository()); });

let playerCommand = new PlayerCommand();
playerCommand.addCommand(program);

program.parse(process.argv);
GamestateType.getGamestate().save();