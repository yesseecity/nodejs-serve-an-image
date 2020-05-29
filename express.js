var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');

var img_dir = path.join(__dirname, 'images');

var mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
};

app.get('/img/*', function (req, res) {
  var imgPath = path.join(img_dir, req.path.replace(/\/img\//, ''));
  var type = mime[path.extname(imgPath).slice(1)] ;

  console.log("request img ===============");
  console.log(req.path);
  console.log(imgPath);
  console.log("===========================");

  if (type === undefined) {
    res.set('Content-Type', 'text/plain');
    res.status(400).end('Unsupported type' + path.extname(imgPath).slice(1));
    return 
  }

  var s = fs.createReadStream(imgPath);
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
      return
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('File Not found');
      return
  });
})

app.get('/', function (req, res) {
  console.log('Hello')
  res.set('Content-Type', 'text/plain');
  res.send('Hello World!');
})

app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});