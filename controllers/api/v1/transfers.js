const Transfer = require('../../../models/Transfers');

const getAll = (req, res) => {
  let user = "Mina";
  Transfer.find({
    $or: [ { sender: user }, { receiver: user } ]
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

const create = (req, res) => {
  let transfer = new Transfer();
  transfer.sender = req.body.transfer.sender;
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