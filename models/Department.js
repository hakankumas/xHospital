const connection = require("../database/db");

module.exports = class Department {
    static getAll() {
        return connection.execute(
            " SELECT department.id, department.name, COUNT(*) as number FROM department LEFT JOIN department_doctor ON department.id = department_doctor.department_id LEFT JOIN doctor ON doctor.id = department_doctor.doctor_id GROUP BY department.id ORDER BY number DESC"
        );
    }

    static countAmount() {
        return connection.execute("SELECT COUNT(*) as number FROM department");
    }
};
