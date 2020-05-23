const Transfer = require('../../../models/Transfers');

const getAll = (req, res) => {
  Transfer.find({
    $or: [ { sender: req.user.username }, { receiver: req.user.username } ]
  }, (err, docs) => {
    if(!err){
      res.json({
        "status": "success",
        "data": {
          "transfers": docs
        }
      });
    }
  });
}

const getOne = (req, res) => {
  let user = req.user.username;
  let transferId = req.params.id;
  Transfer.findOne({
    $and: [
      {$or: [ { sender: user }, { receiver: user } ]},
      {_id: transferId}
    ]
  }, (err, doc) => {
    if(!err){
      res.json({
        "status": "success",
        "data": {
          "transfer": doc
        }
      });
    }
  });
}

const create = (req, res) => {
  let transfer = new Transfer();
  transfer.sender = req.user.username;
  transfer.receiver = req.body.transfer.receiver;
  transfer.reason = req.body.transfer.reason;
  transfer.message = req.body.transfer.message;
  transfer.coins = req.body.transfer.coins;
  transfer.date = req.body.transfer.date;
  transfer.save((err, doc) => {
    if(err){
      res.json({
        "status": "error",
        "message": "Could not transfer the coin"
      });
    }

    if(!err){
      res.json({
        "status": "success",
        "data": {
          "transfer": doc
        }
      });
    }
  });
  
}

module.exports.create = create;
module.exports.getAll = getAll;
module.exports.getOne = getOne;