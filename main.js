const cards = document.querySelectorAll(".memory-card");
const status = document.querySelector(".status");
const currentScore = document.querySelector(".score");
const playAgain = document.querySelector("#playAgain");

let hasFlippedCard = false;
let lockBoard = false;
let [firstCard, secondCard] = [null, null];
let score = 0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
  isUserWin() && alertWinning();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  currentScore.innerHTML = score;
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function isUserWin() {
  return score === 6
}

function alertWinning() {
  status.classList.add('win');
}

function playAgainHandler() {
  initGame();
}

function resetStatus() {
  cards.forEach(card => card.classList.remove('flip'))
  score=0;
  currentScore.innerHTML = score;
  status.classList.remove('win');
}


function resetGame() {
  resetBoard();
  resetStatus();
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
};

function initGame() {
  resetGame();
  shuffle();
  cards.forEach(card => card.addEventListener("click", flipCard));
};

initGame();
playAgain.addEventListener('click', playAgainHandler);
