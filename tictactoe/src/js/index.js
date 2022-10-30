const board = document.querySelector("#board");
const modal = document.querySelector("#modal");
const slotsList = [];
const rows = [];
let movementsList = [];
let currentSlot;

let buttons = document.querySelectorAll(".option-button");

let player1, player2 = {
    active: false,
    value: ""
}
buttons = Array.from(buttons)
board.classList.add("disabled");

function clearProcess() {
    currentSlot.classList.add("disabled");
    currentSlot.removeEventListener("click", printValue);
    movementsList = movementsList.filter(elem => elem.id !== currentSlot.id)
    checkWinner()
}

function printValue(event){
    const target = event.target
    currentSlot = target;

    if(player1.active) {
        target.innerText = player1.value;
        player1.active = false;
        player2.active = true;
        clearProcess();
    }
    else {
        target.innerText = player2.value;
        player1.active = true;
        player2.active = false;
        clearProcess();
    }
}

function createSlots(){
    let subArr = [];
    for (let index = 0; index < 9; index++) {
        const slot = document.createElement("div");
        slot.id = `slot-${index}`
        slot.addEventListener("click", printValue)
        slotsList.push(slot);
        subArr.push(slot);
        if(subArr.length === 3) {
            rows.push(subArr);
            subArr = []
        }
    }
    movementsList = [...slotsList];
    board.append(...slotsList)
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max - min + 1))
}

function myEnemy() {
    if(movementsList.length >= 1) {
        const enemySlot = movementsList[randomNumber(0, movementsList.length - 1)]
        enemySlot.click()
    }
}

function checkWinner() {
    const combinations = rows.map(slots => {
        return slots.map(slot => slot.textContent).join("")
    })
    if(movementsList.length === 0) {
        alert("Empate, no hay ganador")
    }
    else if(combinations.some(combination => combination === player1.value.repeat(3))) {
        winnerProcess(player1, "Tu user")
    }
    else if(combinations.some(combination => combination === player2.value.repeat(3))) {
        winnerProcess(player2, "Computadora")
    }
}

function winnerProcess(player, playerName) {
    for (let i = 0; i < movementsList.length; i++) {
        const element = movementsList[i];
        element.removeEventListener("click", printValue)
    }
    movementsList = [];
    modal.classList.remove("invisible")

    modal.innerHTML = `<h2>Ha ganado ${playerName} ${player.value}</h2>`
}

createSlots();
buttons.map(((button) => {
    button.addEventListener("click", (e) => {
        const target = e.target;
        const value = target.textContent;
    })
}))