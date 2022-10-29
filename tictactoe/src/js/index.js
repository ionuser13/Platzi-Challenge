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

function printValue(){
    
}