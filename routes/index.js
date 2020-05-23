var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IMD Coins', action: 'Log out', path: 'logout'});
});

/* GET sign up. */
router.get('/register', function(req, res, next) {
  res.render('signup', {path: 'login', action: 'Sign in'});
});

/* GET sign in. */
router.get('/login', function(req, res, next) {
  res.render('signin', {path: 'register', action: 'Sign up'});
});

module.exports = router;
