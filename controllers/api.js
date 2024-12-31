const Admin = require("../models/Admin");
const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Sick = require("../models/Sick");

exports.login = async (req, res) => {
    const admin = await Admin.get(req.body);
    if (admin[0][0]) res.redirect("/");
    else res.redirect("/login");
};

exports.dailySickAmount = async (req, res) => {
    const dailySickAmount = await Sick.dailySickAmount();

    res.status(200).json({
        dailySickAmount: dailySickAmount[0],
    });
};

exports.monthlyNumberOfSickByDepartment = async (req, res) => {
    const monthlyNumberOfSickByDepartment =
        await Department.monthlyNumberOfSickByDepartment();

    res.status(200).json({
        monthlyNumberOfSickByDepartment: monthlyNumberOfSickByDepartment[0],
    });
};

exports.dailyNumberOfSickByDoctor = async (req, res) => {
    const dailyNumberOfSickByDoctor = await Doctor.dailyNumberOfSickByDoctor();

    res.status(200).json({
        dailyNumberOfSickByDoctor: dailyNumberOfSickByDoctor[0],
    });
};

exports.genderBySickid = async (req, res) => {
    const genderBySickid = await Sick.genderBySickid();

    res.status(200).json({
        genderBySickid: genderBySickid[0],
    });
};

exports.genderByTcno = async (req, res) => {
    const genderByTcno = await Sick.genderByTcno();

    res.status(200).json({
        genderByTcno: genderByTcno[0],
    });
};

exports.genderByDoctor = async (req, res) => {
    const genderByDoctor = await Doctor.genderByDoctor();

    res.status(200).json({
        genderByDoctor: genderByDoctor[0],
    });
};

exports.numberOfSickByDepartment = async (req, res) => {
    const numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();

    res.status(200).json({
        numberOfSickByDepartment: numberOfSickByDepartment[0],
    });
};

exports.numberOfExaminationPerDoctor = async (req, res) => {
    const numberOfExaminationPerDoctor =
        await Doctor.numberOfExaminationPerDoctor();

    res.status(200).json({
        numberOfExaminationPerDoctor: numberOfExaminationPerDoctor[0],
    });
};

exports.numberOfDoctorInDepartment = async (req, res) => {
    const list_numberOfDoctorInDepartment =
        await Department.numberOfDoctorInDepartment();

    res.status(200).json({
        numberOfDoctorInDepartment: list_numberOfDoctorInDepartment[0],
    });
};
