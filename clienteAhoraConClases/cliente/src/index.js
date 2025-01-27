import { GameController } from "./GameController.js";
import {UIv1} from "./UIv1.js"
const game= new GameController("http://localhost:3000",UIv1);


// GameService instance to set up the game and render the board.
import { GameService } from './services/GameService.js';

const gameService = new GameService();

// Simulate building the board
gameService.board.build({
    size: 10,
    elements: [
        { x: 1, y: 6 },
        { x: 2, y: 1 },
        { x: 4, y: 6 },
        { x: 6, y: 8 },
        { x: 7, y: 2 },
        { x: 8, y: 7 }
    ]
});

// Render the board into the HTML
const boardContainer = document.getElementById('board-container');
boardContainer.innerHTML = gameService.getBoardHTML();

// Apply classes for styling
document.querySelectorAll('td').forEach((cell, index) => {
    const row = Math.floor(index / gameService.board.board.length);
    const col = index % gameService.board.board.length;
    const value = gameService.board.board[row][col];
    if (value === 5) cell.classList.add('bush');
    if (value === 1) cell.classList.add('player');
});