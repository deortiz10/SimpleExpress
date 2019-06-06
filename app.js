const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
//const {MongoClient} = require('mongodb');
const sql = require('mssql');

const app = express();
const nav = [{ link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(morgan('tiny'));
const config = require('./src/config')


sql.connect(config).catch(err => debug(err));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/books', title: 'books' },
        { link: '/authors', title: 'authors' }],
      title: 'Library'
    }
  );
  console.log('Respondig req');
});

app.listen(3000, () => {
  // debug using debug = app node app.js
  debug(`Listening on port ${chalk.blue('3000')}`);
});
