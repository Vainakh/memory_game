const cards = document.querySelectorAll('.memory-card');

let movesText = document.getElementById("moves-text");

let moves = 0;
let turnedCard = false;
let lockBoard = false;
let firstCard, secondCard;

movesText.innerText = 0;

function turnCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!turnedCard) {
        turnedCard = true;
        firstCard = this;
        return;
    }
        turnedCard = false;
        secondCard = this;
        moves++;
        movesText.innerText = moves;

    cardCompare();
}

function cardCompare() {
    let cardMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    cardMatch ? turnDisable() : unTurnCards();
}
 
function turnDisable() {
    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);
}

function unTurnCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1500);
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();
        
function resetBoard() {
  turnedCard = false; 
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function startGame() {
    let mainFrame = document.getElementById("mainFrame");

    if (mainFrame.style.display === "none") {
        mainFrame.style.display = "block";
    }
}

cards.forEach(card => card.addEventListener("click", turnCard));
