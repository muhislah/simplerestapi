const express = require("express");
const router = express.Router();
const newController = require("../controller/products2");

router
    .get("/:id?", newController.getData)
    .post("/", newController.insertData)
    .put("/:id", newController.updateData)
    .delete("/:id", newController.deleteData);

module.exports = router;