var express = require('express');
var path = require('path');


var app = express();
var dir = path.join(__dirname, 'images');


console.log(dir)
app.use('/img', express.static(dir));




app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});




