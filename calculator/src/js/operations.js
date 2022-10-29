export function sum (num1) {
    return function (num2) {
        return Number(num1) + Number(num2)
    }
}
export function substract(num1) {
    return function (num2) {
        return Number(num1) + Number(num2)
    }
}
export function division(num1) {
    return function (num2) {
        return Number(num1) / Number(num2)
    }
}
export function multiply(num1) {
    return function (num2) {
        return Number(num1) * Number(num2)
    }
}
export function deleteLastCharacter(screen) {
    let newValue = screen.value.split("")
    newValue.pop()
    return newValue.join("")
}
