import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
    // Initiate game
    const board = new Board(document.getElementById("board"));
    board.init();

    // Handle inputs
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            board.slideLeft();
        } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            board.slideRight();
        } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
            board.slideUp();
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
            board.slideDown();
        }
    });
});