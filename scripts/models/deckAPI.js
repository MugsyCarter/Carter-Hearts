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
