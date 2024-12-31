const Department = require("../models/Department");

exports.index = async (req, res) => {
    const number_of_sick_per_doctor =
        await Department.number_of_sick_per_doctor();
    res.render("./department/index", {
        title: "Departmanlar | Hastane KDS",
        subtitle: "Departmanlar | Hastane Karar Destek Sistemleri",

        number_of_sick_per_doctor: number_of_sick_per_doctor[0],
    });
};

exports.create = async (req, res) => {
    const department = await Department.create(req.body.department_name);
    if (department) res.redirect("/");
};

exports.delete = async (req, res) => {
    const department = await Department.delete(req.params.id);
    if (department) res.redirect("/");
};
