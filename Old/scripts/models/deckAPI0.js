//IIFE here
(function(module) {
  var Deck ={};
  Deck.shuffled = [];

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
      console.log(Deck.playerHand);
      //sort player hand numerically
      Deck.playerHand.sort(function(a,b){
        return a.value-b.value;
      });
      //Sort player hand into suit arrays
      Deck.playerHearts = Deck.playerHand.filter(function(card){
        return card.suit === 'HEARTS';
      });
      Deck.playerSpades = Deck.playerHand.filter(function(card){
        return card.suit === 'SPADES';
      });
      Deck.playerDiamonds = Deck.playerHand.filter(function(card){
        return card.suit === 'DIAMONDS';
      });
      Deck.playerClubs = Deck.playerHand.filter(function(card){
        return card.suit === 'CLUBS';
      });
      //combine suit arrays to make final sorted player hand
      Deck.sortedHand = Deck.playerHearts.concat(Deck.playerSpades).concat(Deck.playerDiamonds).concat(Deck.playerClubs);
      //add cards from sorted player hand to the DOM as html elements.
      for (var i =0; i < Deck.sortedHand.length; i++){
        $('.hand').append('<div class="playerCard" id="'+Deck.sortedHand[i].code+'" data-suit="'+Deck.sortedHand[i].suit+'" data-value="'+Deck.sortedHand[i].value+'"><img src="'+Deck.sortedHand[i].image+'"</div>');
      };
    };

    function errorHandler(error){
      console.log('AJAX CALL ERROR', error);
    };
  };





  // make Deck object available globally
  module.Deck = Deck;
})(window);
