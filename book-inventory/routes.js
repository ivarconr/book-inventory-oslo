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
          stockRepo.getCount(req.params.isbn)
            .then((count) => {
              if(count === null) {
                res.status(404).send("not found");
              } else {
                res.send({count : count});
              }
            })
            .catch(next);
      }
    }
}
