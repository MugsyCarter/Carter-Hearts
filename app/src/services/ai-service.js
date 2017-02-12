export default function aiService() {
    return {
        pass(hand, playerHand, difficulty){
            var aiPass = {
                compPass: [],
                compHand: hand,
                playerHand: playerHand
            };
            console.log('in aiService, hand is', hand);
            console.log('hand length is ', hand.length);
         
            var hearts = hand.filter(function(card){
                return card.suit === 'HEARTS';
            });
            var spades = hand.filter(function(card){
                return card.suit === 'SPADES';
            });
            var diamonds = hand.filter(function(card){
                return card.suit === 'DIAMONDS';
            });
            var clubs = hand.filter(function(card){
                return card.suit === 'CLUBS';
            });

        // If spades and queen or greater pass first, 
        //   then pass high();
        //     If only 1 card (not spades) add card to comp pass array and remove from the comp hand
            if (spades.length ===1 && spades[0].number >= 12){ 
                console.log(spades[0]);
                aiPass.compPass.push(spades[0]);
                spades = [];
            }
            if (hearts.length === 1 && hearts[0].number >= 6){
                console.log(hearts);
                aiPass.compPass.push(hearts[0]);
                hearts=[];
            }
            if (clubs.length ===1 && clubs[0].number >= 4){
                console.log(clubs);
                aiPass.compPass.push(clubs[0]);
                clubs=[];
            }
            if (diamonds.length ===1 && diamonds[0].number >= 4){
                console.log(diamonds);
                aiPass.compPass.push(diamonds[0]);
                diamonds=[];
            }

        // If not spades and less than the remaining cards, pass all.
            if (diamonds.length === 2){
                aiPass.compPass.push(diamonds[0]);
                aiPass.compPass.push(diamonds[1]);
                diamonds=[];
            }
            if (clubs.length === 2){
                aiPass.compPass.push(clubs[0]);
                aiPass.compPass.push(clubs[1]);
                clubs=[];
            }
            console.log('computer pass is ', aiPass.compPass);
            //if none of the above apply pass a middling heart to mess with the player
            if(aiPass.compPass.length === 0 && hearts.length>2){
                var sortedHearts = hearts.sort(function(a, b){
                    return a.number - b.number;
                });
                aiPass.compPass.push(sortedHearts[1]);
                sortedHearts.splice(1,1);
                hearts = sortedHearts;
                console.log('MIDDLING HEART.  hearts are '+ hearts+ ' and the heart was '+aiPass.compPass[0].code);
            }
            else if(hearts.length<=2){
                while(hearts.length > 0){
                    var heartPass = hearts.pop();
                    aiPass.compPass.push(heartPass);
                }
            }
            if (aiPass.compPass.length ===3){
                aiPass.compHand = hearts.concat(spades).concat(clubs).concat(diamonds);
            }
            //If comp pass is too big or too small
            else if (aiPass.compPass.length >3){
                while(aiPass.compPass.length >3){
                    var x = aiPass.compPass.pop();
                    hearts.push(x);
                }
                aiPass.compHand = hearts.concat(spades).concat(clubs).concat(diamonds);
            }

            //If too small, fill 
            else if(aiPass.compPass.length < 3){
                var full = hearts.concat(spades).concat(clubs).concat(diamonds);
                console.log('full AI is ', full); 
                var sorted = full.sort(function(a,b){
                    return a.number - b.number;
                });
                console.log('sorted is ', sorted);
                //if hard add highest cards
                if(difficulty==='hard'){
                    while(aiPass.compPass.length<3){
                        var z = sorted.pop();
                        aiPass.compPass.push(z);
                    } 
                }
                    //if easy, fill with medium cards
                else {
                    console.log('EASYPASS');
                    while(aiPass.compPass.length<3){
                        var y = sorted.splice(4,1);
                        aiPass.compPass.push(y[0]);
                    } 
                }
            }
            aiPass.playerHand = aiPass.playerHand.concat(aiPass.compPass);
            aiPass.compHand = aiPass.compHand.filter((card)=>{
                return card !== aiPass.compPass[0] && card !== aiPass.compPass[1] && card !== aiPass.compPass[2];
            });
            console.log('playerHand is now ', aiPass.playerHand);
            console.log('computer pass object is', aiPass);
            return aiPass;
        },

        lead(hand, counted, events, runFlag){
            console.log('ai leading.  hand: '+hand+' counted: '+counted+' events: '+events);
            console.log('runFlag for the lead is ', runFlag);
            var hearts = hand.filter(function(card){
                return card.suit === 'HEARTS';
            });
            var spades = hand.filter(function(card){
                return card.suit === 'SPADES';
            });
            var diamonds = hand.filter(function(card){
                return card.suit === 'DIAMONDS';
            });
            var clubs = hand.filter(function(card){
                return card.suit === 'CLUBS';
            });

            var dangerSpades = spades.filter((card)=>{
                return card.number >11;
            });

            var dangerHearts = hearts.filter((card)=>{
                return card.number >9;
            });

            var aiQueen = spades.filter((card)=>{
                return card.number === 12;
            });

            var aiTen = hearts.filter((card)=>{
                return card.number === 10;
            });

            if (runFlag === 1){
                //ai is trying to run it
                //implement run lead
                console.log('run lead');
                return hand[hand.length-1];
            }
            else{
                //no run, try to stay alive
                //first, clear any voids
                //#1 clear spade void first 
                if (spades.length === 1 && spades[0].number < 12 && counted.SPADES < 9){
                    return spades[0];
                }
                //#2 clear heart void next if broken
                else if (hearts.length === 1 && hearts[0].number < 10 && events.heartsBroken === true && counted.HEARTS > 9){
                    return hearts[0];
                }
                //#3 then clear diamond void
                else if (diamonds.length === 1 && counted.DIAMONDS > 9){
                    return diamonds[0];
                }
                //#4 then clear club void 
                else if (clubs.length === 1 && counted.CLUBS < 6){
                    return clubs[0];
                }
                //#5 then smoke the queen
                else if(dangerSpades.length === 0 && events.queen===false && spades.length>0){
                    return spades[spades.length-1];
                }
                //#6 smoke the 10 
                else if(events.heartsBroken ===true && dangerHearts.length === 0 && events.ten===false && hearts.length>0){
                    return hearts[hearts.length-1];
                }

                //check to see if you have the queen or ten
                //lead low spade
                else if (aiQueen.length<1 && spades.length > 0 && spades[0].number < 12 && counted.SPADES < 9){
                    return spades[0];
                }
                //lead low heart
                else if (events.heartsBroken === true && aiTen.length <1 && hearts.length > 0 && hearts[0].number < 10 && counted.HEARTS < 9){
                    return hearts[0];
                }
                //lead low diamond
                else if (diamonds.length > 0 && counted.DIAMONDS <9){
                    console.log(diamonds);
                    return diamonds[0];
                }
                //lead low club
                else if (clubs.length > 0 && counted.CLUBS <9){
                    return clubs[0];
                }
                //lead low heart
                else if (events.heartsBroken === true && hearts.length>0 && hearts[0].number < 10 && counted.HEARTS < 10){
                    return hearts[0];
                }
                //lead low spade
                else if (spades.length > 0 && spades[0].number <12 && counted.SPADES < 10){
                    return spades[0];
                }
                else{
                    console.log('last resort lead');
                    return hand[0];
                }
            }
        },

        play(playedCards, lead, hand, counted, events, highCard, trickPoints, runFlag, difficulty){
            console.log('Computer now playing.  This is their hand :'+hand+' and this is their playedCards'+ playedCards + ' and this is the lead'+ lead);
            console.log('run flag is ', runFlag);
            console.log('difficulty is ', difficulty);
            if (playedCards[lead].code === '2C'){
                console.log('aiPlay first hand');
                //if its the first hand, no pointers are allowed
                var clubs = hand.filter((card)=>{
                    return card.suit === 'CLUBS';
                });
                //if player has clubs play the highest
                if (clubs.length > 0){
                    var sortedClubs = clubs.sort((a,b)=>{
                        return b.number - a.number;
                    });
                    return sortedClubs[0];
                }
                else {
                    var spades = hand.filter((card)=>{
                        return card.suit === 'SPADES';
                    });
                    var diamonds= hand.filter((card)=>{
                        return card.suit === 'DIAMONDS';
                    });
                    //if player is low on spades see about playing one
                    if (spades.length < diamonds.length){
                        var sortedSpades = spades.sort((a,b)=>{
                            return b.number - a.number;
                        });
                        //if not the queen, play the higest spade
                        if(sortedSpades[0].code !== 'QS'){
                            return sortedSpades[0];
                        }
                        //if your higest spade is the queen see about playing a diamond
                        else if (diamonds.length > 0){
                            var sortedDiamonds = diamonds.sort((a,b)=>{
                                return b.number - a.number;
                            });
                            return sortedDiamonds[0];
                        }
                        //if no diamonds, you have to play your second highest spade
                        //RUN FLAG?
                        else {
                            return sortedSpades[1];
                        }
                    }
                    //if player is low on diamonds see about playing one
                    else{
                        var sortedDiamonds = diamonds.sort((a,b)=>{
                            return b.number - a.number;
                        });
                        return sortedDiamonds[0];
                    }
                }
            }
            //it is not the lead play so pointers are OK
            else{
                console.log('aiPlay normal hand');
                console.log('highCard is ', highCard);
              
                //check to see if ai has cards in suit
                var inSuit = hand.filter((card)=>{
                    return card.suit === playedCards[lead].suit;
                });
                var sortedInSuit = inSuit.sort((a,b)=>{
                    return b.number - a.number;
                });

                console.log('matching cards are ', sortedInSuit);

                    //if so, the ai must play one
                if (sortedInSuit.length>0){
                    console.log('not voided');
                    if (runFlag === 1){
                        console.log('run play!');
                        return sortedInSuit[0];
                    }
                        //if no pointers and last player, go big
                    console.log('trick points are ', trickPoints);
                    if(trickPoints<1 && playedCards.length > 2 &&sortedInSuit[0].points===0){
                        //no points so go big
                        return sortedInSuit[0];
                    }
                    //if spades and queen is still out there
                    else if (playedCards[lead].suit==='SPADES' && events.queen===false){
                        console.log('spades play.  Queen Out');
                        for (var i = 0; i < (sortedInSuit.length-1); i++){
                            if (sortedInSuit[i].number < 12){
                                return sortedInSuit[i];
                            }
                        }
                        console.log('nothing less that the queen');
                        return sortedInSuit[0];
                    }
                    else{    
                    //otherwise play highest in suit below high card
                        for(var i=0; i < sortedInSuit.length; i++){
                            if (sortedInSuit[i].number < highCard.number){
                                return sortedInSuit[i];
                            }
                        }
                        //if none are lower, play highest
                        return(sortedInSuit[0]);
                    }
                }
                else{
                    console.log('VOIDED!');
                    console.log('hand is ',hand);
                    var hearts = [];
                    var spades = [];
                    var clubs = [];
                    var diamonds = [];
                    var theQueen = [];
                    var theTen = [];
                    var sortedHand = [];
                    //play whatever
                    hearts = hand.filter(function(card){
                        return card.suit === 'HEARTS';
                    });
                    spades = hand.filter(function(card){
                        return card.suit === 'SPADES';
                    });
                    diamonds = hand.filter(function(card){
                        return card.suit === 'DIAMONDS';
                    });
                    clubs = hand.filter(function(card){
                        return card.suit === 'CLUBS';
                    });
                    if(spades.length >0){
                        theQueen = spades.filter((card)=>{
                            return card.number === 12;
                        });
                    }
                    if (hearts.length>0){
                        theTen = hearts.filter((card)=>{
                            return card.number === 10;
                        });
                    }
                    sortedHand = hand.sort((a,b)=>{
                        return b.number - a.number;
                    });
                    if (runFlag === 1){
                        console.log('run play!');
                        return sortedHand[sortedHand.length-1];
                    }
                    console.log('right above priorities');
                    if (difficulty === 'hard'){
                        //priority 1: dump queen
                        if (theQueen.length>0){
                            return theQueen[0];
                        }
                        //priority 1.5: ten protection
                        else if (hearts.length>0 && hearts.length<3 && hearts[0].number > 9){
                            return hearts[0];
                        }
                        //priority 2: dump to make void
                        else if (hearts.length === 1){
                            return hearts[0];
                        }
                        else if (diamonds.length === 1){
                            return diamonds[0];
                        }
                        else if (clubs.length === 1){
                            return clubs[0];
                        }
                        else if (spades.length === 1){
                            return spades[0];
                        }
                        //priority 3 dump high spade
                        else if (spades.length > 0 && spades.length < 4){
                            return spades[0];
                        }
                        //priority 4 dump high heart
                        else if (hearts.length > 0 && hearts.length < 4){
                            return hearts[0];
                        }
                        //priority 5: dump near voids
                        else if (diamonds.length > 0 && diamonds.length<3 && diamonds[0].number > 9){
                            return diamonds[0];
                        }
                        else if (clubs.length > 0 && clubs.length<3 && clubs[0].number > 9){
                            return clubs[0];
                        }
                        else if (hearts.length > 0 && hearts.length<3 && diamonds[0].number > 9){
                            return hearts[0];
                        }
                        //priority 6: dump high
                        else{
                            return sortedHand[0];
                        }
                    }
                    //easy play
                    else {
                        return sortedHand[0];
                    }
                }
                return;
            }
        }
    };
};

