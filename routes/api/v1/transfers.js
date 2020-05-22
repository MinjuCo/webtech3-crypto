const express = require('express');
const router = express.Router();
const transfersController = require('../../../controllers/api/v1/transfers');

router.post("/", transfersController.create);
router.get("/", transfersController.getAll);

module.exports = router;