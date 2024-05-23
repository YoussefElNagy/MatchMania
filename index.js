class AudioController {
    constructor() {
        this.gameOverSound = new Audio("aud\\game-over.mp3");
        this.matchSound = new Audio("aud\\match.mp3");
        this.startSound = new Audio("aud\\start.mp3");
        this.winSound = new Audio("aud\\win.mp3");
    }

    playGameOverSound() {
        this.gameOverSound.play();
    }

    playMatchSound() {
        this.matchSound.play();
    }

    playStartSound() {
        this.startSound.play();
    }

    playWinSound() {
        this.winSound.play();
    }
}

class Game {
    constructor(totalTime, cards) {
        this.totalTime = totalTime;
        this.cards = cards;
        this.timeRem = totalTime;
        this.timer = document.getElementById('timeRem');
        this.counter = document.getElementById('flips');
        this.audio = new AudioController();
        this.startBtn = document.getElementById('startBtn');
        this.gameRunning = false;
        this.countdown = null;
        this.highScore=Infinity;
    }

    startGame() {
        if (this.gameRunning) {
            this.resetGame();
            return;
        }

        this.gameRunning = true;
        this.startBtn.innerText = "Reset Game";
        this.startBtn.style.color= '#EAEAEA'
        this.cardToCheck = null;
        this.totalFlips = 0;
        this.timeRem = this.totalTime;
        this.audio.playStartSound();
        this.matchedCards = [];
        this.busy = true;

        this.setCardsBusy(true);

        setTimeout(() => {
            this.shuffleCards(this.cards);
            this.countdown = this.startCountDown();
            this.busy = false;
            setTimeout(() => {
                this.hideCards();
                this.setCardsBusy(false);
            }, 500);
        }, 500);

        this.timer.innerText = this.timeRem;
        this.counter.innerText = this.totalFlips;
    }

    resetGame() {
        clearInterval(this.countdown);
        this.gameRunning = false;
        this.startBtn.innerText = "Start Game!";
        this.startBtn.style.color= '#FF2E63'

        this.timeRem = this.totalTime;
        this.totalFlips = 0;
        this.matchedCards = [];
        this.cardToCheck = null;
        this.hideCards();
        this.setCardsBusy(false);
        this.timer.innerText = this.timeRem;
        this.counter.innerText = this.totalFlips;
        this.audio.playGameOverSound();
        document.getElementById('game-over-text').classList.add('visible');


    }

    hideCards() {
        this.cards.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRem--;
            this.timer.innerText = this.timeRem;
            if (this.timeRem === 0) {
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        this.audio.playGameOverSound();
        this.startBtn.innerText = "Start Game!";
        this.startBtn.style.color= '#FF2E63'
        this.gameRunning = false;
        this.hideCards();
        document.getElementById('game-over-text').classList.add('visible');
    }

    canFlip(card) {
        return !this.busy && !card.classList.contains('busy') && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    flipCard(card) {
        if (this.canFlip(card)) {
            this.totalFlips++;
            this.counter.innerText = this.totalFlips;
            card.classList.add('visible');

            if (this.cardToCheck) {
                this.checkForMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMistmatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.audio.playMatchSound();
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cards.length) {
            this.win();
        }
    }

    cardMistmatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            cards[j].style.order = i;
            cards[i].style.order = j;
        }
    }

    win() {
        this.audio.playWinSound();
        clearInterval(this.countdown);
        this.startBtn.innerText = "Start Game!";
        this.startBtn.style.color= '#FF2E63'
        this.gameRunning = false;
        this.updateHighScore();
        document.getElementById('victory-text').classList.add('visible');
        this.hideCards();
    }

    setCardsBusy(isBusy) {
        this.cards.forEach(card => {
            if (isBusy) {
                card.classList.add('busy');
            } else {
                card.classList.remove('busy');
            }
        });
    }

    updateHighScore() {
        if (this.totalFlips < this.highScore ||  document.getElementById('highscore').textContent =='N/A') {
            this.highScore = this.totalFlips;
            this.updateHighScoreDisplay(this.highScore);
            document.getElementById('newHigh').textContent='New Highscore Set!'
        }
        else document.getElementById('newHigh').textContent=''


    }

    updateHighScoreDisplay(n) {
        document.getElementById('highscore').textContent = n === Infinity ? 'N/A' : n;
    }
}

function ready() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Game(70, cards);
    let startBtn = document.getElementById('startBtn');
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    startBtn.addEventListener('click', () => game.startGame());

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
