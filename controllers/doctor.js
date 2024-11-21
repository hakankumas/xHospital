const Doctor = require("../models/Doctor");

exports.index = async (req, res) => {
    res.render("./doctor/index");
};

exports.getAll = async (req, res) => {
    const doctors = await Doctor.getAll();
    if (!doctors) return res.status(404).end();
    res.status(200).json(doctors[0]);
};
