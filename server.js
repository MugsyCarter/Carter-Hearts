var express = require('express');
var bodyParser = require('body-parser');



var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var pubDir = __dirname + '/public/';
app.use(express.static(pubDir));

// app.use(express.static('./public'));

  // Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
});
