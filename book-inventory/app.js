var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';

var collectionPromise = MongoClient.connect(url)
  .then((db) => db.collection('books'));

app.use(bodyParser.json());

app.use((req, res, next) =>{
  console.log(`incoming request at ${new Date()}`);
  next();
});

app.get('/', (req, res, next) => {
    collectionPromise
      .then((collection) => collection.find({}).toArray())
      .then((items) => res.send(items))
      .catch(next);
});

app.post('/stock', (req, res) => {
  var book = req.body;
  console.log('isbn:', book.isbn);
  collectionPromise
    .then((collection) => {
      collection.updateOne({isbn: book.isbn}, {isbn: book.isbn,count: book.count}, {upsert: true});
    })
    .then(() => res.send(book))
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = app;
