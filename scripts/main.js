"use strict";
let bestRes = Infinity;
function gameFifteen(event) {
  let mooveCountElement = document.querySelector(".game15Block__count");
  let bestScoreElement = document.querySelector(".game15Block__bestScore");
  let order;
  let mooveCount = 0;
  let playField = document.querySelector(".game15Block__play-field");
  let chips = [...playField.querySelectorAll(".game15Block__chip")];
  let chipWidth = chips[0].offsetWidth;
  let chipHeight = chips[0].offsetHeight;
  let coords = [
    [0, 0],
    [chipWidth, 0],
    [chipWidth * 2, 0],
    [chipWidth * 3, 0],
    [0, chipHeight],
    [chipWidth, chipHeight],
    [chipWidth * 2, chipHeight],
    [chipWidth * 3, chipHeight],
    [0, chipHeight * 2],
    [chipWidth, chipHeight * 2],
    [chipWidth * 2, chipHeight * 2],
    [chipWidth * 3, chipHeight * 2],
    [0, chipHeight * 3],
    [chipWidth, chipHeight * 3],
    [chipWidth * 2, chipHeight * 3],
    [chipWidth * 3, chipHeight * 3],
  ];
  let randomCoords = [...coords];
  let emptyCellTop = randomCoords[15][1];
  let emptyCellLeft = randomCoords[15][0];
  document.querySelector(".game15Block__button--decrease").style.display =
    "block";
  document.querySelector(".game15Block__button--random").style.display =
    "block";
  document.querySelector(".game15Block__button--start").style.display = "none";
  playField.addEventListener("click", game);

  function game(event) {
    if (
      event.target !==
        document.querySelector(".game15Block__button--decrease") &&
      event.target !== document.querySelector(".game15Block__button--random")
    ) {
      return;
    }

    if (
      event.target === document.querySelector(".game15Block__button--decrease")
    ) {
      order = "decrease";
    } else {
      order = "random";
    }

    mooveCountElement.style.display = "block";
    mooveCountElement.style.lineHeight = `${mooveCountElement.offsetHeight}px`;
    mooveCountElement.style.fontSize = `${
      mooveCountElement.offsetHeight - 10
    }px`;
    mooveCountElement.textContent = `Score: ${mooveCount}`;
    bestScoreElement.style.display = "block";
    bestScoreElement.style.lineHeight = `${bestScoreElement.offsetHeight}px`;
    bestScoreElement.style.fontSize = `${bestScoreElement.offsetHeight - 10}px`;
    bestScoreElement.textContent = `Best: ${bestRes}`;

    document.querySelector(".game15Block__button--decrease").style.display =
      "none";
    document.querySelector(".game15Block__button--random").style.display =
      "none";

    coordsToOrder(order);

    playField.removeEventListener("click", game);
    playField.addEventListener("click", oneMoove);

    function oneMoove(event) {
      if (event.target.tagName !== "LI") {
        return;
      }
      orderChange(event);
      if (JSON.stringify(randomCoords) === JSON.stringify(coords)) {
        if (bestRes >= mooveCount) {
          bestRes = mooveCount;
          bestScoreElement.textContent = `Best: ${bestRes}`;
        }
        alert(`You are winner!!! Your Score: ${mooveCount}`);
        backToStart();
      }
    }

    function backToStart() {
      for (let i = 0; i < 15; i++) {
        chips[i].style.top = `-100vh`;
        chips[i].style.left = `50%`;
      }
      document.querySelector(".game15Block__button--start").style.display =
        "block";
    }

    function orderChange(event) {
      let targetIndex = chips.indexOf(event.target);
      //if click on left
      if (
        parseInt(event.target.style.top) === emptyCellTop &&
        parseInt(event.target.style.left) === emptyCellLeft - chipWidth
      ) {
        randomCoords[targetIndex][0] = emptyCellLeft;
        event.target.style.left = `${emptyCellLeft}px`;
        emptyCellLeft -= chipWidth;
        randomCoords[15][0] = emptyCellLeft;
        mooveCount++;
        mooveCountElement.textContent = `Score: ${mooveCount}`;
        return;
      }
      // if click on right
      if (
        parseInt(event.target.style.top) === emptyCellTop &&
        parseInt(event.target.style.left) === emptyCellLeft + chipWidth
      ) {
        randomCoords[targetIndex][0] = emptyCellLeft;
        event.target.style.left = `${emptyCellLeft}px`;
        emptyCellLeft += chipWidth;
        randomCoords[15][0] = emptyCellLeft;
        mooveCount++;
        mooveCountElement.textContent = `Score: ${mooveCount}`;
        return;
      }
      //if click on top
      if (
        parseInt(event.target.style.top) === emptyCellTop - chipHeight &&
        parseInt(event.target.style.left) === emptyCellLeft
      ) {
        randomCoords[targetIndex][1] = emptyCellTop;
        event.target.style.top = `${emptyCellTop}px`;
        emptyCellTop -= chipHeight;
        randomCoords[15][1] = emptyCellTop;
        mooveCount++;
        mooveCountElement.textContent = `Score: ${mooveCount}`;
        return;
      }
      //if click on bottom
      if (
        parseInt(event.target.style.top) === emptyCellTop + chipHeight &&
        parseInt(event.target.style.left) === emptyCellLeft
      ) {
        randomCoords[targetIndex][1] = emptyCellTop;
        event.target.style.top = `${emptyCellTop}px`;
        emptyCellTop += chipHeight;
        randomCoords[15][1] = emptyCellTop;
        mooveCount++;
        mooveCountElement.textContent = `Score: ${mooveCount}`;
        return;
      }
    }
  }

  function coordsToOrder(order) {
    if (order === "increase") {
      for (let i = 0; i < 15; i++) {
        chips[i].style.display = "block";
        chips[i].style.top = `${randomCoords[i][1]}px`;
        chips[i].style.left = `${randomCoords[i][0]}px`;
      }
    }
    if (order === "decrease") {
      randomCoords = [...randomCoords.slice(0, 15).reverse(), randomCoords[15]];
      for (let i = 0; i < 15; i++) {
        chips[i].style.display = "block";
        chips[i].style.top = `${randomCoords[i][1]}px`;
        chips[i].style.left = `${randomCoords[i][0]}px`;
      }
    }

    if (order === "random") {
      randomCoords = [
        ...randomCoords.slice(0, 15).sort((a, b) => Math.random() - 0.5),
        randomCoords[15],
      ];

      for (let i = 0; i < 15; i++) {
        chips[i].style.display = "block";
        chips[i].style.top = `${randomCoords[i][1]}px`;
        chips[i].style.left = `${randomCoords[i][0]}px`;
      }
    }
  }
}

document
  .querySelector(".game15Block__button--start")
  .addEventListener("click", gameFifteen);
