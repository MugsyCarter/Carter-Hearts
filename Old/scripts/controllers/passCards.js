$('#pass-button').on('click', function(event){
  event.preventDefault();
  var index = -1;
  console.log('pass button clicked');
  console.log('turn is ', Turn.pass);
  var passTarget = 0;
  // console.log('pass direction is ,' Turn.pass);
  if (Turn.pass === 'left'){
    passTarget = 1; 
  }
  if (Turn.pass === 'right'){
    passTarget = 3; 
  }
  else {
    passTarget = 2;
  }

  if (Deck.passArray.length === 3){
    $('#pass-button').fadeOut();
    $('.playerCard').detach();
    var passIdArray = [];
   
    console.log('pass target is ', passTarget);
    console.log('passArray is ', Deck.passArray);
    Deck.passObject[passTarget] = Deck.passArray;
  //create computer player pass here.
    AI.passCards(Deck.comp1Hand, 1);
    AI.passCards(Deck.comp2Hand, 2);
    AI.passCards(Deck.comp3Hand, 3);

    console.log('pass object is ', Deck.passObject);
    console.log('comp decks are ', Deck.compDecks);


    Deck.passArray.forEach( function(card){
      passIdArray.push(card.id);
    });
   
    console.log('passIdArray is ', passIdArray);

    // Turn.passDeck.push(Deck.passArray);

    for (var i = 0; i < Deck.sortedHand.length; i++){
      index = passIdArray.indexOf(Deck.sortedHand[i].code);
    
      if (index>-1){
        //can also add in new cards here
        console.log('removing this card: '+ Deck.sortedHand[i].code);
        Deck.sortedHand.splice(i, 1);
        i--;
      }
    };
    console.log(passIdArray);
    console.log(Deck.sortedHand);
    Deck.passArray = [];
    //this is showing the hand with the pass cards removed, i still need to add in the new cards and sort the hand.
    for (var i =0; i < Deck.sortedHand.length; i++){
      $('.hand').append('<div class="playerCard" id="'+Deck.sortedHand[i].code+'" data-suit="'+Deck.sortedHand[i].suit+'" data-value="'+Deck.sortedHand[i].value+'" data-clicked=false><img class="card-img" id="player-card'+Deck.sortedHand[i].code+'" src="'+Deck.sortedHand[i].image+'"</div>');
    }



    $('#begin-play-message').fadeIn().fadeOut(3000);
    //put the start play function call here once written
  }
  else{
    console.log('not enough cards');
    $('#small-pass-message').fadeIn().fadeOut(4000);
  }
});
