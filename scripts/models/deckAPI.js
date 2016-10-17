//IIFE here
(function(module) {
  var Deck ={};
  Deck.playerHand = [];

  Deck.dealCards = function(){
    console.log('dealing cards');
    $.ajax('https://deckofcardsapi.com/api/deck/new/draw/?count=13', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });

    function successHandler(data){
      console.log('SUCCESS', data);
      Deck.playerHand = data.cards;
      console.log(Deck.playerHand);
      Deck.allNumbers=Deck.playerHand.map(function(obj){
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

      Deck.allNumbers.sort(function(a,b){
        return a.value-b.value;
      });
      Deck.playerHearts = Deck.allNumbers.filter(function(card){
        return card.suit === 'HEARTS';
      });
      Deck.playerSpades = Deck.allNumbers.filter(function(card){
        return card.suit === 'SPADES';
      });
      Deck.playerDiamonds = Deck.allNumbers.filter(function(card){
        return card.suit === 'DIAMONDS';
      });
      Deck.playerClubs = Deck.allNumbers.filter(function(card){
        return card.suit === 'CLUBS';
      });

      Deck.sortedHand = Deck.playerHearts.concat(Deck.playerSpades).concat(Deck.playerDiamonds).concat(Deck.playerClubs);
      for (var i =0; i < Deck.sortedHand.length; i++){
        $('.hand').append('<div class="playerCard" id="'+Deck.sortedHand[i].code+'" data-suit="'+Deck.sortedHand[i].suit+'" data-value="'+Deck.sortedHand[i].value+'"><img src="'+Deck.sortedHand[i].image+'"</div>');
        console.log('adding card'+ Deck.sortedHand[i].suit + Deck.sortedHand[i].value);
      };




    };

    function errorHandler(error){
      console.log('ERROR', error);
    };
  };



  // make Deck object available globally
  module.Deck = Deck;
})(window);
