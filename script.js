"use strict";
// rows
const rowFourth = document.querySelector(".row__fourth");
const rowFifth = document.querySelector(".row__fifth");

// Text settled on the centre of the page
const gameTitle = document.querySelector(".game__title");

// Two real players
// Score divs
const playerFirst = document.querySelector(".player__one");
const playerSecond = document.querySelector(".player__two");

// Person and computer game
// Score divs
const playerUser = document.querySelector(".player__user");
const playerComputer = document.querySelector(".player__computer");
// Players buttons
const btnGameUser = document.querySelector(".game__player");
const btnGameComputer = document.querySelector(".game__computer");

// Choices
const choiceFirst = document.querySelector(".choice__first");
const choiceSecond = document.querySelector(".choice__second");

// Shape images for players
const imgFirst = document.querySelector(".img__player1");
const imgSecond = document.querySelector(".img__player2");

// Buttons reset, restart, main menu
const btnRestart = document.querySelector(".btn__restart");
const btnReset = document.querySelector(".btn__reset");
const btnMain = document.querySelector(".btn__main");

// Defining shape with numbers to find out easily winner
const shapes = ["rock", "scissors", "paper"];
// selected numbers from shapes for two players
let numFirst = -1, numSecond = -1;
// challenge with computer
let challengeComputer = false;
// Scores to describe
let scoreFirst = 0, scoreSecond = 0;
let lastClick = -1;

// shape with num1 can beat shape with num2
const canBeat = function(num1, num2) {
  return num2 === (num1 + 1) % 3;
}

rowFourth.addEventListener("click", function(e) {
  const el = e.target;
  if (!el.classList.contains("btn") || el.classList.contains("shape")) return;

  // Play with the second person
  if (el.classList.contains("game__player")) {
    playerFirst.classList.toggle("hidden");
    playerSecond.classList.toggle("hidden");
    // turn off challenge with computer
    challengeComputer = false;
  }
  // Play with the computer 
  else {
    playerUser.classList.toggle("hidden");
    playerComputer.classList.toggle("hidden");
    // turn on challenge with computer
    challengeComputer = true;
  }

  // Opening buttons for choosing options
  choiceFirst.classList.toggle("hidden");
  if (!challengeComputer) {
    choiceSecond.classList.toggle("hidden");
  }

  // buttons hiding after selecting proper choice
  if (!btnGameUser.classList.contains("hidden") && !btnGameComputer.classList.contains("hidden")) {
    btnGameUser.classList.toggle("hidden");
    btnGameComputer.classList.toggle("hidden");  
    rowFourth.classList.gap = "80px";
    rowFifth.classList.toggle("hidden");
  }
  
  if (gameTitle.textContent == "Rock Scissors Paper") {
    gameTitle.textContent = "Choose an option";
  } else if (gameTitle.textContent == "Choose an option") {
    gameTitle.textContent = "Rock Scissors Paper";
  }
});

// Describe player1 & player2 in proper score divs
const describeScore = function(sc1, sc2) {
  if (challengeComputer) {
    const divScorePlayer = playerUser.querySelector(".score");
    const divScoreComputer = playerComputer.querySelector(".score");
    divScorePlayer.textContent = sc1;
    divScoreComputer.textContent = sc2;
    return;
  }
  const divScoreFirst = playerFirst.querySelector(".score");
  const divScoreSecond = playerSecond.querySelector(".score");
  divScoreFirst.textContent = sc1;
  divScoreSecond.textContent = sc2;
}

// Change functionalities when the one of cases win, draw, loose happened
const changeSituation = function() {
  if (canBeat(numFirst, numSecond)) {
    if (challengeComputer) {
      gameTitle.textContent = "Player wins";
    } else {
      gameTitle.textContent = "Player 1 wins";
    }
    describeScore(++scoreFirst, scoreSecond);
  }
  else if (canBeat(numSecond, numFirst)) {
    if (challengeComputer) {
      gameTitle.textContent = "Computer wins";
    } else {
      gameTitle.textContent = "Player 2 wins";
    }
    describeScore(scoreFirst, ++scoreSecond);
  } else {
    gameTitle.textContent = "Draw";
  }
};

// Restart button event functionalities
const funcRestart = function() {
  lastClick = -1;
  gameTitle.textContent = "Choose an option";
  imgFirst.src = "./assets/rock.png";
  imgSecond.src = "./assets/rock.png";
};
btnRestart.addEventListener("click", funcRestart);

const funcReset = function() {
  funcRestart();
  describeScore(scoreFirst = 0, scoreSecond = 0);
};
btnReset.addEventListener("click", funcReset);

const funcMainMenu = function() {
  funcReset();
  if (challengeComputer) {
    playerUser.classList.toggle("hidden");
    playerComputer.classList.toggle("hidden");  
  } else {
    playerFirst.classList.toggle("hidden");
    playerSecond.classList.toggle("hidden");
  }

  // Opening buttons for choosing options
  choiceFirst.classList.toggle("hidden");
  if (!challengeComputer) {
    choiceSecond.classList.toggle("hidden");
  }
  rowFifth.classList.toggle("hidden");

  // Opening buttons to choose to play vs user/computer
  btnGameUser.classList.toggle("hidden");
  btnGameComputer.classList.toggle("hidden");  

  if (gameTitle.textContent == "Rock Scissors Paper") {
    gameTitle.textContent = "Choose an option";
  } else if (gameTitle.textContent == "Choose an option") {
    gameTitle.textContent = "Rock Scissors Paper";
  }  
};
btnMain.addEventListener("click", funcMainMenu);

choiceFirst.addEventListener("click", function(e) {
  const el = e.target;
  if (!el.classList.contains("shape") || lastClick == 1) return;
  lastClick = 1;

  numFirst = +el.dataset.num;
  imgFirst.src = `./assets/${shapes[numFirst]}.png`;

  if (challengeComputer) {
    numSecond = Math.trunc((Math.random() * 3));
    imgSecond.src = `./assets/${shapes[numSecond]}.png`;
    console.log(("Player is having fun with computer"));
    changeSituation();
    return;
  }

  if (numFirst < 0 || numSecond < 0) return;
  changeSituation();
});

choiceSecond.addEventListener("click", function(e) {
  const el = e.target;
  if (!el.classList.contains("shape") || lastClick == 2) return;
  lastClick = 2;

  numSecond = +el.dataset.num;
  imgSecond.src = `./assets/${shapes[numSecond]}.png`;

  if (numFirst < 0 || numSecond < 0) return;
  changeSituation();
});