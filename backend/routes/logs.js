const express = require('express');
const router = express.Router();
const { createLog } = require('../controllers/log')

router.post('/' ,createLog);

module.exports = router;
