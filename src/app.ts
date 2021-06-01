import { GameController } from "./controller/gameController";
import { ControlerManager } from "./controllerManager/controllerManager";
import { CliRequest } from "./types/cliRequest";

let controllerManager = new ControlerManager();
let gameController = new GameController()
controllerManager.registerController('game', gameController);
controllerManager.registerController('index', gameController);

let request = new CliRequest(process.argv);

controllerManager.render(request);