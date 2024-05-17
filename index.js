if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded');
    //ready()
}
else{
    //ready()
}

//class audios
    //start
    //win
    //lose
    //match
//class game:
    //constructor
    //startGame()
    //shuffle()
    //startCountdown
    //lose
    //victory
    //hide
    //flip
    //checkforMatch
    //cardMatch
    //cardMis
    //getCardVal
    //canFlip


function ready() {

    let cards= Array.from(document.getElementsByClassName('cards'))
    //overlay
    //game object
    //overlay remove visible
    //startGame()


cards.array.forEach(card => {
    card.addEventListener('click', () => {
        //flipCard()
    })
});
}    