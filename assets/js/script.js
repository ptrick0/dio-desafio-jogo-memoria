const cards = document.querySelectorAll('.card');
const gameOverBtn = document.getElementById('thanos');
let matchedCards = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let blockBoard = false;

function flipCard() {
    if(blockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
    checkForOver();
}

function unflipCards() {
    blockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        blockBoard = false;
    }, 1500);
}

function unflipAllCards() {
    blockBoard = true;
    cards.forEach(card => {
        card.classList.remove('flip');
    });
    blockBoard = false;
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        matchedCards++;
        disableCards();
        return;
    }
    unflipCards();
}

function checkForOver() {
    if(matchedCards === 6) {
        gameOverBtn.classList.add('gameover');
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function enableCards() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

function resetBoard() {
    [hasFlippedCard, blockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

function shuffleCards() {
    cards.forEach(card => {
        let randPos = Math.floor(Math.random() * 12);
        card.style.order = randPos;
    });
}

function gameOver() {
    alert("Eu sou inevitável!");
    unflipAllCards();
    matchedCards = 0;
    gameOverBtn.classList.remove('gameover');
    setTimeout(() => {
        shuffleCards();
        resetBoard();
        enableCards();
    }, 1500);    
}

shuffleCards();

enableCards();

gameOverBtn.addEventListener('click', gameOver);
