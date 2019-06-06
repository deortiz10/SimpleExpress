const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });

function goodReadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/books/show/${id}.xml?key=`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
      resolve({ description: 'our description' });
    })
  }
  return { getBookById }
}
module.exports = goodReadsService();
