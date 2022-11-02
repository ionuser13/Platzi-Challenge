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
    [6, 4, 2]
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
        if(!checkWin(originBoard, player) && !checkTie()) turn(bestSpot(), computer)
    }
}

function turn(squareId, user) {
    originBoard[squareId] = user;
    document.getElementById(squareId).innerText = user;
    let gameWon = checkWin(originBoard, user)
    if(gameWon) gameOver(gameWon);
} 
function checkWin(board, user) {
    let plays = board.reduce((a, e, i) => (e === user) ? a.concat(i) : a, []);// finds every index that the player has played in
    let gameWon = null;
    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: user};
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
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
    return originBoard.filter(s => typeof s == "number")
}
function bestSpot() {
    return minimax(originBoard, computer).index;
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

function minimax(newBoard, user) {
    let freeSpots = emptySquares();
    if(checkWin(newBoard, player)) {
        return {score: -10}
    }
    else if(checkWin(newBoard, computer)){
        return {score: 10}
    }
    else if(freeSpots.length === 0) {
        return {score: 0}
    }
    let moves = [];
    for(let i = 0; i < freeSpots.length; i++){
        let move = {};
        move.index = newBoard[freeSpots[i]];
        newBoard[freeSpots[i]] = user;

        if(user == computer) {
            let result = minimax(newBoard, player);
            move.score = result.score;
        }
        else {
            let result = minimax(newBoard, computer);
            move.score = result.score;
        }

        newBoard[freeSpots[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if(user === computer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = i;
            }
        }   
    }

    return moves[bestMove];
}