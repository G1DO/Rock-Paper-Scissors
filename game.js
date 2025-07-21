const choices = ['rock', 'paper', 'scissors'];
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const roundInfoElement = document.getElementById('round-info');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

// Get mode from URL (best of 3 or 5)
const urlParams = new URLSearchParams(window.location.search);
const mode = parseInt(urlParams.get('mode')) || 3; // default to 3

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    roundCount = roundCount + 1;

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
        playerScore++;
    } else {
        result = 'You lose!';
        computerScore++;
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    roundInfoElement.textContent = `Round ${roundCount}: You chose ${playerChoice}, Computer chose ${computerChoice}.`;
    resultElement.textContent = result;

    // Win condition based on mode (best of 3 or 5)
    if (playerScore >= Math.ceil(mode / 2) || computerScore >= Math.ceil(mode / 2)) {
        endGame();
    }
}

function endGame() {
    if (playerScore > computerScore) {
        resultElement.textContent = 'Congratulations! You won the game!';
    } else if (playerScore < computerScore) {
        resultElement.textContent = 'Sorry, you lost the game.';
    } else {
        resultElement.textContent = 'The game is a tie!';
    }
    document.getElementById('choices').style.display = 'none';
    restartButton.style.display = 'block';
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    roundInfoElement.textContent = '';
    resultElement.textContent = '';
    document.getElementById('choices').style.display = 'flex';
    restartButton.style.display = 'none';
}

restartButton.addEventListener('click', restartGame);

document.getElementById('rock').addEventListener('click', function () {
    playGame('rock');
});
document.getElementById('paper').addEventListener('click', function () {
    playGame('paper');
});
document.getElementById('scissors').addEventListener('click', function () {
    playGame('scissors');
});