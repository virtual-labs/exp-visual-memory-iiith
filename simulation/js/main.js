const letterSequence = [];
let currentIndex = 0;
let score = 0;
let n = 2;
let totalTrials = 15;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const canvas = document.getElementById('letter-canvas');
const ctx = canvas.getContext('2d');

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
    disableButtons(); // Disable until next letter
    if (checkAnswer('yes')) {
        score++;
        scoreSpan.innerText = score;
    }
}

function handleNoClick() {
    disableButtons(); // Disable until next letter
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
    n = parseInt(nInput.value) || 2;
    generateLetterSequence();
    enableButtons();
    showNextLetter();
}

function handleResetClick() {
    letterSequence.length = 0;
    currentIndex = 0;
    score = 0;
    scoreSpan.innerText = score;
    nInput.value = n;
    clearCanvas();
    enableButtons();
}

function checkAnswer(answer) {
    if (currentIndex <= n) return false;

    const correctIndex = currentIndex - 1 - n;
    const currentLetter = letterSequence[currentIndex - 1];
    const nBackLetter = letterSequence[correctIndex];

    if (answer === 'yes') {
        return currentLetter === nBackLetter;
    } else if (answer === 'no') {
        return currentLetter !== nBackLetter;
    }
}

function generateLetterSequence() {
    for (let i = 0; i < totalTrials; i++) {
        letterSequence.push(letters[Math.floor(Math.random() * letters.length)]);
    }
}

function showNextLetter() {
    disableButtons(); // Prevent clicks before letter is drawn

    if (currentIndex < letterSequence.length) {
        const letter = letterSequence[currentIndex];
        drawLetter(letter);
        currentIndex++;

        // Enable buttons only during this 2-second window
        setTimeout(() => {
            enableButtons();
            setTimeout(() => {
                showNextLetter(); // Wait again before next letter
            }, 2000); // Show for 2 seconds before moving to next
        }, 200); // Slight delay before enabling buttons (adjustable)
    } else {
        drawLetter("Thank you");
        disableButtons();
    }
}


function drawLetter(letter) {
    clearCanvas();
    ctx.font = "60px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function disableButtons() {
    yesButton.disabled = true;
    noButton.disabled = true;
}

function enableButtons() {
    yesButton.disabled = false;
    noButton.disabled = false;
}
