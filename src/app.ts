import { GameController } from "./controller/gameController";
import { ControlerManager } from "./controllerManager/controllerManager";

let controllerManager = new ControlerManager();
let gameController = new GameController()
controllerManager.registerController('game', gameController);
controllerManager.registerController('index', gameController);

let path = process.argv[2] ? process.argv[2] : '/';

controllerManager.render(path);