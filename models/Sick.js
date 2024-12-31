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

    // Aylık hasta sayısı
    static monthlySickAmount() {
        return connection.execute(
            `SELECT
                DATE_FORMAT(sick.registration_date, '%Y-%m') AS sick_registration_date,
                COUNT(sick.id) as number
            FROM sick
            INNER JOIN (
                SELECT DATE_FORMAT(sick.registration_date, '%Y-%m') AS sick_registration_date
                FROM sick
                GROUP BY sick_registration_date
                ORDER BY sick_registration_date DESC
                LIMIT 14
            ) AS recent_dates ON DATE_FORMAT(sick.registration_date, '%Y-%m') = recent_dates.sick_registration_date
            GROUP BY sick_registration_date
            ORDER BY sick_registration_date ASC, number DESC`
        );
    }

    // Muayene Edilen Hastaların Cinsiyet Dağılımı (Muayene ID Bazlı)
    static genderBySickid() {
        return connection.execute(
            `SELECT gender.name AS gender_name, COUNT(sick.id) as number
            FROM gender
            LEFT JOIN sick ON gender.id = sick.gender_id
            GROUP BY gender.id
            ORDER BY number DESC`
        );
    }

    // Muayene Edilen Hastaların Cinsiyet Dağılımı (TC No Bazlı)
    static genderByTcno() {
        return connection.execute(
            `SELECT gender.name AS gender_name, COUNT(DISTINCT sick.tc_no) AS number
            FROM gender
            LEFT JOIN sick ON gender.id = sick.gender_id
            GROUP BY gender.id
            ORDER BY number DESC`
        );
    }
};
