$('#pass-button').on('click', function(event){
  event.preventDefault();
  var index = -1;
  console.log('pass button clicked');
  console.log('turn is ', Turn.pass);
  // console.log('pass direction is ,' Turn.pass);

  if (Deck.passArray.length === 3){
    $('#pass-button').fadeOut();
    $('.playerCard').detach();
    var passIdArray = [];
   
  //create computer player pass here.
  

   


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



  }
  else{
    console.log('not enough cards');
    $('#small-pass-message').fadeIn().fadeOut(4000);
  }
});
