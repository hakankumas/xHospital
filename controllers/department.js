const Department = require("../models/Department");

exports.index = async (req, res) => {
    const number_of_sick_per_doctor =
        await Department.number_of_sick_per_doctor();
    const list_department = await Department.getAll();

    res.render("./department/index", {
        title: "Departmanlar | Hastane KDS",
        subtitle: "Departmanlar | Hastane Karar Destek Sistemleri",

        number_of_sick_per_doctor: number_of_sick_per_doctor[0],
        list_department: list_department[0],
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

exports.metric = async (req, res) => {
    const department = await Department.metric(req.body);
    if (department) res.redirect("/department");
};
