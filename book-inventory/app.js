var express = require('express');
var bodyParser = require('body-parser');
var app = express();

function logRequests (req, res) {
  console.log(`incoming request at ${new Date()}`);
  next();
}

function clientErrorHandler(req, res, next) {
  res.status(404).send('Sorry cant find that!');
}

function serverErrorHandler(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

module.exports = function(stockRepo) {
  var routes = require('./routes')(stockRepo);
  app.use(bodyParser.json());

  app.use(logRequests);

  app.get('/stock', routes.findAll);
  app.post('/stock', routes.stockUp);
  app.get('/stock/:isbn', routes.getCount);

  app.use(serverErrorHandler);
  app.use(clientErrorHandler);

  return app;
};
