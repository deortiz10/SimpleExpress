const express = require('express');
const authRouter = express.Router();
const sql = require('mssql');

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      (async function query() {
        try {
          const request = new sql.Request();
          const result = await request.query(`INSERT INTO users (user_name, pass) VALUES('${username}','${password}')`);
          console.log(result);
          req.login(username, password, () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          console.log(err);
        }
      }());

    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;

}

module.exports = router;
