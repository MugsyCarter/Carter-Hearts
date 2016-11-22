$('#pass-button').on('click', function(event){
  event.preventDefault();
  if (Deck.passArray.length === 3){
    //pass functionality here
  }
  else{
    $('#pass-button').append('<br><br><h1>You must select three cards to pass<h1>');
  }
});
