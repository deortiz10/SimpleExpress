const express = require('express');
const adminRouter  = express.Router();
const sql = require('mssql');
//const {MongoClient} = require('mongodb');

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
function router(nav) {
  adminRouter.route('/').
    get((req, res) => {
      const url = 'mongodb://localhost:2701';
      const dbName = 'libraryApp';

      // (async function mongo() {
      //   let client;
      //   try {
      //     client = await MongoClient.connect(url);
      //     const db = client.db(dbName);
      //
      //     const response = await db.collection('books').insertMany(books);
      //     res.json(response);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // client.close();
      // }());
      res.send('inserting books');
    });
  return adminRouter;
}

module.exports = router;
