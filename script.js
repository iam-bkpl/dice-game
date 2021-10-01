'use strict';

//Selecting Players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

//Selecting Buttons
const diseEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let playing = true;
//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayer = 0;
diseEl.classList.add('hidden');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diseEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Adding click event
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display the dice
    diseEl.classList.remove('hidden');
    diseEl.src = `dice-${dice}.png`;

    //Check for rolled 1 : if true change to next player
    if (dice !== 1 && dice !== 6) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Change to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if the score is >100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diseEl.classList.add('hidden');
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
