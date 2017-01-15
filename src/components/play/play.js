import template from './play.html';

export default {
    template,
    controller
};

controller.$inject = ['shuffleService', '$timeout', '$rootScope'];

function controller(shuffle, timeout) {
    this.beginning = true;
    this.passReady = false;
    this.selectedCard = false;
    this.passCompleted = false;
    this.passTarget = 0;
    this.players = ['noone', 'George', 'Denny', 'TJ', 'Hold'];

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
        this.passTarget ++;
        if (this.passTarget === 5){
            this.passTarget = 1;
        }
        this.passPlayer = this.players[this.passTarget];
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
                // console.log('final deck is ', finalDeck);
                //  save each card in the db
                        // new Card(newCardEntry).save()
                        // .then(saved => res.send(saved));
                    // });
                  //deal hands
                this.hands = [];
                while(finalDeck.length > 0){
                    var tempHand = finalDeck.splice(0,13);
                    this.hands.push(tempHand);
                }
                var playerHand = this.hands[0];
                // console.log('hands are ', this.hands);
                // console.log('player hand is ', playerHand);
                // console.log('final deck is ', finalDeck);
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
                this.comp1Hand = this.hands[1];
                this.comp2Hand = this.hands[2];
                this.comp3Hand = this.hands[3];
                this.passArray = [];
            });
    };

    this.passCards = ()=>{
        console.log('pass cards clicked');
        // var index = -1;
        // console.log('turn is ', Turn.pass);
        // var passTarget = 0;
    // console.log('pass direction is ,' Turn.pass);
        // if (Turn.pass === 'left'){
        //     passTarget = 1; 
        // }
        // if (Turn.pass === 'right'){
        //     passTarget = 3; 
        // }
        // else {
        //     passTarget = 2;
        // }

        if (this.passArray.length === 3){
            console.log('passing these 3 cards ', this.passArray) + ' to this person ' + this.passPlayer;
    //         $('#pass-button').fadeOut();
    //         $('.playerCard').detach();
    //         var passIdArray = [];

    //         console.log('pass target is ', passTarget);
    //         console.log('passArray is ', Deck.passArray);
    //         Deck.passObject[passTarget] = Deck.passArray;
    // //create computer player pass here.
    //         AI.passCards(Deck.comp1Hand, 1);
    //         AI.passCards(Deck.comp2Hand, 2);
    //         AI.passCards(Deck.comp3Hand, 3);

    //         console.log('pass object is ', Deck.passObject);
    //         console.log('comp decks are ', Deck.compDecks);


            // Deck.passArray.forEach( function(card){
            //     passIdArray.push(card.id);
            // });

            // console.log('passIdArray is ', passIdArray);

    // Turn.passDeck.push(Deck.passArray);

            // for (var i = 0; i < Deck.sortedHand.length; i++){
            //     index = passIdArray.indexOf(Deck.sortedHand[i].code);

            //     if (index>-1){
        //can also add in new cards here
            //         console.log('removing this card: '+ Deck.sortedHand[i].code);
            //         Deck.sortedHand.splice(i, 1);
            //         i--;
            //     }
            // };
            // console.log(passIdArray);
            // console.log(Deck.sortedHand);
            // Deck.passArray = [];
    //this is showing the hand with the pass cards removed, i still need to add in the new cards and sort the hand.
            // for (var i =0; i < Deck.sortedHand.length; i++){
            //     $('.hand').append('<div class="playerCard" id="'+Deck.sortedHand[i].code+'" data-suit="'+Deck.sortedHand[i].suit+'" data-value="'+Deck.sortedHand[i].value+'" data-clicked=false><img class="card-img" id="player-card'+Deck.sortedHand[i].code+'" src="'+Deck.sortedHand[i].image+'"</div>');
            // }
            this.passCompleted = true;
        //put the start play function call here once written
        }
        else{

            this.badPass = true;
            timeout(()=>{this.badPass=false;}, 3000);
            console.log('not enough cards');
        }
    };





};