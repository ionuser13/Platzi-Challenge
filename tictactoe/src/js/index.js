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
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
    }
}
function turnClick(square) {
    if(typeof originBoard[square.target.id] == "number") {
        turn(square.target.id, player);
        if(!checkTie()) turn(bestSpot(), computer)
    }
}

function turn(squareId, player) {
    originBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(originBoard, player)
    if(gameWon) gameOver(gameWon);
} 
function checkWin(board, player) {
    let plays = board.reduce((acumulator, element, index) => (element ===player)?acumulator.concat(index): acumulator, []);// finds every index that the player has played in
    let gameWon = null;
    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for(let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == player ? "blue": "red";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false)
    }
    declareWinner(gameWon.player == player ? "You win!": "You lose!")
}
//determinate the winner and show winner box
function emptySquares() {
    return originBoard.filter(s => typeof s == "number")
}
function bestSpot() {
    return emptySquares()[0]
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}
function checkTie() {
    if(emptySquares().length == 0) {
        for(let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener("click", turnClick, false)
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false
}