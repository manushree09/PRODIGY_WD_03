const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
const resetButton = document.getElementById('reset');
let isXNext = true;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) return;

    board[index] = isXNext ? 'X' : 'O';
    e.target.textContent = board[index];
    checkWinner();
    isXNext = !isXNext;
    updateStatus();
};

const checkWinner = () => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusDiv.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        statusDiv.textContent = "It's a tie!";
        return;
    }
};

const updateStatus = () => {
    statusDiv.textContent = gameActive ? `Player ${isXNext ? 'X' : 'O'}'s turn` : statusDiv.textContent;
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isXNext = true;
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    updateStatus();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateStatus();
