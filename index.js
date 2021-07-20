function makeSound (color) {
    switch (color) {
        case 'green':
            const greenSound = new Audio('sounds/green.mp3');
            greenSound.play();
            break;
        case 'red':
            const redSound = new Audio('sounds/red.mp3');
            redSound.play();
            break;
        case 'yellow':
            const yellowSound = new Audio('sounds/yellow.mp3');
            yellowSound.play();
            break;
        case 'blue':
            const blueSound = new Audio('sounds/blue.mp3');
            blueSound.play();
            break;
        case 'wrong':
            const wrongSound = new Audio('sounds/wrong.mp3');
            wrongSound.play();
            break;
        default:
            console.log();
    }
}

function wrongButton () {
    makeSound('wrong');
    body.addClass('game-over')
    setTimeout(function () {$('body').removeClass('game-over');}, 100);
    $('h1').text('Game Over, Press Any key to Restart');
    body.on('keydown');

}

function buttonAnimation(currentButton) {
    const activeButton = $('#' + currentButton)
    activeButton.addClass('pressed')
    setTimeout(function () {activeButton.removeClass('pressed');
    }, 100);
}

const colorOptions = ['green', 'red', 'yellow', 'blue'];
function pickRandomColor () {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
}

let level = 1;
function scoreboard () {
    $('#level-title').text('Level ' + level);
    level++;
}

const timer = ms => new Promise( res => setTimeout(res, ms))
async function computersTurn(colors) {
    for (let i = 0; i < colors.length; i++) {
        makeSound(colors[i]);
        buttonAnimation(colors[i]);
        await timer(1000);
    }
}

function playersTurn (colors) {
    let selectedButton = 0
    let playerSelection = ''
    $('.button').click(function () {
        makeSound(this.id);
        buttonAnimation(this.id);
        playerSelection = this.id;
    });
    // if (colors[0] != playerSelection) {
    //
    // }
}


function beginGame () {
    body.off('keydown');
    colorSequence = [];
    playing = 0;
    while (playing < 5) {
        scoreboard();
        colorSequence.push(pickRandomColor());
        computersTurn(colorSequence).then();
        playersTurn(colorSequence);
        playing++;
    }
    wrongButton();
}

let playing = false;
let colorSequence = '';
let body = $('body')

body.keydown( beginGame );



