import { Board } from "../entities/Board.js";
import { ELEMENTS } from "../entities/Board.js";

export class GameService {
    #states = {
        WAITING: 0,
        PLAYING: 1,
        ENDED: 2
    };
    #ui = null;
    #players = [];
    board = [];
    #state = null;
    #actionsList = null;

    constructor() {
        this.#state = this.#states.WAITING;
        this.board = new Board();
        this.#actionsList = {
            "NEW_PLAYER": this.do_newPlayer.bind(this),
            "BOARD": this.do_newBoard.bind(this)
        };
    }
    set uiSetter(ui) {
        this.#ui = ui;
    }
    do(data) {
        this.#actionsList[data.type](data.content)
    };
    do_newPlayer(payload) {
        console.log('New player connected');
    };

    do_newBoard(payload) {
        // this.board.build(payload);
        // this.#ui.drawBoard();

        if (!payload || typeof payload.size !== "number" || !Array.isArray(payload.elements)) {
            console.error("Invalid payload for board:", payload);
            return;
        }

        this.board.build(payload);
        console.log("Board has been built:", this.board.board);

        if (this.#ui && typeof this.#ui.drawBoard === "function") {
            // Pass the built board to the UI
            this.#ui.drawBoard(this.board.board); 
        }
    }

    // Method that converts the board to be HTML-friendly
    getBoardHTML() {
        if (!this.board || !this.board.board) {
            return "Board not built.";
        }

        // Convert the board to HTML
        const rows = this.board.board.map(row =>
            `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('');

        return `<table>${rows}</table>`;
    }

}