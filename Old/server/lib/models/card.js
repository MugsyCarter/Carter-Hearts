const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true};

const cardSchema = new Schema({
    code: requiredString,
    suit: requiredString,
    image: requiredString,
    number: {type: Number, default: 0},
    points: {type: Number, default: 0}
});

module.exports = mongoose.model('Card', cardSchema);