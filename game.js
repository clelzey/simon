const body = $('body');
const instructions = $('#instructions')
const buttonColors = ['green', 'red', 'yellow', 'blue'];
const timer = ms => new Promise(res => setTimeout(res, ms));
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function makeSound(color) {
    const audio = new Audio('sounds/' + color + '.mp3');
    audio.play().then();
}

function buttonAnimation(currentButton) {
    const activeButton = $('#' + currentButton)
    activeButton.addClass('pressed')
    setTimeout(function () {
        activeButton.removeClass('pressed');
    }, 100);
}

function nextSequence() {
    userClickedPattern = []
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $('#level-title').text('Level ' + level);
}

async function computersTurn() {
    setTimeout(function () {body.addClass('computer-turn')}, 100);
    instructions.text('Watch!');
    for (let i = 0; i < gamePattern.length; i++) {
        makeSound(gamePattern[i]);
        $('#' + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        await timer(1000);
    }
    body.removeClass('computer-turn');
    instructions.text('Play!');
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                computersTurn().then();
            }, 1500);
        }
    } else {
        startOver();
        makeSound('wrong');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        body.addClass('game-over');
        instructions.text('')
        setTimeout(function () {
            body.removeClass('game-over');
        }, 200);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$('.button').click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    buttonAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

body.keypress(function () {
    if (!started) {
        started = true
        nextSequence();
        computersTurn().then();
    }
});