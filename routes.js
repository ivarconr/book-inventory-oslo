module.exports = function(stockRepo) {
  return {
    findAll: (req, res, next) => {
      stockRepo.findAll()
        .then((items) => res.send(items))
        .catch(next);
    },

    stockUp: (req, res) => {
      var book = req.body;
      console.log('isbn:', book.isbn);

      stockRepo.stockUp(book.isbn, book.count)
        .then(() => res.send(book));
    },

    getCount: (req, res, next) => {
      var traceId = req.headers['x-request-id'] || '123';
      console.log(`Got request from traceId=${traceId}`);

      stockRepo.getCount(req.params.isbn)
        .then((count) => {
          if (count === null) {
            res.status(404).send("not found");
          } else {
            res.format({
              'text/plain': function() {
                res.send(count);
              },

              'text/html': function() {
                res.send(`<p>${count}</p>`);
              },

              'application/json': function() {
                res.send({
                  count: count
                });
              },

              'default': function() {
                // log the request and respond with 406
                res.status(406).send('Not Acceptable');
              }
            });

          }
        })
        .catch(next);
    }
  };
};
