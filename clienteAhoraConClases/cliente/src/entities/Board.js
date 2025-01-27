export const ELEMENTS = {
    bush: 5,
    player: 1,
};
export class Board {
    #board = null;
    #states = {
        NO_BUILD: 0,
        BUILD: 1
    }
    #state = null;

    constructor() {
        this.#state = this.#states.NO_BUILD;


    }

    build(payload) {
        if (payload !== undefined) {
            const { size, elements } = payload;
            this.#board = new Array(size);

            //fill array with zeros 0
            // this.#board.forEach(element => element = new Array(size).fill(0));
            // Initialize a 2D array filled with 0
            this.#board = new Array(size).fill(null).map(() => new Array(size).fill(0));

            // Place bushes in the board
            elements.forEach(element => {
                this.#board[element.x][element.y] = ELEMENTS.bush;
            });
            // change the zeros 0 for fives 5 where there is a bush, the coordinates of the bush are in the array 'elements'
            elements.forEach(element => this.#board[element.x][element.y] = ELEMENTS.bush);

            // Make the corners available for players
            const corners = [
                { x: 0, y: 0 },
                { x: size - 1, y: 0 },
                { x: 0, y: size - 1 },
                { x: size - 1, y: size - 1 }
            ];

            corners.forEach(corner => {
                // Ensure the corner is not occupied
                if (this.#board[corner.x][corner.y] === 0) {
                    this.#board[corner.x][corner.y] = ELEMENTS.player;
                }
            });

            this.#state = this.#states.BUILD;
        } else {
            console.log('It is undefined');
        }
    }

    get board() {
        if (this.#state === this.#states.BUILD) {
            return this.#board;
        } return undefined;
    }
}