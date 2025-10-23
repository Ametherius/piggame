'use strict';
// Set Global Variables
// Buttons
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');

// Score Elements
let player0Score = document.getElementById('score--0');
let player1Score = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

let currentScore, playing, activePlayer, scores;

const init = function() {
    player0Score.textContent = 0;
    player1Score.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    diceEl.classList.add('hidden');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
}

init();

const switchPlayer = function() {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

btnRollDice.addEventListener('click', function() {
    if (playing)  { 
        // Generate dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
        // Switch to next player
        switchPlayer();
    }
}
})

btnHold.addEventListener('click', function() {

    if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`player--${activePlayer}`)
            .classList.remove('.player--active');
    } else {
        switchPlayer();
    }
}
})

btnNewGame.addEventListener('click', init);