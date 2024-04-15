const express = require('express');
const router = express.Router();
const user = require("./users")
const log = require("./logs")

router.use("/users", user);

router.use("/logs", log);

module.exports = router;
