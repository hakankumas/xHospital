const connection = require("../database/db");

module.exports = class Sick {
    // Hasta bilgileri
    static getAll() {
        return connection.execute(
            `SELECT 
                sick.id as sick_id,
                sick.tc_no as sick_tc_no,
                sick.name as sick_name,
                sick.surname as sick_surname,
                sick.registration_date as sick_registration_date,

                doctor.id as doctor_id,
                doctor.name as doctor_name,
                doctor.surname as doctor_surname,
                
                department.id as department_id,
                department.name as department_name
                
            FROM sick 
            LEFT JOIN doctor ON sick.doctor_id = doctor.id
            LEFT JOIN department ON doctor.department_id = department.id`
        );
    }

    // Toplam hasta (muayene) sayısı
    static countAmount() {
        return connection.execute(`SELECT COUNT(*) as number FROM sick`);
    }

    // Günlük hasta sayısı
    static dailySickAmount() {
        return connection.execute(
            `SELECT
                DATE_FORMAT(sick.registration_date, '%Y-%m-%d') AS sick_registration_date,
                COUNT(sick.id) as number
            FROM sick
            GROUP BY sick_registration_date
            ORDER BY sick_registration_date DESC, number DESC
            LIMIT 14`
        );
    }
};
