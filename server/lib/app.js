
const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');

// const auths = require('./routes/auths');
// const users = require('./routes/users');
// const foods = require('./routes/foods');
// const userFoods = require('./routes/userFoods');
const getCards = require('./routes/getCards');

app.use(morgan('dev'));

app.use((req, res, next) => {
    // set cors headers
    const url = '*';
    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('./public'));

// app.use('/api/auths', auths);
// app.use('/api/users', users);
// app.use('/api/foods', foods);
// app.use('/api/userFoods', userFoods);

app.use('/api/getCards', getCards);

app.use(errorHandler);

module.exports = app;

