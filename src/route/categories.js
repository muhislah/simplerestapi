const express = require("express");
const router = express.Router();
const Controller = require("../controller/categories");
const controller = new Controller();

router
    .get("/", controller.getData)
    .post("/", controller.insertData)
    .put("/:id", controller.updateData)
    .delete("/:id", controller.deleteData);

module.exports = router;