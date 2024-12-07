const connection = require("../database/db");

module.exports = class Doctor {
    // Doktorlar
    static getAll() {
        return connection.execute(
            `SELECT 
                doctor.id as doctor_id,
                doctor.name as doctor_name,
                doctor.surname as doctor_surname,
                department.id as department_id,
                department.name as department_name
            FROM doctor
            INNER JOIN department ON doctor.department_id = department.id`
        );
    }

    // Doktor Ekle
    static create(condition) {
        const { doctor_name, doctor_surname, gender_id, department_id } =
            condition;
        return connection.execute(
            `INSERT INTO doctor (doctor.name, doctor.surname, doctor.gender_id, doctor.department_id) VALUES (?, ?, ?, ?)`,
            [doctor_name, doctor_surname, gender_id, department_id]
        );
    }

    // Doktor Bilgileri + Toplam hasta sayıları
    static sumNumberOfSickByDoctor() {
        return connection.execute(
            `SELECT 
                doctor.id as doctor_id,
                doctor.name as doctor_name,
                doctor.surname as doctor_surname,
                gender.name as gender_name,
                department.id as department_id,
                department.name as department_name,
                COUNT(sick.id) AS number
            FROM doctor
            LEFT JOIN sick ON sick.doctor_id = doctor.id
            LEFT JOIN department ON doctor.department_id = department.id
            LEFT JOIN gender ON doctor.gender_id = gender.id
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

    // Doktor Başına Düşen Muayene Sayısı
    static numberOfExaminationPerDoctor() {
        return connection.execute(
            `SELECT
                department.id AS department_id,
                department.name AS department_name,
                COUNT(DISTINCT doctor.id) AS doctor_number,
                COUNT(sick.id) AS sick_number,
                CASE 
                    WHEN COUNT(DISTINCT doctor.id) > 0 THEN 
                        ROUND(COUNT(sick.id) * 1.0 / COUNT(DISTINCT doctor.id), 1)
                    ELSE 0
                END AS number_rate
            FROM
                department
            INNER JOIN doctor ON doctor.department_id = department.id
            INNER JOIN sick ON sick.doctor_id = doctor.id
            GROUP BY
                department.id, department.name
            ORDER BY
                number_rate DESC`
        );
    }
};
