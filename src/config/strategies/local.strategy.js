const passport = require('passport');
const { Strategy } = require('passport-local');
const sql = require('mssql');

function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      (async function query() {
        try {
          const request = new sql.Request();
          const user = await request.query(`SELECT * FROM users WHERE user_name='${username}';`);
          if (user.recordset[0].pass === password) {
            done(null, user);
          } else {
            done(null, false);
          }
          console.log(user.recordset[0]);
        } catch (err) {
          console.log(err);
        }
      }());
    }
  ));
}

module.exports = localStrategy;
