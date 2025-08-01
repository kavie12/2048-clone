import Board from "./Board.js";

const boardElement = document.getElementById("board");
const sectionGameOver = document.getElementById("sectionGameOver");
const btnPlayAgain = document.getElementById("btnPlayAgain");

document.addEventListener("DOMContentLoaded", () => {
    // Initiate game
    const board = new Board(boardElement);
    board.init();

    // Handle inputs
    document.addEventListener("keydown", event => {
        // Stop sliding if the game is over
        if (board.isGameOver) {
            return;
        };

        if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
            board.slideLeft();
        } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
            board.slideRight();
        } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
            board.slideUp();
        } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
            board.slideDown();
        }

        // Show game over section if the game is over
        if (board.isGameOver) {
            sectionGameOver.classList.remove("hidden");
        };
    });

    // Handle play again
    btnPlayAgain.addEventListener("click", () => {
        board.reset();
        sectionGameOver.classList.add("hidden");
    });
});