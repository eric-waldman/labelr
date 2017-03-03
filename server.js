const express = require('express');
const multer  = require('multer');     
const fs = require('fs');
const bodyParser = require('body-parser');           
const http = require('http');
const path = require('path');
const crypto = require('crypto');

// Initialize the web server and its routing
let app = express();
let server = http.createServer(app);

let storage = multer.diskStorage({
  destination: '.data/data/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

let upload = multer({ storage: storage });

// Datastore
var choices = [];
var filenames = [];
var dataset = [];

// listen for requests
server.listen(process.env.PORT);

// Configure some middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('.data'));

// Routes
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/drop.html');
});

app.get('/classify', function(request, response) {
    response.sendFile(__dirname + '/views/classify.html');
});

app.post('/classify', function(request, response) {
  var id = request.body.id,
      choice = request.body.choice;
  
  choices[id] = choice;
  
  var ids = [];
  
  for (var i = 0; i < dataset.length; i++) {
    if (typeof choices[i] === 'undefined')
      ids.push(i);
  }
  
  if (ids.length === 0) {
      response.redirect('/results');
  }
  
  response.redirect('back');
});

app.post('/new_data', upload.array('file'), function(request, response) {
  for (var i = 0; i < request.files.length; i++) {
    var file = request.files[i];
    
    if (filenames.indexOf(file.originalname) < 0) {
      dataset.push(file);
      filenames.push(file.originalname);
    }
  }
  
  response.redirect('/classify');
});

app.get('/results', function(request, response) {
  var results = {};
  
  for (var i = 0; i < dataset.length; i++) {
    var name = filenames[i],
        choice = choices[i];
    
    results[name] = choice;
  }
  
  response.send(results);
});

app.get('/question', function(request, response) {
  var ids = [],
      id;
  
  for (var i = 0; i < dataset.length; i++) {
    if (typeof choices[i] === 'undefined')
      ids.push(i);
  }
  
  if (ids.length === 0) {
      response.redirect('/results');
  }
  
  id = ids.sort( function() { return 0.5 - Math.random() } )[0];
  
  response.send({
    id: id,
    image: dataset[id].filename
  });
});