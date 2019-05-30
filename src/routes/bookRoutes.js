const express = require('express');
const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'War and peace',
    gender: 'historical novel',
    author: 'Lev Tolstoy',
    read: false,
  },
  {
    title: '1984',
    gender: 'Sci-Fi',
    author: 'George Orwell',
    read: false,
  },
  {
    title: 'All quiet on the Western Front',
    gender: 'Historical novel',
    author: 'Maria',
    read: false,
  }
  ];
  bookRouter.route('/').get((req, res) => {
    res.render('bookListView', {
      nav,
      title: 'Library',
      books
    });
  });
  
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView', {
      nav,
      title: 'Library',
      book: books[id]
    });
  });
  return bookRouter;
}

module.exports = router;
