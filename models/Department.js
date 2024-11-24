const connection = require("../database/db");

module.exports = class Department {
    static getAll() {
        return connection.execute(
            `SELECT department.id, department.name, COUNT(doctor.id) as number 
            FROM department 
            LEFT JOIN department_doctor ON department.id = department_doctor.department_id 
            LEFT JOIN doctor ON doctor.id = department_doctor.doctor_id 
            GROUP BY department.id 
            ORDER BY number DESC`
        );
    }

    static countAmount() {
        return connection.execute(`SELECT COUNT(*) as number FROM department`);
    }

    static dailyNumberOfSickByDepartment() {
        return connection.execute(
            `SELECT
                DATE_FORMAT(doctor_sick.registration_date, '%Y-%m-%d') AS doctor_sick_registration_date,
                department.name AS department_name,
                COUNT(doctor_sick.id) AS number
            FROM sick
            LEFT JOIN doctor_sick ON sick.id = doctor_sick.sick_id
            LEFT JOIN doctor ON doctor.id = doctor_sick.doctor_id
            LEFT JOIN department_doctor ON department_doctor.doctor_id = doctor.id
            LEFT JOIN department ON department.id = department_doctor.department_id
            GROUP BY doctor_sick_registration_date, department.id
            ORDER BY doctor_sick_registration_date DESC, number DESC`
        );
    }
};
