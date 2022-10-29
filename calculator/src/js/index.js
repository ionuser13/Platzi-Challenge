import * as calculator from "./operations.js"
let result = 0;
let currentNumber = "";
let currentOperation;
let last;

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        printCharacter(e)
        currentNumber += e.target.textContent
    })
})
//sum
add.addEventListener("click", (e) => {
    printCharacter(e);
    // debugger
    if(currentOperation) {
        result += currentOperation(currentNumber)
        currentOperation = undefined;
    }
    else {
        currentOperation = calculator.sum(currentNumber)
    }
    currentNumber = "";
})
//sub
sub.addEventListener("click", (e) => {
    printCharacter(e);
    if(currentOperation) {
        result -= currentOperation(currentNumber)
        currentOperation = undefined;
    }
    else {
        currentOperation = calculator.substract(currentNumber)
    }
    currentNumber = "";
})
//divide
divider.addEventListener("click", (e) => {
    printCharacter(e);
    if(currentOperation){
        result /= currentOperation(currentNumber);
        currentOperation = undefined;
    }
    else{
        currentOperation = calculator.division(currentNumber)
    }
    currentNumber = ""
})
//multiplication
multi.addEventListener("click", (e) => {
    printCharacter(e)
    if(currentOperation) {
        result = 1;
        result *= currentOperation(currentNumber)
        currentOperation = undefined
    }
    else {
        currentOperation = calculator.multiply(currentNumber)
    }
    currentNumber = "";
    last = "multi"
})
//delete
del.addEventListener("click", () => {
    let newValue = calculator.deleteLastCharacter(screen)
    currentNumber = newValue
    if (result > 0) {
        currentNumber = Number(newValue)
    }
    screen.value = newValue;
})
delAll.addEventListener("click", () => {
    result = 0;
    currentNumber = "";
    currentOperation = undefined;
    screen.value = "";

})
equal.addEventListener("click", () => {
    if(currentOperation) {
        switch (last) {
            case "multi":
                result = currentOperation(currentNumber);
                break;
            default:
                break;
        }
        currentOperation = undefined;
        currentNumber = "";
    }
    if (currentNumber !== "") {
        result *= Number(currentNumber)
        currentNumber = "";
    }
    screen.value = result;
})

function printCharacter(event) {
    const target = event.target
    screen.value += target.textContent;
}