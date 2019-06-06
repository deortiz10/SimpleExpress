const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');
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
    (async function query() {
      const request = new sql.Request();
      const result = await request.query('select * from books');

      debug(result);
      res.render('bookListView', {
        nav,
        title: 'Library',
        books: result.recordset
      });
    }());
  });

  bookRouter.route('/:id').all((req, res, next) =>{
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('id', sql.Int, id)
        .query('select * from books where id = @id');
      [req.book] = recordset;
      next();
    }());
  }).get((req, res) => {
    res.render('bookView', {
      nav,
      title: 'Library',
      book: req.book
    });
  });
  return bookRouter;
}

module.exports = router;
