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

    // TO BE IMPLEMENTED: Have to check possible moves
    #isGameOver() {
        for (const row of this.#cellMatrix) {
            for (const cell of row) {
                if (!cell.isTile()) return false;
            }
        }
        return true;
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
        for (let i = 0; i < 4; i++) {
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
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.#cellMatrix[i][j].value = matrix[i][j];
            }
        }
    }
}