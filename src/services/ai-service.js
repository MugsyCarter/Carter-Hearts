export default function aiService() {
    return {
        pass(hand, playerHand){
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
            if (spades.length ===1 && spades[0].value >= 12){ 
                console.log(spades[0]);
                aiPass.compPass.push(spades[0]);
                spades = [];
            }
            if (hearts.length === 1 && hearts[0].value >= 6){
                console.log(hearts);
                aiPass.compPass.push(hearts[0]);
                hearts=[];
            }
            if (clubs.length ===1 && clubs[0].value >= 4){
                console.log(clubs);
                aiPass.compPass.push(clubs[0]);
                clubs=[];
            }
            if (diamonds.length ===1 && diamonds[0].value >= 4){
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
            //If too small, fill it with high cards
            else if(aiPass.compPass.length < 3){
                var full = hearts.concat(spades).concat(clubs).concat(diamonds);
                console.log('full AI is ', full); 
                var sorted = full.sort(function(a,b){
                    return a.number - b.number;
                });
                console.log('sorted is ', sorted);
                while(aiPass.compPass.length<3){
                    var y = sorted.pop();
                    aiPass.compPass.push(y);
                } 
            }
            console.log('at end of ai');
            console.log('player hand is ', aiPass.playerHand);
            console.log('comp Pass is ', aiPass.compPass);


            aiPass.playerHand = aiPass.playerHand.concat(aiPass.compPass);
            aiPass.compHand = aiPass.compHand.filter((card)=>{
                return card !== aiPass.compPass[0] && card !== aiPass.compPass[1] && card !== aiPass.compPass[2];
            });
            console.log('playerHand is now ', aiPass.playerHand);
            console.log('computer pass object is', aiPass);
            return aiPass;
        },

        lead(counted, hand){

        },

        play(playedCards, lead, hand){
            console.log('Computer now playing.  This is their hand :'+hand+' and this is their playedCards'+ playedCards + ' and this is the lead'+ lead);
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
                        //if no diamonds, you have yo play your second highest spade
                        //RUN FLAG
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
                this.playedCards[0] = card;
                this.nextPlayer();
            }
            //it is not the lead play so pointers are OK
            else{
                console.log('aiPlay normal hand');
                return;
            }
        }
    };
};

