import template from './play.html';

export default {
    template,
    controller
};

controller.$inject = ['shuffleService', 'aiService', '$timeout', '$rootScope'];

function controller(shuffle, ai, timeout) {
    this.beginning = true;
    this.passReady = false;
    this.selectedCard = false;
    this.passCompleted = false;
    this.turnOver = false;
    this.playReady = false;
    this.playTwo = false;
    this.playerTurn = false;
    this.suitError = false;
    this.firstHandError = false;
    this.twoError = false;
    this.passTarget = 0;
    this.lead = 0;
    this.turnOrder = [];
    this.playedCards = [];
    this.counted={
        CLUBS: 0,
        HEARTS: 0,
        DIAMONDS: 0,
        SPADES: 0
    };
    this.players = ['you', 'George', 'Denny', 'Aileen', 'Hold'];
    this.playerScores = [0,0,0,0];

    this.dealCards = ()=>{
        this.sortedHand=[];
        this.passReady=true;
        this.beginning = false;
        this.passTarget ++;
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
                  //deal hands
                this.hands = [];
                while(finalDeck.length > 0){
                    var tempHand = finalDeck.splice(0,13);
                    this.hands.push(tempHand);
                }
                this.hand = this.sortHand(this.hands[0]);
                this.hands[1]= this.sortHand(this.hands[1]);
                this.hands[2]= this.sortHand(this.hands[2]);
                this.hands[3]= this.sortHand(this.hands[3]);
                this.passArray = [];
            });
    };

    this.sortHand = (hand)=> {
          //sort player hand numerically
        hand.sort(function(a,b){
            return a.number-b.number;
        });
            //Sort player hand into suit arrays
        var playerClubs = hand.filter(function(card){
            return card.suit === 'CLUBS';
        });
        var playerHearts = hand.filter(function(card){
            return card.suit === 'HEARTS';
        });
        var playerSpades = hand.filter(function(card){
            return card.suit === 'SPADES';
        });
        var playerDiamonds = hand.filter(function(card){
            return card.suit === 'DIAMONDS';
        });
       
            //combine suit arrays to make final sorted player hand
        var sortedHand = playerClubs.concat(playerHearts).concat(playerSpades).concat(playerDiamonds);
        return sortedHand;
    };

    this.clicked = (card)=>{
        //adds or removes player cards to be passed
        if (this.passReady === true){
            if (card.toggled===true){
                card.toggled = false;
                this.passArray.splice(this.passArray.indexOf(card),1);
            }
            else{
                card.toggled = true;
                this.selectedCard = true;
                this.passArray.push(card);
            }
        }
        //else, play cards
        else if (this.playerTurn === true){
            if(this.lead === 0 && card.code !== '2C'){
                //if its the first hand and the player must play the two 
                this.twoError = true;
                timeout(()=>{this.twoError=false;}, 3000);
            }
            else if (this.lead ===0 && card.code === '2C'){
                this.plauTwo = false;
                this.playCard(card, 0);
            }
            else if (card.suit === this.playedCards[this.lead].suit){
                //if the suit matches its a valid play
                this.playCard(card, 0);
            }
            else {
                //check to see if player is voided 
                this.leadSuit = this.playedCards[this.lead].suit;
                var suitMatches = this.hand.filter((thisCard)=>{
                    return thisCard.suit === this.leadSuit; 
                });
                if (suitMatches.length > 0){
                    //player is not yet voided
                    this.playerSuit = card.suit;
                    this.suitError = true;
                    timeout(()=>{this.suitError=false;}, 3000);
                }
                //check to see if its the first hand and the player is trying to play a point card
                else if(this.playedCards[this.lead].code === '2C' && card.points >0){
                    this.firstHandError = true;
                    timeout(()=>{this.firstHandError=false;}, 3000);
                }
                //otherwise the play is valid
                else{
                    this.playCard(card, 0);
                }
            }
        }
    };

    this.playCard = (card, player)=>{
        //this function play a card and removesit from the player's hand
        this.playedCards[player] = card;
        this.turnOrder.push(player);
        if (player === 0){
            this.hand = this.hand.filter((eachCard)=>{
                return eachCard.code !== card.code;
            });
        }
        else{
            this.hands[player] = this.hands[player].filter((eachCard)=>{
                return eachCard.code !== card.code;
            });
        }
        //count the card
        this.counted[card.suit] ++;
        //call the next player
        this.nextPlayer();
    };



    this.passCards = ()=>{
        console.log('pass cards clicked, passTarget is ', this.passTarget);
        if (this.passArray.length === 3){
            console.log('passing these 3 cards ', this.passArray) + ' to this person ' + this.passPlayer;
                 //remove the pass cards from the player hand.
            this.hand = this.hand.filter((card)=>{
                return card !== this.passArray[0] && card !== this.passArray [1] && card !== this.passArray[2];
            });
        //run the algorithim from the aiService to get the pass from the computer player.  It returns an object with the new full player hand and the new computer hand which has had its pass removed. 
            var passObject = ai.pass(this.hands[this.passTarget], this.hand);
            console.log(passObject);
            this.hands[this.passTarget] = passObject.compHand;
        //add the pass to the computer's hand
            this.hands[this.passTarget].push(this.passArray[0]);
            this.hands[this.passTarget].push(this.passArray[1]);
            this.hands[this.passTarget].push(this.passArray[2]);
            console.log('computer hand is ', this.hands[this.passTarget]);
        //re-sort the player's hand
            this.hand = this.sortHand(passObject.playerHand);
            this.hands[this.passTarget]=this.sortHand(this.hands[this.passTarget]);
            this.passReady = false;
            this.passCompleted = true;
            this.playReady = true;
        //put the start play function call here once written
        }
        else{
            this.badPass = true;
            timeout(()=>{this.badPass=false;}, 3000);
            console.log('not enough cards');
        }
    };

    this.startPlay = ()=>{
        this.playReady = false;
        this.playedCards = [];
        //find the two of CLUBS
        for (var i = 1; i <4; i++){
            if (this.hands[i][0].code === '2C'){
                console.log('two found in deck #',i);
                var two = this.hands[i][0];
                this.lead = i;
                this.playCard(two, i);
                return;
            }
        }
        //if not, then the player has the 2, have them play it
        if(this.playedCards.length === 0){
            //show two message
            this.playerTurn = true;
            this.playTwo = true;
            this.lead = 0;
            console.log(this.hand[0]);
            this.hand[0].toggled = true;
            return;
        }
    };


    this.nextPlayer = ()=>{
        console.log('in nextPlayer');
        //if not last play 
        while(this.turnOrder.length < 4){
            console.log('turn order is ', this.turnOrder);
            var lastPlayer = this.turnOrder[this.turnOrder.length-1];
            console.log('last player was ', lastPlayer);
            var currentPlayer = lastPlayer +1;
            if (currentPlayer === 4){
                currentPlayer = 0;
                this.playerTurn = true;
                return;
                //let the Player Play
            }
            else {
                //its the AIs turn.  Let the AI play.
                this.PlayerTurn = false;
                console.log('player '+ currentPlayer + ' about to play.');
                var aiPlay = ai.play(this.playedCards, this.lead, this.hands[currentPlayer]);
                this.playCard(aiPlay, currentPlayer);
            }
        }
        //all players have played so resolve the points
        var suited = this.playedCards.filter((card)=>{
            return card.suit === this.playedCards[this.lead].suit;
        });
        var sortedSuited = suited.sort((a,b)=>{
            return b.number - a.number;
        });
        var highcard = sortedSuited[0];
        this.high = this.playedCards.indexOf(highcard);
        this.playedCards.forEach((card)=>{
            this.playerScores[this.high] += card.points;
        });
        //show newHand button and trick message
        console.log(this.counted);
        this.turnOver = true;
        this.high = this.lead;
        return;      
    };

    this.newTrick = ()=>{
        this.turnOver = false;
        this.turnOrder = [];
        this.playedCards = [];
        console.log('newTrick called');
        if(this.lead === 0){
            this.playerTurn = true;
        }
        else{
            ai.lead(this.playerHand);
        }
    };

    this.newHand = ()=>{
        this.turnOver = false;
        console.log('newHand called');
        this.turnOrder = [];
        this.playedCards = [];
        this.passReady=true;
        this.passTarget ++;
        if (this.passTarget === 5){
            this.passTarget = 1;
        }
        this.passPlayer = this.players[this.passTarget];
        this.passArray = [];
    };



};