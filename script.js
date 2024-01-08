'use strict';

document.addEventListener("DOMContentLoaded", setUp)

const  player0 = {
    score : document.getElementById("score--0"),
    currentScore : document.getElementById("current--0"),
    section : document.querySelector(".player--0")
}

const player1 = {
    score : document.getElementById("score--1"),
    currentScore : document.getElementById("current--1"),
    section:  document.querySelector(".player--1")
}

const dice = document.querySelector(".dice")
const diceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new")
const MIN_SCORE = 0;

let activePlayer = player0;
let indexActivePlayer = 1; 

function resetToDefault() {
   player0.score.innerHTML = MIN_SCORE;
   player1.score.innerHTML = MIN_SCORE;
   activePlayer.section.classList.remove("player--winner")
   activePlayer.section.classList.remove("name")
   dice.style.visibility = "hidden";
   indexActivePlayer = 1; 
   switchPlayerActive(indexActivePlayer);
   showHoldAndDiceButtons();
}

function rollDice() {
    dice.src= generateRandomDice();
    dice.style.visibility = "visible";
}

function generateRandomDice() {
    let randomDiceNumber = generateRandomNumber();
    activePlayer.currentScore.innerHTML = Number(activePlayer.currentScore.innerHTML) + randomDiceNumber;
    switch(randomDiceNumber) {
        case 1 :
            switchPlayerActive(indexActivePlayer)
            return generateDiceImageName(randomDiceNumber);
        case 2 :
            return generateDiceImageName(randomDiceNumber);
        case 3 : 
            return generateDiceImageName(randomDiceNumber);
        case 4 :
            return generateDiceImageName(randomDiceNumber);
        case 5 : 
            return generateDiceImageName(randomDiceNumber);
        case 6 :
            return generateDiceImageName(randomDiceNumber);
        default :
            console.log("Incorrect Dice Number")
            return generateDiceImageName(randomDiceNumber);
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

function generateDiceImageName(number) {
    return `dice-${number}.png`;
}

function switchPlayerActive() {
    indexActivePlayer = (indexActivePlayer + 1) % 2
    indexActivePlayer === 0 ? setActivePlayerToFirstPlayer() : setActivePlayerToSecondPlayer();
}

function setActivePlayerToFirstPlayer() {
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
    activePlayer.currentScore.innerHTML = MIN_SCORE;
    activePlayer = player0;
}

function setActivePlayerToSecondPlayer() {
    document.querySelector(".player--1").classList.add("player--active");
    document.querySelector(".player--0").classList.remove("player--active");
    activePlayer.currentScore.innerHTML = MIN_SCORE;
    activePlayer = player1;
}

function setUp() {
    resetToDefault();
    diceButton.addEventListener("click", rollDice);
    holdButton.addEventListener("click", moveCurrentScoreToScore);
    newGameButton.addEventListener("click", resetToDefault)
}

function moveCurrentScoreToScore() {
    activePlayer.score.innerHTML = Number(activePlayer.score.innerHTML) + Number(activePlayer.currentScore.innerHTML);
    if(isThereAWinner()) {
        setWinner();
        return;
    }
    switchPlayerActive();
}

function isThereAWinner() {
    return (Number(activePlayer.score.innerHTML) >= 100)
}

function setWinner() { 
    activePlayer.section.classList.add("player--winner");
    activePlayer.section.classList.add("name");
    hideHoldAndDiceButtons();
}

function hideHoldAndDiceButtons() {
    diceButton.style.visibility = "hidden";
    holdButton.style.visibility = "hidden"
    dice.style.visibility = "hidden"
}

function showHoldAndDiceButtons() {
    diceButton.style.visibility = "visible";
    holdButton.style.visibility = "visible";
    dice.style.visibility = "visible"
}
