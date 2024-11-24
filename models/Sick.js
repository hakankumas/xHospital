const connection = require("../database/db");

module.exports = class Sick {
    static getAll() {
        return connection.execute(`SELECT * FROM sick_doctor_department_info`);
    }

    static countAmount() {
        return connection.execute(`SELECT COUNT(*) as number FROM doctor_sick`);
    }

    static dailySickAmount() {
        return connection.execute(
            `SELECT 
                DATE_FORMAT(doctor_sick.registration_date, '%Y-%m-%d') AS doctor_sick_registration_date, 
                COUNT(doctor_sick.id) as number 
            FROM doctor_sick 
            GROUP BY doctor_sick_registration_date 
            ORDER BY number DESC 
            LIMIT 31`
        );
    }
};
