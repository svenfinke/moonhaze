import { GameController } from "./controller/gameController";
import { ControlerManager } from "./controllerManager/controllerManager";

let controllerManager = new ControlerManager();
controllerManager.registerController('/', new GameController());

controllerManager.render('/');