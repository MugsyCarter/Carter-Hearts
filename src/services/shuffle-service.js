petService.$inject = ['$http', 'apiUrl'];

export default function petService($http, apiUrl) {
    return {
        get(){
            	return $http.get(`${apiUrl}`)
                // .then(res => res.data);
                .then(cards => {
                 //get a shuffled deck form the API, parse it, and take only the cards
                    let jsonData = (JSON.parse(cards));
                    const deck = jsonData.cards;
                    // res.send(deck);
            
                    const finalDeck = [];
            //for each card, create an object to save in the db
                    deck.forEach(function(card){

                        if(card.value = 'JACK'){
                            card.value = '11';
                        }
                        else if (card.value = 'QUEEN'){
                            card.value = '12';
                        }
                        else if (card.value = 'KING'){
                            card.value = '13';
                        }
                        else if (card.value = 'ACE'){
                            card.value = '14';
                        }
                        
                        if(card.code==='QS'){
                            card.points = 13;
                        }
                        else if(card.code ==='10H'){
                            card.points = 10;
                        }
                        else if (card.suit === 'HEARTS'){
                            card.points = 1;
                        }
                        else{
                            card.ponts = 0;
                        }

                        let newCardEntry = {
                            code: card.code,
                            image: card.image,
                            suit: card.suit,
                            number: parseInt(card.value),
                            points: card.points
                        };
                    
                        finalDeck.push(newCardEntry);

                        cards.send(finalDeck);
                // //  save each card in the db
                //         new Card(newCardEntry).save()
                //         .then(saved => res.send(saved));
                //     });
                    })
    .catch(next);
// };
                });

        }

    };

}
