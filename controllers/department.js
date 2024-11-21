const Department = require("../models/Department");

exports.index = async (req, res) => {
    res.render("./department/index");
};

exports.getAll = async (req, res) => {
    const departments = await Department.getAll();
    if (!departments) return res.status(404).end();
    res.status(200).json(departments[0]);
};
