import { ConnectionHandler } from "./services/ConnectionHandler.js";
import { GameService } from "./services/GameService.js";

export class GameController {
    #states = {
        RIGHT : 0,
        BAD : 1,
       
    };
    #state = null;

    constructor(url, ui) {
        ConnectionHandler.init(url, () => {
            this.#state = this.#states.RIGHT;
            
            GameService.ui = ui;
            
        }, () => {
            this.#state = this.#states.BAD;
        });

    }
}