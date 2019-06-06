const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodReadsService');
function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav, bookService);
  bookRouter.use(middleware);
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
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id').get(getById);
  return bookRouter;
}

module.exports = router;
