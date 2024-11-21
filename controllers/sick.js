const Sick = require("../models/Sick");

exports.index = async (req, res) => {
    res.render("./sick/index");
};

exports.getAll = async (req, res) => {
    const sicks = await Sick.getAll();
    if (!sicks) return res.status(404).end();
    res.status(200).json(sicks[0]);
};
