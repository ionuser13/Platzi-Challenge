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

function myEnemy() {
    if(movementsList.length >= 1) {
        const enemySlot = movementsList[randomNumber(0, movementsList.length - 1)]
        enemySlot.click()
    }
}