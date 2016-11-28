(function(module) {
  console.log('Turn running');
  var Turn = {};
  Turn.turn = 0;
  Turn.pass = '';
  Turn.passPlayer = '';
  Turn.newTurn = function(){
    Turn.turn ++;
    if(Turn.turn%4 ===0){
      Turn.pass = 'none';
    }
    else if(Turn.turn%3 ===0){
      Turn.pass = 'across';
      Turn.passDeck = Deck.comp2Hand;
    }
    else if(Turn.turn%2 ===0){
      Turn.pass = 'right';
      Turn.passDeck = Deck.comp3Hand;
    }
    else{
      Turn.pass = 'left';
      Turn.passDeck = Deck.comp1Hand;
    }
  };
  module.Turn = Turn;
})(window);
