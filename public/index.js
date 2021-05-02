const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
var firstCard,secondCard;
let resultado = [];

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    let checkResultado = resultado.length === 6;
    if (checkResultado){
        gameOver();
    }
}

function disableCards(){
    firstCard.removeEventListener("click",flipCard);
    secondCard.removeEventListener("click",flipCard); 
    resultado.push(1);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    },1200);
  
}

function resetBoard() {
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

function gameOver() {
    alert("YOU WIN");
    setTimeout(()=>{
        window.location.reload(false); 
    },1200 );
}

cards.forEach(card => card.addEventListener('click', flipCard));

