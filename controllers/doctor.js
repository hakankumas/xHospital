const Doctor = require("../models/Doctor");

exports.index = async (req, res) => {
    const list_sumNumberOfSickByDoctor = await Doctor.sumNumberOfSickByDoctor();
    res.render("./doctor/index", {
        title: "Doktorlar | Hastane KDS",
        subtitle: "Doktorlar | Hastane Karar Destek Sistemleri",

        list_sumNumberOfSickByDoctor: list_sumNumberOfSickByDoctor[0],
    });
};

exports.create = async (req, res) => {
    const doctor = await Doctor.create(req.body);
    if (doctor) res.redirect("/");
};

exports.delete = async (req, res) => {
    const doctor = await Doctor.delete(req.params.id);
    if (doctor) res.redirect("/");
};
