"use strict";

const rowFourth = document.querySelector(".row__fourth");

const playerFirst = document.querySelector(".player__one");
const playerSecond = document.querySelector(".player__two");

const playerUser = document.querySelector(".player__user");
const playerComputer = document.querySelector(".player__computer");

const gameTitle = document.querySelector(".game__title");

rowFourth.addEventListener("click", function(e) {
  const el = e.target;
  if (!el.classList.contains("btn")) return;

  if (el.classList.contains("game__player")) {
    playerFirst.classList.toggle("hidden");
    playerSecond.classList.toggle("hidden");
  } else {
    playerUser.classList.toggle("hidden");
    playerComputer.classList.toggle("hidden");
  }

  gameTitle.textContent = "Choose an option";
});