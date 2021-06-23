import { GameController } from "./controller/gameController";
import { ControlerManager } from "./controllerManager/controllerManager";
import { CliRequest } from "./types/cliRequest";
import { GamestateType } from "./types/gamestateType";

let request = new CliRequest(process.argv);
let controllerManager = new ControlerManager();
let gamestate = GamestateType.getGamestate();
gamestate.load();

let gameController = new GameController()
controllerManager.registerController('game', gameController);
controllerManager.registerController('index', gameController);
controllerManager.render(request);

gamestate.persist();