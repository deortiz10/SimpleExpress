const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));

app.get("/", (req,res) => {
  res.send('Hello from node');
  console.log('Respondig req');
});

app.listen(3000, () => {
  debug(`Listening on port ${chalk.blue('3000')}`);
})
