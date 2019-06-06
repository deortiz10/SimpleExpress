const express = require('express');
const authRouter = express.Router();
const sql = require('mssql');
const passport = require('passport');

function router(nav) {
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

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'SignIn'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
