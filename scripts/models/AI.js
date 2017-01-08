//IIFE here
(function(module) {
  var AI ={};

  AI.passCards = function(deck, player){
    var compPass = [];
    var target = 0;
    console.log('pass direction is ', Turn.pass);
    if (Turn.pass === 'left'){
      target=player-1; 
    }
    if (Turn.pass === 'right'){
      target=player+1; 
    }
    else {
      target=player+2; 
    }

    if(target === 0 || target >3){
        target = 'user';
    }
    console.log('In AI pass controller for comp player '+ player+ '.  Their deck is '+deck);
    AI.hearts = deck.filter(function(card){
      return card.suit === 'HEARTS';
    });
    AI.spades = deck.filter(function(card){
      return card.suit === 'SPADES';
    });
    AI.diamonds = deck.filter(function(card){
      return card.suit === 'DIAMONDS';
    });
    AI.clubs = deck.filter(function(card){
      return card.suit === 'CLUBS';
    });

    // If spades and queen or greater pass first, 
//   then pass high();
//     If only 1 card (not spades) add card to comp pass array and remove from the comp hand
    if (AI.spades.length ===1 && AI.spades[0].value >= 12){ 
      console.log(AI.spades[0]);
      compPass.push(AI.spades[0]);
      AI.spades = [];
    }
    if (AI.hearts.length === 1 && AI.hearts[0].value >= 6){
      console.log(AI.hearts);
      compPass.push(AI.hearts[0]);
      AI.hearts=[];
    }
    if (AI.clubs.length ===1 && AI.clubs[0].value >= 4){
      console.log(AI.clubs);
      compPass.push(AI.clubs[0]);
      AI.clubs=[];
    }
    if (AI.diamonds.length ===1 && AI.diamonds[0].value >= 4){
      console.log(AI.diamonds);
      compPass.push(AI.diamonds[0]);
      AI.diamonds=[];
    }

// If not spades and less than the remaining cards, pass all.
    if (AI.diamonds.length <= 2){
      compPass.push(AI.diamonds);
      AI.diamonds=[];
    }
    if (AI.clubs.length <= 2){
      compPass.push(AI.clubs);
      AI.clubs=[];
    }
    console.log('computer '+player+'pass is ', compPass);
    if (compPass.length ===3){
      AI.full = AI.hearts.concat(AI.spades).concat(AI.clubs).concat(AI.diamonds);
      console.log('full AI is ', AI.full); 
    }
    //If comp pass is too big or too small
    else if (compPass===4){
      var x = compPass.pop();
      AI.hearts.push(x);
      AI.full = AI.hearts.concat(AI.spades).concat(AI.clubs).concat(AI.diamonds);
      console.log('full AI is ', AI.full); 
      AI.sorted = AI.full;
    }
    //If too small, fill it with high cards
    else if(compPass.length < 3){
      AI.full = AI.hearts.concat(AI.spades).concat(AI.clubs).concat(AI.diamonds);
      console.log('full AI is ', AI.full); 
      AI.sorted = AI.full.sort(function(a,b){
        return a.value - b.value;
      });
      while(compPass.length<3){
        var y = AI.sorted.pop();
        compPass.push(y);
      } 
    }

    console.log('computer '+player+'pass is ', compPass);
    Deck.passObject[target] = compPass;
    Deck.compDecks[player-1] = AI.sorted;
  };

  module.AI = AI;
})(window);