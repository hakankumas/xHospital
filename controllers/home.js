const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const Sick = require("../models/Sick");

exports.index = async (req, res) => {
    const count_department = await Department.countAmount();
    const count_doctor = await Doctor.countAmount();
    const count_sick = await Sick.countAmount();

    const number_of_sick_per_doctor =
        await Department.number_of_sick_per_doctor();

    const list_department = await Department.getAll();
    const list_doctor = await Doctor.getAll();

    res.render("index", {
        title: "Ana Sayfa | Hastane KDS",
        subtitle: "Ana Sayfa | Hastane Karar Destek Sistemleri",

        count_department: count_department[0],
        count_doctor: count_doctor[0],
        count_sick: count_sick[0],

        number_of_sick_per_doctor: number_of_sick_per_doctor[0],

        list_department: list_department[0],
        list_doctor: list_doctor[0],
    });
};

exports.login = async (req, res) => {
    res.render("login", {
        title: "Admin Giriş | Hastane KDS",
    });
};
