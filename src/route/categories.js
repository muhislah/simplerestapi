const express = require("express");
const router = express.Router();
const controller = require("../controller/categories");

router
    .get("/", controller.getData)
    .post("/", controller.insertData)
    .put("/:id", controller.updateData)
    .delete("/:id", controller.deleteData);

module.exports = router;