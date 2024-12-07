const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor");

router.get("/", doctorController.index);
router.post("/create", doctorController.create);
router.get("/delete/:id", doctorController.delete);

module.exports = router;
