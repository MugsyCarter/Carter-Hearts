import template from './play.html';

export default {
    template,
    controller
};

controller.$inject = ['shuffleService', '$timeout', '$rootScope'];

function controller(shuffle) {
    this.beginning = true;
    this.passReady = false;
    this.selectedCard = false;

    this.clicked = (card)=>{
        console.log('ctrl.clicked clicked: this is the card', card);
        if (this.passReady === true){
            if (card.toggled===true){
                console.log('removing card from passArray');
                card.toggled = false;
                console.log(this.passArray);
                this.passArray.splice(this.passArray.indexOf(card),1);
                console.log(this.passArray);
            }
            else{
                console.log('adding card to passArray');
                card.toggled = true;
                console.log('card is ', card);
                this.selectedCard = true;
                this.passArray.push(card);
                console.log(this.passArray);
            }
        }
    };

    this.dealCards = ()=>{
        this.sortedHand=[];
        this.passReady=true;
        this.beginning = false;
        shuffle.getNewHand()
            .then((cards)=>{
                console.log(cards);
            //    get a shuffled deck from the API, parse it, and take only the cards
                const deck = cards.cards;
                    // res.send(deck);
                console.log('deck is ', deck);
                const finalDeck = [];
            //for each card, create an object to save in the newDeck
                deck.forEach(function(card){

                    if(card.value === 'JACK'){
                        card.value = '11';
                    }
                    else if (card.value === 'QUEEN'){
                        card.value = '12';
                    }
                    else if (card.value === 'KING'){
                        card.value = '13';
                    }
                    else if (card.value === 'ACE'){
                        card.value = '14';
                    }
                    if(card.code==='QS'){
                        card.points = 13;
                    }
                    else if(card.code ==='10H'){
                        card.points = 10;
                    }
                    else if (card.suit === 'HEARTS'){
                        card.points = 1;
                    }
                    else{
                        card.points = 0;
                    }

                    let newCardEntry = {
                        code: card.code,
                        image: card.image,
                        suit: card.suit,
                        number: parseInt(card.value),
                        points: card.points,
                        toggled: false
                    };
                    
                    finalDeck.push(newCardEntry);
                });
                console.log('final deck is ', finalDeck);
                //  save each card in the db
                        // new Card(newCardEntry).save()
                        // .then(saved => res.send(saved));
                    // });
                  //deal hands
                var playerHand = finalDeck.splice(0,13);
                console.log(playerHand);
            //sort player hand numerically
                playerHand.sort(function(a,b){
                    return a.number-b.number;
                });
            //Sort player hand into suit arrays
                var playerHearts = playerHand.filter(function(card){
                    return card.suit === 'HEARTS';
                });
                var playerSpades = playerHand.filter(function(card){
                    return card.suit === 'SPADES';
                });
                var playerDiamonds = playerHand.filter(function(card){
                    return card.suit === 'DIAMONDS';
                });
                var playerClubs = playerHand.filter(function(card){
                    return card.suit === 'CLUBS';
                });
            //combine suit arrays to make final sorted player hand
                this.hand = playerHearts.concat(playerSpades).concat(playerDiamonds).concat(playerClubs);
                console.log(this.hand);
                this.passArray = [];
            });


          
   
    };



};