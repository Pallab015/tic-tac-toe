// গেমের ভেরিয়েবল
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

// জয়ের কম্বিনেশন
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // সারি
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // কলাম
    [0, 4, 8], [2, 4, 6]             // কর্ণ
];

// DOM এলিমেন্ট
const gameBoardElement = document.getElementById('game-board');
const gameStatusElement = document.getElementById('game-status');
const resetButton = document.getElementById('reset-btn');
const newGameButton = document.getElementById('new-game-btn');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');
const playerXInfo = document.querySelector('.player-x');
const playerOInfo = document.querySelector('.player-o');

// গেম বোর্ড শুরু করুন
function initializeGameBoard() {
    gameBoardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoardElement.appendChild(cell);
    }
    
    updateGameStatus("খেলা শুরু করুন! প্রথম খেলোয়াড় X");
    updatePlayerTurn();
}

// ঘর ক্লিক হ্যান্ডেল করুন
function handleCellClick(index) {
    // চেক করুন ঘর খালি আছে কিনা এবং গেম সক্রিয় কিনা
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }
    
    // গেম বোর্ড আপডেট করুন
    gameBoard[index] = currentPlayer;
    
    // UI আপডেট করুন
    const cellElement = document.querySelector(`.cell[data-index="${index}"]`);
    cellElement.textContent = currentPlayer;
    cellElement.classList.add(currentPlayer.toLowerCase());
    
    // জয় বা ড্র চেক করুন
    if (checkWin()) {
        gameActive = false;
        updateGameStatus(`অভিনন্দন! খেলোয়াড় ${currentPlayer} জিতেছেন!`);
        updateScore();
        highlightWinningCells();
        return;
    }
    
    if (checkDraw()) {
        gameActive = false;
        updateGameStatus("খেলা ড্র হয়েছে!");
        return;
    }
    
    // খেলোয়াড় পাল্টান
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus(`খেলোয়াড় ${currentPlayer}-এর পালা`);
    updatePlayerTurn();
}

// জয় চেক করুন
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (
            gameBoard[a] !== '' &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            return true;
        }
    }
    
    return false;
}

// ড্র চেক করুন
function checkDraw() {
    return !gameBoard.includes('');
}

// গেম স্ট্যাটাস আপডেট করুন
function updateGameStatus(message) {
    gameStatusElement.textContent = message;
    
    // বিজয়ী ক্লাস যোগ করুন যদি গেম জিতেছে
    if (message.includes("জিতেছেন")) {
        gameStatusElement.classList.add("winner");
    } else {
        gameStatusElement.classList.remove("winner");
    }
}

// খেলোয়াড়ের পালা নির্দেশক আপডেট করুন
function updatePlayerTurn() {
    if (currentPlayer === 'X') {
        playerXInfo.classList.add('active');
        playerOInfo.classList.remove('active');
    } else {
        playerOInfo.classList.add('active');
        playerXInfo.classList.remove('active');
    }
}

// স্কোর আপডেট করুন
function updateScore() {
    scores[currentPlayer]++;
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

// জয়ী ঘরগুলো হাইলাইট করুন
function highlightWinningCells() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (
            gameBoard[a] !== '' &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            document.querySelector(`.cell[data-index="${a}"]`).style.backgroundColor = '#C8E6C9';
            document.querySelector(`.cell[data-index="${b}"]`).style.backgroundColor = '#C8E6C9';
            document.querySelector(`.cell[data-index="${c}"]`).style.backgroundColor = '#C8E6C9';
            break;
        }
    }
}

// গেম রিসেট করুন (স্কোর রাখুন)
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    
    // ঘরগুলো ক্লিয়ার করুন
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '';
    });
    
    updateGameStatus("খেলা শুরু করুন! প্রথম খেলোয়াড় X");
    updatePlayerTurn();
}

// নতুন গেম শুরু করুন (স্কোরও রিসেট করুন)
function newGame() {
    scores = { X: 0, O: 0 };
    scoreXElement.textContent = '0';
    scoreOElement.textContent = '0';
    resetGame();
}

// ইভেন্ট লিসেনার যোগ করুন
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);

// গেম শুরু করুন
initializeGameBoard();