
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".game--status");
const restartBtn = document.querySelector(".game--restart");
const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let playerSymbol = "";
let currentPlayer = ""; 
initializeGame();
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = "Choose your symbol to start!";
}


function chooseSymbol(symbol) {
    playerSymbol = symbol;
    currentPlayer = "Player 1";
    document.getElementById("box").classList.add("hidden");

    statusText.textContent = `${currentPlayer}'s turn (${playerSymbol})`;
    running = true;
}

function cellClick() {
    const cellIndex = this.getAttribute("data-cell-index");
    if (options[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
    if (running) changePlayer();
}

function updateCell(cell, index) {
    let symbol = currentPlayer === "Player 1" ? playerSymbol : (playerSymbol === "X" ? "O" : "X");
    options[index] = symbol;
    cell.textContent = symbol;
}

function changePlayer() {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    statusText.textContent = `${currentPlayer}'s turn `;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        let symbol = currentPlayer === "Player 1" ? playerSymbol : (playerSymbol === "X" ? "O" : "X");
        statusText.textContent = `${currentPlayer} wins! (${symbol})`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    running = false;
    document.getElementById("box").classList.remove("hidden");

    playerSymbol = "";
    currentPlayer = "";
    statusText.textContent = "Choose your symbol to start!";
}


