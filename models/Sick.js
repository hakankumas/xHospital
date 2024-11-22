const connection = require("../database/db");

module.exports = class Sick {
    static getAll() {
        return connection.execute("SELECT * FROM sick_doctor_department_info");
    }

    static countAmount() {
        return connection.execute("SELECT COUNT(*) as number FROM doctor_sick");
    }
};
