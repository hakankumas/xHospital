const Department = require("../models/Department");

exports.index = async (req, res) => {
    const list_numberOfDoctorInDepartment =
        await Department.numberOfDoctorInDepartment();
    const list_numberOfSickByDepartment =
        await Department.numberOfSickByDepartment();
    res.render("./department/index", {
        title: "Departmanlar | Hastane KDS",
        subtitle: "Departmanlar | Hastane Karar Destek Sistemleri",

        list_numberOfDoctorInDepartment: list_numberOfDoctorInDepartment[0],
        list_numberOfSickByDepartment: list_numberOfSickByDepartment[0],
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
