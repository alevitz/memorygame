const cards = document.querySelectorAll('.memory-card');
const start = document.querySelector('#start');
const memoryContainer = document.querySelector('.memorygame-container');
const startScreen = document.querySelector('.start-screen');
const memoryGameScreen = document.querySelector('.memorygame-screen');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

start.addEventListener('click', flipboard);

function flipboard() {
    memoryContainer.classList.add('flip');
    startScreen.classList.toggle('flip');
    memoryGameScreen.classList.toggle('flip');
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        displaycount();

        return;
    } 
        //second click
        secondCard = this;
        displaycount();
        checkForMatch();
    }  
    
    var count = (function () {
        var counter = 0;
        return function () {return counter +=1;}
    })();

    function displaycount(){
        document.getElementById('counter').innerHTML = count();
    }

    function checkForMatch() {
    //do cards match?
    let isMatch = firstCard.dataset.gif === secondCard.dataset.gif
    
    isMatch ? disableCards() : unflipCards();    
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();
            }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 20);
            card.style.order = randomPos;
        });
    })();

cards.forEach(card => card.addEventListener('click', flipCard));