const express = require("express");
const router = express.Router();
const sickController = require("../controllers/sick");

router.get("/", sickController.index);
// router.get("/getall", sickController.getAll);

module.exports = router;
