const Sick = require("../models/Sick");

exports.index = async (req, res) => {
    const list_sick = await Sick.getAll();
    res.render("./sick/index", {
        title: "Hastalar | Hastane KDS",
        subtitle: "Hastalar | Hastane Karar Destek Sistemleri",

        list_sick: list_sick[0],
    });
};
