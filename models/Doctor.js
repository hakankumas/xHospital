const connection = require("../database/db");

module.exports = class Doctor {
    // Doktor Bilgileri + Toplam hasta sayıları
    static sumNumberOfSickByDoctor() {
        return connection.execute(
            `SELECT 
                doctor.id as doctor_id,
                doctor.name as doctor_name,
                doctor.surname as doctor_surname,
                department.id as department_id,
                department.name as department_name,
                COUNT(sick.id) AS number
            FROM doctor
            LEFT JOIN sick ON sick.doctor_id = doctor.id
            LEFT JOIN department ON doctor.department_id = department.id
            GROUP BY doctor.id
            ORDER BY number DESC`
        );
    }

    // Doktorların cinsiyet dağılımı
    static genderByDoctor() {
        return connection.execute(
            `SELECT 
                gender.name AS gender_name, COUNT(doctor.id) as number
            FROM gender
            LEFT JOIN doctor ON gender.id = doctor.gender_id
            GROUP BY gender.id
            ORDER BY number DESC`
        );
    }

    // Toplam doktor sayısı
    static countAmount() {
        return connection.execute(`SELECT COUNT(*) as number FROM doctor`);
    }

    // Doktorların günlük hasta sayısı
    static dailyNumberOfSickByDoctor() {
        return connection.execute(
            `SELECT 
                doctor.id AS doctor_id,
                CONCAT(doctor.name, ' ', doctor.surname) AS doctor_fullname,
                DATE_FORMAT(sick.registration_date, '%Y-%m-%d') AS sick_registration_date,
                COUNT(sick.id) AS number
            FROM doctor
            LEFT JOIN sick ON sick.doctor_id = doctor.id
            INNER JOIN (
                SELECT DATE_FORMAT(sick.registration_date, '%Y-%m-%d') AS sick_registration_date
                FROM sick
                GROUP BY sick_registration_date
                ORDER BY sick_registration_date DESC
                LIMIT 14
            ) AS recent_dates ON DATE_FORMAT(sick.registration_date, '%Y-%m-%d') = recent_dates.sick_registration_date
            GROUP BY sick_registration_date, doctor.id
            ORDER BY sick_registration_date DESC, number DESC`
        );
    }
};
