const connection = require("../database/db");

module.exports = class Doctor {
    static getAll() {
        return connection.execute(`SELECT * FROM doctor_department_info`);
    }

    static countAmount() {
        return connection.execute(`SELECT COUNT(*) as number FROM doctor`);
    }

    static dailyNumberOfSicksOfDoctor() {
        return connection.execute(
            `SELECT
                DATE_FORMAT(doctor_sick.registration_date, '%Y-%m-%d') AS doctor_sick_registration_date,
                doctor.name as doctor_name,
                doctor.surname as doctor_surname,
                COUNT(doctor_sick.id) AS number
            FROM sick, doctor_sick, doctor
            WHERE 
                sick.id = doctor_sick.sick_id AND 
                doctor.id = doctor_sick.doctor_id
            GROUP BY doctor_sick_registration_date, doctor.id
            ORDER BY doctor_sick_registration_date DESC, number DESC`
        );
    }
};
