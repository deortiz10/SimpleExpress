const sql = require('mssql');
const debug = require('debug')('app:bookController');

function bookController(nav, bookService) {
  function getIndex(req, res) {
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
  }

  function getById(req, res, next) {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('id', sql.Int, id)
        .query('select * from books where id = @id');
      [req.book] = recordset;
      console.log(req.book);
      next();
      req.book.details = await bookService.getBookById(req.book.bookId);
      res.render('bookView', {
        nav,
        title: 'Library',
        book: req.book
      });
    }());
  }
  function middleware(req, res, next) {
    // if (req.user) {
       next();
    // } else {
    //   res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  }
}

module.exports = bookController;
