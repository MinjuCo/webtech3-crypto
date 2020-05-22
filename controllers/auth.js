const User = require('./../models/User');

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
    res.json({
      "status": "success"
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
    res.json({
      "status": "success",
      "data": {
        "user": result
      }
    });
  }).catch(error => {
    res.json({
      "status": "error",
      "message": error
    });

  });
}

module.exports.signup = signup;
module.exports.login = login;

