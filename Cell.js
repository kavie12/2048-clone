export default class Cell {
    #value;

    constructor() {
        this.cellElement = document.createElement("div");
        this.cellElement.className = "cell";

        this.#value = null;
    }

    set value(newValue) {
        // Do nothing if the value is not changed
        if (this.#value === newValue) {
            return;
        }

        // Remove previous class
        if (this.#value < 2048) {
            this.cellElement.classList.remove(`tile-${this.#value}`);
        } else {
            this.cellElement.classList.remove(`tile-2048`);
        }

        if (!newValue) {
            // If the new value is null
            this.cellElement.innerText = "";
            
        } else {
            // If the new value is not null
            this.cellElement.innerText = newValue;

            if (newValue < 2048) {
                this.cellElement.classList.add(`tile-${newValue}`);
            } else {
                this.cellElement.classList.add(`tile-2048`);
            }
        }

        this.#value = newValue;
    }

    get value() {
        return this.#value;
    }

    isTile() {
        return this.#value !== null;
    }

    reset() {
        this.value = null;
    }
}