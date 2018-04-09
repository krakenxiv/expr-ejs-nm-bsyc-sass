(function() {
  'use strict';

  // simple express server
  var express = require('express');
  var app = express();
  var router = express.Router();

  app.use(express.static('app'));
  
  app.get('/', function(req, res) {
    res.render('pages/index.ejs');
  });
  
  app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
  });
  
  app.get('/stuff', function(req, res) {
    res.render('pages/stuff.ejs');
  });

  app.listen(5000);
})();
