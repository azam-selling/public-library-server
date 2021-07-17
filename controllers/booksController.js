function booksController(bookModel) {
  function get(req, res) {
    //   const dummyResponse = { title: "REACT Book", Author: "Cory House" };
    //   res.json(dummyResponse);
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    bookModel.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }

  function getById(req, res) {
    return res.json(req.book);
  }

  function post(req, res) {
    const book = new bookModel(req.body);
    book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.status(201).json(book);
    });
  }

  function put(req, res) {
    const { book } = req;
    (book.title = req.body.title),
      (book.genre = req.body.genre),
      (book.author = req.body.author),
      (book.availableQty = req.body.availableQty),
      (book.read = req.body.read);
    book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  function patch(req, res) {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  function deleteBook(req, res) {
    const { book } = req;
    book.delete((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { get, post, put, patch, deleteBook, getById };
}

module.exports = booksController;
