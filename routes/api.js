const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.post("/login", apiController.login);
router.get("/dailySickAmount", apiController.dailySickAmount);
router.get(
    "/dailyNumberOfSickByDepartment",
    apiController.dailyNumberOfSickByDepartment
);
router.get(
    "/dailyNumberOfSickByDoctor",
    apiController.dailyNumberOfSickByDoctor
);
router.get("/genderBySickid", apiController.genderBySickid);
router.get("/genderByTcno", apiController.genderByTcno);
router.get("/genderByDoctor", apiController.genderByDoctor);
router.get("/numberOfSickByDepartment", apiController.numberOfSickByDepartment);
router.get(
    "/numberOfExaminationPerDoctor",
    apiController.numberOfExaminationPerDoctor
);
router.get(
    "/numberOfDoctorInDepartment",
    apiController.numberOfDoctorInDepartment
);

module.exports = router;
