import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initiate game
    const board = new Board(document.getElementById("board"));
    board.init();

    // Handle inputs
    document.addEventListener("keydown", event => {
        if (board.isGameOver) return;

        if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
            board.slideLeft();
        } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
            board.slideRight();
        } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
            board.slideUp();
        } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
            board.slideDown();
        }
    });
});