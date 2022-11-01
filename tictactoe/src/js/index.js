let originBoard;
const player = "O";
const computer = "X";
const winCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
]
const cells = document.querySelectorAll(".cell"); 
startGame();
//set up functionality to put x/o on display whenever we click
function startGame(){
    document.querySelector(".endgame").style.display = "none";
    originBoard = Array.from(Array(9).keys());//makes the array to be every number from 0 to 9
    for (let i = 0; i < cells.length; i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty("background.color");
        cells[i].addEventListener("click", turnClick, false);
    }
}
function turnClick(square) {
    turn(square.target.id, player);
}

function turn(squareId, player) {
    originBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
} 