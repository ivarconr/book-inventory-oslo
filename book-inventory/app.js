var express = require('express');
var bodyParser = require('body-parser');
var app = express();

module.exports = function(stockRepo) {
  app.use(bodyParser.json());

  app.use((req, res, next) =>{
    console.log(`incoming request at ${new Date()}`);
    next();
  });

  app.get('/stock', (req, res, next) => {
      stockRepo.findAll()
        .then((items) => res.send(items))
        .catch(next);
  });

  app.post('/stock', (req, res) => {
    var book = req.body;
    console.log('isbn:', book.isbn);

    stockRepo.stockUp(book.isbn, book.count)
      .then(() => res.send(book));
  });

  app.get('/stock/:isbn', (req, res, next) => {
      stockRepo.getCount(req.params.isbn)
        .then((count) => {
          if(count === null) {
            res.status(404).send("not found");
          } else {
            res.send({count : count});
          }
        })
        .catch(next);
  });

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
  return app;
};
