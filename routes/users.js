var express = require('express');
var router = express.Router();
const authController = require('./../controllers/auth');
const passport = require('../passport/passport');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false}), authController.getUser);
router.put('/coinsTransfered/:username', passport.authenticate('jwt', { session: false}), authController.updateCoins);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
