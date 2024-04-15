const express = require('express');
const router = express.Router();
const { createUser, checkUserExists, createUserAddress } = require('../controllers/user')

router.post('/', createUser);
router.post('/address', createUserAddress);
router.get('/check', checkUserExists);

module.exports = router;
