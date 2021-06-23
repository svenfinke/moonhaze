import { Command } from "commander";
import { GameController } from "./controller/gameController";
import { ControlerManager } from "./controllerManager/controllerManager";
import { GamestateType } from "./types/gamestateType";

let program = new Command();
program
    .option('-d, --debug', 'output extra debugging')
    .option('-m, --memory', 'use in-memory gamestate');

program.parse(process.argv);
let gamestate = GamestateType.getGamestate();
gamestate.load();

gamestate.persist();