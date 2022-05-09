const express = require("express");
const router = express.Router();
const controller = require("../controller/users");

router
    .post("/register", controller.addUser);

module.exports = router;