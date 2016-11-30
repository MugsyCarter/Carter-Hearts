$('#pass-button').on('click', function(event){
  event.preventDefault();
  var index = -1;
  console.log('pass button clicked');
  console.log('turn is ', Turn.pass);
  // console.log('pass direction is ,' Turn.pass);
  if (Deck.passArray.length === 3){
    var playerPassCards = Deck.sortedHand.filter(function(card){
      return Deck.passArray.indexOf(card.code);
    });
    console.log('playerPassCards are ', playerPassCards);

    Turn.passDeck.push(Deck.passArray);
    for (var i = 0; i < Deck.sortedHand.length; i++){
      index = Deck.passArray.indexOf(Deck.sortedHand[i].code);

      if (index>-1){
        //can also add in new cards here
        Deck.sortedHand.splice(i, 1);
      }
    };
    console.log(Deck.passArray);
    console.log(Deck.sortedHand);
    Deck.passArray = [];
  }
  else{
    console.log('not enough cards');
    $('#small-pass-message').fadeIn().fadeOut(4000);
  }
});
