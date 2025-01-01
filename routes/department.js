const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department");

router.get("/", departmentController.index);
router.post("/create", departmentController.create);
router.get("/delete/:id", departmentController.delete);
router.post("/metric-update", departmentController.metric);

module.exports = router;
