//--------------------------------------------------------------------------
'use strict';
//--------------------------------------------------------------------------

// variables
// dice
let diceNumber;
const diceEL = document.querySelector(`.dice`);

// players
let player0EL = document.querySelector(`.player--0`);
let player1EL = document.querySelector(`.player--1`);
let activePlayer;

// scores
let score0EL = document.getElementById(`score--0`);
let score1EL = document.getElementById(`score--1`);
let currentScore;
let scores;

// buttons
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnHelp = document.querySelector(`.open--modal`);

// playing
let playing;

//--------------------------------------------------------------------------

// funtions
// dice
const hideDice = function () {
  diceEL.classList.add(`hidden`);
};
const showDice = function () {
  diceEL.classList.remove(`hidden`);
};

// player change
const changeActivePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};

// starting (or resetting) game
const startGame = function () {
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  player0EL.classList.remove(`player--winner`);
  player1EL.classList.remove(`player--winner`);
  hideDice();
};

// show modal
const showModal = function () {
  document.querySelector(`.overlay`).classList.remove(`hidden`);
  document.querySelector(`.message`).classList.remove(`hidden`);
};
// hide modal
const hideModal = function () {
  document.querySelector(`.overlay`).classList.add(`hidden`);
  document.querySelector(`.message`).classList.add(`hidden`);
};
// hide popup
const hidePopup = function () {
  document.querySelector(`.popup`).classList.add(`hidden`);
};
//--------------------------------------------------------------------------

// start game
startGame();

//--------------------------------------------------------------------------

// buttons
// dice roll button
btnRoll.addEventListener(`click`, function () {
  // if score of both players is under 100 (playing = true)
  if (playing) {
    // roll dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // show dice and dice number
    diceEL.src = `dice-${diceNumber}.png`;
    showDice();

    // if you throw higher then one
    if (diceNumber !== 1) {
      // add dicenumber to current score
      currentScore += diceNumber;

      // add current score to current player score
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if you throw 1 then reset current player score and dice score
      // and make other player active
      changeActivePlayer();
    }
  }
});

// number hold button
btnHold.addEventListener(`click`, function () {
  // if score of both players is under 100 (playing = true)
  if (playing) {
    //  add current score to active player total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // if 100 is reached by a player

      // set score of the winning player to 100 and remove active player
      document.querySelector(`#score--${activePlayer}`).textContent = 100;

      // deactivate all buttons (new game button)
      playing = false;

      // declare winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      // remove active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // reset current player score

      // change player
      changeActivePlayer();
    }
  }

  // reset current (player) score after button is used and everything is calculated
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
});

// new (or reset) game button
btnNew.addEventListener(`click`, startGame);

// Help button
btnHelp.addEventListener(`click`, showModal);

// exit modal
document.querySelector(`.overlay`).addEventListener(`click`, hideModal);
document.querySelector(`.exit--modal`).addEventListener(`click`, hideModal);
addEventListener(`keydown`, function (e) {
  if (e.key === `Escape`) {
    if (!document.querySelector(`.message`).classList.contains(`hidden`))
      hideModal();
  }
});

// exit popup
document.querySelector(`.exit--popup`).addEventListener(`click`, function () {
  if (!document.querySelector(`.popup`).classList.contains(`hidden`))
    hidePopup();
});

//--------------------------------------------------------------------------
