var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';

var collectionPromise = MongoClient.connect(url)
  .then((db) => db.collection('books'));

function stockUp(isbn, count) {
  return collectionPromise
    .then((collection) => {
      collection.updateOne({isbn: isbn}, {
        isbn: isbn,
        count: count
      },
      {upsert: true});
    });
}

function findAll() {
  return collectionPromise
    .then((collection) => collection.find({}).toArray());
}

function getCount(isbn) {
  return collectionPromise
    .then((collection) => collection.find({isbn: isbn}).limit(1).next()
    .then((item) => item ? item.count : null));
}

module.exports = {
  stockUp: stockUp,
  findAll: findAll,
  getCount: getCount
};
