

var CardView = {};
//deals cards and dissapears
$('#deal-button').on('click', function(){
  Deck.dealCards();
  $(this).hide();
});

//passes cards and dissapears
//this function is currently not written.
$('#deal-button').on('click', function(){
  CardView.pass();
  $(this).hide();
});

CardView.pass = function(){
  //Logic to show hand here.
};

CardView.playCard = function(){
  //Logic to show hand here.
};
