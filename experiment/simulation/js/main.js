const letterSequence = []; // Array to store the letter sequence
let currentIndex = 0; // Current index in the letter sequence
let score = 0; // Current score
let n = 2; // Default value of n

// Array of letters to use in the test
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// DOM elements
const letterContainer = document.getElementById('letter-container');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const nInput = document.getElementById('n-input');
const startButton = document.getElementById('start-button');
const scoreSpan = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

// Event listeners
yesButton.addEventListener('click', handleYesClick);
noButton.addEventListener('click', handleNoClick);
startButton.addEventListener('click', handleStartClick);
resetButton.addEventListener('click', handleResetClick);

function handleYesClick() {
    if (checkAnswer('yes')) {
        score++;
        scoreSpan.innerText = score;
    }
}

function handleNoClick() {
    if (checkAnswer('no')) {
        score++;
        scoreSpan.innerText = score;
    }
}

function handleStartClick() {
    // Reset game state
    letterSequence.length = 0;
    currentIndex = 0;
    score = 0;
    scoreSpan.innerText = score;

    // Update n
    n = parseInt(nInput.value);

    // Generate letter sequence
    generateLetterSequence();

    // Show first letter
    showNextLetter();
}

function handleResetClick() {
    // Reset game state
    letterSequence.length = 0;
    currentIndex = 0;
    score = 0;
    scoreSpan.innerText = score;

    // Reset n
    nInput.value = n;

    // Clear letter display
    letterContainer.innerText = '';
}

function checkAnswer(answer) {
    if (currentIndex < n) {
        // Not enough letters have been shown yet
        return false;
    }

    const correctIndex = currentIndex - n;

    if (answer === 'yes') {
        return letterSequence[currentIndex] === letterSequence[correctIndex];
    } else if (answer === 'no') {
        return letterSequence[currentIndex] !== letterSequence[correctIndex];
    }
}

function generateLetterSequence() {
    // Generate random sequence of letters
    for (let i = 0; i < 15; i++) {
        letterSequence.push(letters[Math.floor(Math.random() * letters.length)]);
    }
}

function showNextLetter() {
    // Display next letter in sequence
    letterContainer.innerText = letterSequence[currentIndex];
    currentIndex++;

    // Schedule next letter to be shown after a delay
    setTimeout(showNextLetter, 2000);
}

