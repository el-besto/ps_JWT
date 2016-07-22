var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// enable CORS for this server
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.post('/register', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
