
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const card = require('../models/card');

const rp = require('request-promise');


router
    .get('/', (req, res, next) => {
        rp('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
                        .then(cards => {
                            //get a shuffled deck form the API, parse it, and take only the cards
                            let jsonData = (JSON.parse(cards));
                            const deck = jsonData.cards;
                            // res.send(deck);
                    
                            // const finalDeck = []
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
                         
                                // finalDeck.push(newCardEntry);



                        //  save each card in the db
                                new Card(newCardEntry).save()
                                .then(saved => res.send(saved));
                            });
                        })
            .catch(next);
        // };
    });

    .get







//         Food.find({})
//         .then(foods => {
//             if (!foods || foods.length === 0) {
//                 next({code: 404, message: 'No foods found.'});
//             }
//             else {
//                 res.send(foods);
//             };
//         })
//         .catch(next);
//     })

//     .get('/:id/name/:name', (req, res, next) => {

//         let barcode = req.params.id;
//         let name = req.params.name;

//         if (barcode > 0) {
//             // Check for a existing food entry using barcode
//             Food.find({barcode}).lean()
//             .then(food => {
//                 //     if (!food) next({code: 404, message: 'No food item found.'});
//                 if (food.length > 0) {
//                     console.log('found food item');
//                     // found in our local db, return it
//                     res.send(food);
//                 } else {
//                     console.log('No food item found in our db, call out', barcode);
//                     // Attempt to locate the info on a 3rd party
//                     rp(`${process.env.NUTRI_API}item?upc=${barcode}&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`)
//                         .then(nutrifood => {
//                             let jsonData = (JSON.parse(nutrifood));
//                             const newFoodEntry = {
//                                 name: jsonData.item_name,
//                                 barcode,
//                                 servingSize: jsonData.nf_serving_size_qty,
//                                 servingUnit: jsonData.nf_serving_size_unit,
//                                 Calories: jsonData.nf_calories,
//                                 totalCarbs: jsonData.nf_total_carbohydrate,
//                                 sugars: jsonData.nf_sugars,
//                                 fiber: jsonData.nf_dietary_fiber,
//                                 totalFats: jsonData.nf_total_fat,
//                                 saturatedFats: jsonData.nf_saturated_fat,
//                                 // unsaturatedFats: (jsonData.nf_polyunsaturated_fat + nutrifood.nf_monounsaturated_fat),
//                                 totalProtein: jsonData.nf_protein,
//                                 vetted: true,
//                                 uploadedBy: 'NutriData API'
//                             };
//                             console.log(newFoodEntry);
//                             // Create a new local DB entry for the item
//                             new Food(newFoodEntry).save()
//                                 .then(saved => res.send(saved));
//                         });
//                 }
//             })
//             .catch(next);
//         } else {
//             // search by name
//             console.log(name);
//             Food.find({name}).lean()
//             .then(food => {
//                 if (food) {
//                     console.log('Food string found: ', food);
//                     // found in our local db, return it
//                     res.send(food);
//                 } else {
//                     // No entry attempt to locate the info on a 3rd party
//                     rp(`${process.env.NUTRI_API}search/${name}?${resultParams}}&appId=${process.env.APPID}&appKey=${process.env.APP_SECRET}`)
//                         .then(nutrifood => {
//                             let jsonData = (JSON.parse(nutrifood));
//                             console.log(jsonData);
//                             const newFoodEntry = {
//                                 name: jsonData.item_name,
//                                 barcode: 888888888888,
//                                 servingSize: jsonData.nf_serving_size_qty,
//                                 servingUnit: jsonData.nf_serving_size_unit,
//                                 Calories: jsonData.nf_calories,
//                                 totalCarbs: jsonData.nf_total_carbohydrate,
//                                 sugars: jsonData.nf_sugars,
//                                 fiber: jsonData.nf_dietary_fiber,
//                                 totalFats: jsonData.nf_total_fat,
//                                 saturatedFats: jsonData.nf_saturated_fat,
//                                 // unsaturatedFats: (jsonData.nf_polyunsaturated_fat + nutrifood.nf_monounsaturated_fat),
//                                 totalProtein: jsonData.nf_protein,
//                                 vetted: true,
//                                 uploadedBy: 'NutriData API'
//                             };

//                             // Create a new local DB entry for the item
//                             new Food(newFoodEntry).save()
//                                 .then(saved => res.send(saved));
//                         });
//                 }
//             })
//             .catch(next);
//         };
//     })

//     .post('/', jsonParser, (req, res, next) => {
//         new Food(req.body).save()
//             .then(saved => res.send(saved))
//             .catch(next);
//     });

module.exports = router;
