const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");

router.get("/", doctorController.index);
// router.get("/getall", doctorController.getAll);

module.exports = router;
