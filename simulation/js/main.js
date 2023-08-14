const letterSequence = []; 
let currentIndex = 0; 
let score = 0; 
let n = 2; 

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const letterContainer = document.getElementById('letter-container');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const nInput = document.getElementById('n-input');
const startButton = document.getElementById('start-button');
const scoreSpan = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

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
    letterSequence.length = 0;
    currentIndex = 0;
    score = 0;
    scoreSpan.innerText = score;
    n = parseInt(nInput.value);
    generateLetterSequence();
    showNextLetter();
}

function handleResetClick() {
    letterSequence.length = 0;
    currentIndex = 0;
    score = 0;
    scoreSpan.innerText = score;
    nInput.value = n;
    letterContainer.innerText = '';
}

function checkAnswer(answer) {
    if (currentIndex < n) {
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
    for (let i = 0; i < 15; i++) {
        letterSequence.push(letters[Math.floor(Math.random() * letters.length)]);
    }
}

function showNextLetter() {
    if (currentIndex < letterSequence.length) {
        letterContainer.innerText = letterSequence[currentIndex];
        currentIndex++;
        setTimeout(showNextLetter, 2000);
    } else {
        letterContainer.innerText = "Thank you";
    }
}

