const connection = require("../database/db");

module.exports = class Views {
    static get_department_doctor_info() {
        return connection.execute("SELECT * FROM department_doctor_info");
    }

    static get_doctor_sick_info() {
        return connection.execute("SELECT * FROM doctor_sick_info");
    }
};
