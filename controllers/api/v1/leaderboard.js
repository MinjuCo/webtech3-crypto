const User = require('./../../../models/User');

const getAll = (req, res) => {
  User.find({}, {username:1, coins:1}, (err, docs) => {
    if(!err){
      res.json({
        "status": "success",
        "data": {
          "users": docs
        }
      });
    }
  });
}

module.exports.getAll = getAll;