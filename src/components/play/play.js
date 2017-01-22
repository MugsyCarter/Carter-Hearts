import template from './play.html';

export default {
    template,
    controller
};

controller.$inject = ['shuffleService', 'aiService', '$timeout', '$rootScope'];

function controller(shuffle, ai, timeout) {
    this.beginning = true;
    this.showDeal = true;
    this.handStart = false;
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
    this.heartLeadError = false;
    this.passTarget = 0;
    this.lead = 0;
    this.trickPoints = 0;
    this.firstLead = false;
    this.holdHand = false;
    this.gameOver = false;
    this.cardPlayed = false;
    this.turnOrder = [];
    this.playedCards = [];
    this.highCard = {};
    this.counted={
        CLUBS: 0,
        HEARTS: 0,
        DIAMONDS: 0,
        SPADES: 0
    };
    this.events={
        queen: false,
        ten: false,
        heartsBroken: false,
    };

    this.players = ['you', 'George', 'Denny', 'Aileen'];
    this.playerScores = [0,0,0,0];
    this.playerSemis =[0,0,0,0];

    this.dealCards = ()=>{
        this.gameOver = false;
        this.sortedHand=[];
        
        this.beginning = false;
        this.showDeal = false;
        this.handStart = false;
        this.playerSemis = [0,0,0,0];
        this.passTarget ++;
        this.passPlayer = this.players[this.passTarget];
        if (this.passTarget === 4){
            this.passTarget === 0;
            this.holdHand = true;
            this.playReady = true;
        }
        else{
            this.passReady=true;
        }

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
                    else if(card.code ==='0H'){
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
        //re-sort the player's hand and the computer Hand
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
        this.holdHand = false;
        this.playReady = false;
        this.cardPlayed = false;
        this.playedCards = [];
        this.turnOrder = [];
        //find the two of CLUBS
        for (var i = 1; i <4; i++){
            if (this.hands[i][0].code === '2C'){
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
            this.playedCard = false;
            this.lead = 0;
            this.firstLead = true;
            this.hand[0].toggled = true;
            return;
        }
    };

    this.clicked = (card)=>{
        console.log('clicked');
        console.log('card is ', card);
        if (this.cardPlayed === false){
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
                //first hand options
                if(this.firstLead === true && card.code !== '2C'){
                    //if its the first hand and the player must play the two 
                    this.twoError = true;
                    timeout(()=>{this.twoError=false;}, 3000);
                }
                else if (this.firstLead ===true && card.code === '2C'){
                    this.playTwo = false;
                    this.playCard(card, 0);
                    this.firstLead = false;
                }
                //player lead options
                else if (this.lead === 0){
                //player can lead anything but hearts
                    if(card.suit !== 'HEARTS'){
                        //non-pointers are OK
                        this.playCard(card, 0);
                    }
                    else{
                        if (this.events.heartsBroken === true){
                            //if hearts have been broken, its OK
                            this.playCard(card, 0);
                        }
                        else{
                            var playerNonHearts = this.hand.filter(function(card){
                                return card.suit !== 'HEARTS';
                            });
                            if(playerNonHearts.length <1){
                                //if player has no non-hearts, the play is OK
                                this.playCard(card, 0); 
                            }
                            else{
                                //invalid play
                                this.heartLeadError = true;
                                timeout(()=>{this.heartLeadError=false;}, 5000);
                            }
                        }
                    }
                }
                //player play options
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
        }
    };

    this.playCard = (card, player)=>{
        //this function play a card and removesit from the player's hand
        this.playedCards[player] = card;
        this.turnOrder.push(player);
        if (player === 0){
            this.cardPlayed = true;
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
        //add trick points
        this.trickPoints += card.points;
        //check for special events
        if (card.code === 'QS'){
            this.events.queen = true;
        }
        else if (card.points === 10){
            this.events.ten = true;
            this.events.heartsBroken = true;
        }
        else if (card.points === 1){
            this.events.heartsBroken = true;
        }
        //check to see if this is the new high card
        var suited = this.playedCards.filter((card)=>{
            return card.suit === this.playedCards[this.lead].suit;
        });
        var sortedSuited = suited.sort((a,b)=>{
            return b.number - a.number;
        });
        this.highCard = sortedSuited[0];
        this.high = this.playedCards.indexOf(this.highCard);

        //call the next player
        this.nextPlayer();
    };

    this.nextPlayer = ()=>{
        console.log('in nextPlayer');
        //if not last play 
        // while(this.turnOrder.length < 4){
        var lastPlayer = this.turnOrder[this.turnOrder.length-1];
        var currentPlayer = lastPlayer +1;
        //if all players have played resolve the trick
        if(this.turnOrder.length > 3){
            console.log('end of trick');
            //all players have played so resolve the points
            this.playedCards.forEach((card)=>{
                this.playerScores[this.high] += card.points;
                this.playerSemis[this.high] += card.points;
            });
            //show newHand button and trick message
            this.turnOver = true;
            this.lead = this.high;
            //count cards to check if hand is over
            this.totalCards = this.counted.HEARTS + this.counted.SPADES + this.counted.DIAMONDS + this.counted.CLUBS;
            if (this.totalCards === 52){
            //hand is over
                this.newHand();
            }
            return;
        }
        //else figure out it its the user or the AI
        else{
            if (currentPlayer === 4){
                currentPlayer = 0;
                this.playerTurn = true;
                return;
                //let the Player Play
            }
            else {
                //its the AIs turn.  Let the AI play.
                this.PlayerTurn = false;
                var aiPlay = ai.play(this.playedCards, this.lead, this.hands[currentPlayer], this.counted, this.events, this.highCard, this.trickPoints);
                this.playCard(aiPlay, currentPlayer);
            }
        }
    };

    this.newTrick = ()=>{
        this.turnOver = false;
        this.turnOrder = [];
        this.playedCards = [];
        this.trickPoints = 0;
        this.cardPlayed = false;
        if(this.lead === 0){
            this.playerTurn = true;
        }
        else{
            this.leadCard = ai.lead(this.hands[this.lead], this.counted, this.events);
            this.playedCards[this.lead]=this.leadCard;
            console.log(this.leadCard, ' this is the leadCard');
            this.playCard(this.leadCard, this.lead);
        }  
    };

    this.newHand = ()=>{
        this.cardPlayed = false;
        this.playedCards = [];
        this.turnOrder = [];
        this.highCard = {};
        this.trickPoints = 0;
        this.counted={
            CLUBS: 0,
            HEARTS: 0,
            DIAMONDS: 0,
            SPADES: 0
        };
        this.events={
            queen: false,
            ten: false,
            heartsBroken: false,
        };
        this.playerScores.forEach((playerScore)=>{
            if (playerScore >99){
                this.endGame();
                return;
            }
        });
        this.turnOver = false;
        this.showDeal = true;
        this.handStart = true;
    };

    this.endGame = ()=>{
        var winner = 0;
        for (var i = 1; i < 4; i++){
            if (this.playerScores[i] > this.playerScores[i-1]){
                winner = i;
            }
        } 
        if (winner===0){
            this.winMessage = 'You won Carter Hearts!  Congratulations!';
        }
        else{
            this.winMessage = this.players[i] + ' has won the game.  You can\'t win them all.';
        }
        this.gameOver = true;
    };

};