const colors = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let userSequence = [];
let level = 1;

var sounds = {
    greenBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    redBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blueBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    yellowBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

function startGame() {
    sequence = [];
    userSequence = [];
    level = 1;
    generateSequence();
    playSequence();

    document.getElementById('level').innerText = level;
    // disable start button
    document.getElementById('start-btn').disabled = true;
    document.getElementById('start-btn').classList.add('disabled');
}

function generateSequence() {
    //   for (let i = 0; i < level; i++) {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    //   }
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        highlightButton(sequence[i]);
        sounds[sequence[i] + 'Box'].currentTime = 0;
        sounds[sequence[i] + 'Box'].play();
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
        }
    }, ((1000 - level * 10) > 100 ? (1000 - level * 10) : 100));
}

function highlightButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = '0.5';
    setTimeout(() => {
        button.style.opacity = '1';
    }, 350);
}

function handleClick(color) {
    const button = document.getElementById(color);
    button.style.opacity = '0.5';
    sounds[color + 'Box'].currentTime = 0;
    sounds[color + 'Box'].play();
    setTimeout(() => {
        button.style.opacity = '1';
        userSequence.push(color);
        checkSequence();
    }, 50);
}

function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            alert('Game Over! Try again.');
            startGame();
            return;
        }
    }

    if (userSequence.length === sequence.length) {
        alert('Good job! Next level.');
        userSequence = [];
        level++;
        document.getElementById('level').innerText = level;
        generateSequence();
        setTimeout(() => {
            playSequence();
        }, 1000);
    }
}