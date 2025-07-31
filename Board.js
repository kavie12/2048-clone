import Cell from "./Cell.js";

export default class Board {
    #cellMatrix;

    constructor(boardElement) {
        this.boardElement = boardElement;
        this.#cellMatrix = [];
    }

    init() {
        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                const cell = new Cell();
                row.push(cell);
                this.boardElement.append(cell.cellElement);
            }
            this.#cellMatrix.push(row);
        }

        this.#generateNewTile();
        this.#generateNewTile();
    }

    #generateNewTile() {
        if (this.#isGameOver()) {
            console.log("Game over");
            return;
        }

        if (!this.#isEmptyCellAvailable()) {
            console.log("No empty cell");
            return;
        }

        const value = Math.random() < 0.9 ? 2 : 4;
        
        let cellIndex = this.#generateRandomCellIndex();

        while (this.#cellMatrix[cellIndex.x][cellIndex.y].isTile()) {
            cellIndex = this.#generateRandomCellIndex();
        }

        this.#cellMatrix[cellIndex.x][cellIndex.y].value = value;
    }

    #generateRandomCellIndex() {
        const randomIndex = Math.floor(Math.random() * 16);
        return {
            x: randomIndex % 4,
            y: parseInt(randomIndex / 4)
        };
    }

    #isGameOver() {
        // Check is there's a possible move if no empty cell is available
        if (!this.#isEmptyCellAvailable()) {
            const matrix = [];
            for (const row of this.#cellMatrix) {
                const newRow = [];
                for (const cell of row) {
                    newRow.push(cell.value);
                }
                matrix.push(newRow);
            }

            const transposedMatrix = [];
            for (const rowIndex in this.#cellMatrix) {
                const newRow = [];
                for (const columnIndex in this.#cellMatrix[rowIndex]) {
                    newRow.push(this.#cellMatrix[columnIndex][rowIndex].value);
                }
                transposedMatrix.push(newRow);
            }

            return !this.#isSlidable(matrix) && !this.#isSlidable(transposedMatrix);
        }

        return false;
    }

    #isEmptyCellAvailable() {
        for (const row of this.#cellMatrix) {
            for (const cell of row) {
                if (!cell.isTile()) {
                    return true;
                }
            }
        }
        return false;
    }

    #isSlidable(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = matrix[i].filter(value => value !== null);
            for (let j = 0; j < matrix[i].length - 1; j++) {
                if (matrix[i][j] === matrix[i][j + 1]) {
                    return true;
                }
            }
        }
        return false;
    }

    slideLeft() {
        const matrix = [];

        for (const row of this.#cellMatrix) {
            const newRow = [];
            for (const cell of row) {
                newRow.push(cell.value);
            }
            matrix.push(newRow);
        }

        this.#slide(matrix);
        this.#drawMatrixValues(matrix);
        this.#generateNewTile();
    }

    slideRight() {
        const matrix = [];

        for (const row of this.#cellMatrix) {
            const newRow = [];
            for (const cell of row) {
                newRow.push(cell.value);
            }
            matrix.push(newRow.reverse());
        }

        this.#slide(matrix);
        for (const row of matrix) {
            row.reverse();
        }
        this.#drawMatrixValues(matrix);
        this.#generateNewTile();
    }

    slideUp() {
        const matrix = [];

        for (const rowIndex in this.#cellMatrix) {
            const newRow = [];
            for (const columnIndex in this.#cellMatrix[rowIndex]) {
                newRow.push(this.#cellMatrix[columnIndex][rowIndex].value);
            }
            matrix.push(newRow);
        }

        this.#slide(matrix);

        const newMatrix = [];
        for (const rowIndex in this.#cellMatrix) {
            const newRow = [];
            for (const columnIndex in this.#cellMatrix[rowIndex]) {
                newRow.push(matrix[columnIndex][rowIndex]);
            }
            newMatrix.push(newRow);
        }

        this.#drawMatrixValues(newMatrix);
        this.#generateNewTile();
    }

    slideDown() {
        const matrix = [];

        for (const rowIndex in this.#cellMatrix) {
            const newRow = [];
            for (const columnIndex in this.#cellMatrix[rowIndex]) {
                newRow.push(this.#cellMatrix[columnIndex][rowIndex].value);
            }
            matrix.push(newRow.reverse());
        }

        this.#slide(matrix);

        for (const row of matrix) {
            row.reverse();
        }

        const newMatrix = [];
        for (const rowIndex in this.#cellMatrix) {
            const newRow = [];
            for (const columnIndex in this.#cellMatrix[rowIndex]) {
                newRow.push(matrix[columnIndex][rowIndex]);
            }
            newMatrix.push(newRow);
        }

        this.#drawMatrixValues(newMatrix);
        this.#generateNewTile();
    }

    #slide(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            // Clear null values
            matrix[i] = matrix[i].filter(cell => cell !== null);

            // Sum up same values
            if (matrix[i].length >= 2) {
                for (let j = 0; j < matrix[i].length - 1; j++) {
                    if (matrix[i][j] === matrix[i][j + 1]) {
                        matrix[i][j] *= 2;
                        matrix[i][j + 1] = null;
                    }
                }
            }

            // Clear null values
            matrix[i] = matrix[i].filter(cell => cell !== null);

            // Fill null values
            while (matrix[i].length < 4) {
                matrix[i].push(null);
            }
        }
    }

    #drawMatrixValues(matrix) {
        for (const rowIndex in matrix) {
            for (const columnIndex in matrix[rowIndex]) {
                this.#cellMatrix[rowIndex][columnIndex].value = matrix[rowIndex][columnIndex];
            }
        }
    }
}