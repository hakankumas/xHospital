const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department");

router.get("/", departmentController.index);
router.get("/getall", departmentController.getAll);

module.exports = router;
