const boxes = document.querySelectorAll('.box');
const msg = document.getElementById('msg');
const msgContainer = document.querySelector('.msg-container');
const newBtn = document.getElementById('new-btn');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleBoxClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase(), 'disabled');
        
        if (checkWin()) {
            msg.textContent = `Player ${currentPlayer} Wins!`;
            msgContainer.classList.remove('hide');
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            msg.textContent = "It's a Draw!";
            msgContainer.classList.remove('hide');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            msg.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    msg.textContent = `Player ${currentPlayer}'s Turn`;
    msgContainer.classList.add('hide');
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('x', 'o', 'disabled');
    });
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);