var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IMD Coins', action: 'Log out', path: 'logout'});
});

/* GET sign up. */
router.get('/register', function(req, res, next) {
  res.render('signup', {title: 'Sign up', path: 'login', action: 'Sign in'});
});

/* GET sign in. */
router.get('/login', function(req, res, next) {
  res.render('signin', {title: 'Sign in', path: 'register', action: 'Sign up'});
});

router.get('/logout', function(req, res, next) {
  res.render('logout', {title: 'Log out'});
});

module.exports = router;
