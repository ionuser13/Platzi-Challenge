class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {

    }
    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {

    }
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})