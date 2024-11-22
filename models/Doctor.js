const connection = require("../database/db");

module.exports = class Doctor {
    static getAll() {
        return connection.execute("SELECT * FROM doctor_department_info");
    }

    static countAmount() {
        return connection.execute("SELECT COUNT(*) as number FROM doctor");
    }
};
