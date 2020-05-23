const User = require('./../models/User');
const jwt = require("jsonwebtoken");
const config = require('config');

const getUser = (req, res) => {
    let name = req.user.firstname + " " + req.user.lastname;
    return res.json({
      "status": "success",
      "user": {
        "name": name,
        "username": req.user.username,
        "coins": req.user.coins,
        "id": req.user._id
      }
    });

}

const updateCoins = (req, res) => {
  let username = req.params.username;
  let newBalance = req.body.coins;

  User.findOneAndUpdate({
      username: username
  }, {
    $inc: { coins: newBalance}
  }, {new: true}).then(doc => {
      res.json({
        "status": "success",
      });
  }).catch(err => {
      res.json(err);
  });
}

const signup = async (req, res, next) => {
  let email = req.body.username; //UI of postman
  let password = req.body.password;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let coins = 100;

  const user = new User({username: email});
  user.firstname = firstname;
  user.lastname = lastname;
  user.coins = coins;
  await user.setPassword(password);
  await user.save().then(result => {
    let name = result.firstname + ' ' + result.lastname;
    
    let token = jwt.sign({
      uid: result._id,
      name: name,
      coins: result.coins
    }, config.get('jwt.secret'))

    res.json({
      "status": "success",
      "data": {
        "token": token
      }
    });
  }).catch(error => {
    res.json({
      "status": "error",
      "message": error
    });
  });
}

const login = async (req, res, next) => {
  const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
    if(!result.user){
      return res.json({
        "status": "failed",
        "message": "Login failed"
      });
    }
    
    let name = result.user.firstname + " " + result.user.lastname;
    let token = jwt.sign({
      uid: result.user._id,
      name: name,
      coins: result.user.coins
    }, config.get('jwt.secret'));

    return res.json({
      "status": "success",
      "data": {
        "token": token
      }
    });
  }).catch(error => {
    res.json({
      "status": "error",
      "message": error
    });

  });
}

module.exports.getUser = getUser;
module.exports.updateCoins = updateCoins;
module.exports.signup = signup;
module.exports.login = login;

