//IIFE here
(function(module) {
  var Deck ={};
  Deck.shuffled = [];
  Deck.compDecks =[];
  //sorts cards by number

  Deck.sortCards = function(hand){
    hand.sort(function(a,b){
      return a.value-b.value;
    });
  };

    //Sort player hand into suit arrays
  Deck.sortSuits = function(hand){
    Deck.playerHearts = hand.filter(function(card){
      return card.suit === 'HEARTS';
    });
    Deck.playerSpades = hand.filter(function(card){
      return card.suit === 'SPADES';
    });
    Deck.playerDiamonds = hand.filter(function(card){
      return card.suit === 'DIAMONDS';
    });
    Deck.playerClubs = hand.filter(function(card){
      return card.suit === 'CLUBS';
    });
    //combine suit arrays to make final sorted player hand
    Deck.sortedHand = Deck.playerHearts.concat(Deck.playerSpades).concat(Deck.playerDiamonds).concat(Deck.playerClubs);
    //add cards from sorted player hand to the DOM as html elements.
    for (var i =0; i < Deck.sortedHand.length; i++){
      $('.hand').append('<div class="playerCard" id="'+Deck.sortedHand[i].code+'" data-suit="'+Deck.sortedHand[i].suit+'" data-value="'+Deck.sortedHand[i].value+'"><img class="card-img" id="player-card'+Deck.sortedHand[i].code+'" src="'+Deck.sortedHand[i].image+'"</div>');
    };
  };

  //Sort computer hands into suit arrays
  Deck.sortCompSuits = function(hand){
    for (var k=1; k<4; k++){
      Deck.compHearts = hand.filter(function(card){
        return card.suit === 'HEARTS';
      });
      Deck.compSpades = hand.filter(function(card){
        return card.suit === 'SPADES';
      });
      Deck.compDiamonds = hand.filter(function(card){
        return card.suit === 'DIAMONDS';
      });
      Deck.compClubs = hand.filter(function(card){
        return card.suit === 'CLUBS';
      });
      //combine suit arrays to make final sorted computer hands
      Deck.comp = Deck.compHearts.concat(Deck.compSpades).concat(Deck.compDiamonds).concat(Deck.compClubs);
    }
    Deck.compDecks.push(Deck.comp);
    console.log(Deck.compDecks);

  };




//ajax call fetches a shuffled deck and deals out 13 cards
  Deck.dealCards = function(){
    console.log('dealing cards');
    $.ajax('https://deckofcardsapi.com/api/deck/new/draw/?count=52', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });

    function successHandler(data){
      console.log('AJAX CALL WAS A ROUSING SUCCESS:', data);
      Deck.shuffled = data.cards;
      //asigns number values to face cards
      Deck.noFaces=Deck.shuffled.map(function(obj){
        if (obj.value==='JACK'){
          obj.value=11;
        }
        else if(obj.value==='QUEEN'){
          obj.value=12;
        }
        else if(obj.value==='KING'){
          obj.value=13;
        }
        else if(obj.value==='ACE'){
          obj.value=14;
        }
        return obj;
      });
      //assigns point values to all cards
      Deck.final=Deck.noFaces.map(function(obj){
        if (obj.suit==='HEARTS' && obj.value==='10'){
          obj.points=10;
        }
        else if(obj.suit==='HEARTS'){
          obj.points=1;
        }
        else if(obj.value==='QUEEN' && obj.suit==='SPADES'){
          obj.points=13;
        }
        else{
          obj.points=0;
        }
        return obj;
      });

      //deal hands
      Deck.playerHand = Deck.final.splice(0,13);
      Deck.comp1Hand = Deck.final.splice(0,13);
      Deck.comp2Hand = Deck.final.splice(0,13);
      Deck.comp3Hand = Deck.final;

      //sort player hands numerically
      Deck.sortCards(Deck.playerHand);
      Deck.sortCards(Deck.comp1Hand);
      Deck.sortCards(Deck.comp2Hand);
      Deck.sortCards(Deck.comp3Hand);

      //sort hands by suit
      Deck.sortSuits(Deck.playerHand);
      Deck.sortCompSuits(Deck.comp1Hand);
      Deck.sortCompSuits(Deck.comp2Hand);
      Deck.sortCompSuits(Deck.comp3Hand);

      //add cards from sorted comp hand to the DOM as html elements.  Make sure to delete these lines later.
      for (var i =0; i < Deck.compDecks[0].length; i++){
        $('.compHand1').append('<div class="comp1Card" id="'+Deck.compDecks[0][i].code+'" data-suit="'+Deck.compDecks[0][i].suit+'" data-value="'+Deck.compDecks[0][i].value+'"><img class="card-img" id="comp0-card'+Deck.compDecks[0][i].code+'" src="'+Deck.compDecks[0][i].image+'"</div>');
      }
      for (var i =0; i < Deck.compDecks[1].length; i++){
        $('.compHand2').append('<div class="comp2Card" id="'+Deck.compDecks[1][i].code+'" data-suit="'+Deck.compDecks[1].suit+'" data-value="'+Deck.compDecks[1][i].value+'"><img class="card-img" id="comp1-card'+Deck.compDecks[0][i].code+'" src="'+Deck.compDecks[1][i].image+'"</div>');
      }
      for (var i =0; i < Deck.compDecks[2].length; i++){
        $('.compHand3').append('<div class="comp3Card" id="'+Deck.compDecks[2][i].code+'" data-suit="'+Deck.compDecks[2].suit+'" data-value="'+Deck.compDecks[2][i].value+'"><img class="card-img" id="comp2-card'+Deck.compDecks[0][i].code+'" src="'+Deck.compDecks[2][i].image+'"</div>');
      }
      $('.banner').append('<button class = "button" id="pass-button">Pass</button>');
    };




    function errorHandler(error){
      console.log('AJAX CALL ERROR', error);
    };
  };



  // make Deck object available globally
  module.Deck = Deck;
})(window);
