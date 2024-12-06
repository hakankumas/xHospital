const connection = require("../database/db");

module.exports = class Department {
    // Departmanlar
    static getAll() {
        return connection.execute(
            `SELECT
                department.id as department_id,
                department.name as department_name
            FROM department`
        );
    }

    // Yeni Departman Ekle
    static create(department_name) {
        return connection.execute(
            `INSERT INTO department (department.name) VALUES (?)`,
            [department_name]
        );
    }

    // Departman Bilgisi + Departmanlardaki doktor sayısı
    static numberOfDoctorInDepartment() {
        return connection.execute(
            `SELECT
                department.id as department_id,
                department.name as department_name,
                COUNT(doctor.id) as number    
            FROM department
            LEFT JOIN doctor ON doctor.department_id = department.id
            GROUP BY department.id
            ORDER BY number DESC`
        );
    }

    // Toplam departman sayısı
    static countAmount() {
        // return connection.execute(`SELECT COUNT(*) as number FROM department`);
        return connection.execute(
            `SELECT COUNT( * ) as number
            FROM (
                SELECT
                    department.id AS department_id,
                    department.name AS department_name,
                    COUNT(doctor.id) AS amount
                FROM department
                LEFT JOIN doctor ON doctor.department_id = department.id
                GROUP BY department.id
                HAVING amount != 0
            ) as subquery`
        );
    }

    // Departmanların günlük hasta sayısı
    static dailyNumberOfSickByDepartment() {
        return connection.execute(
            `SELECT    
                department.id as department_id,
                department.name as department_name,
                DATE_FORMAT(sick.registration_date, '%Y-%m-%d') AS sick_registration_date,
                COUNT(sick.id) AS number
            FROM sick 
            LEFT JOIN doctor ON sick.doctor_id = doctor.id
            LEFT JOIN department ON doctor.department_id = department.id
            INNER JOIN (
                SELECT DATE_FORMAT(sick.registration_date, '%Y-%m-%d') AS sick_registration_date
                FROM sick
                GROUP BY sick_registration_date
                ORDER BY sick_registration_date DESC
                LIMIT 14
            ) AS recent_dates ON DATE_FORMAT(sick.registration_date, '%Y-%m-%d') = recent_dates.sick_registration_date
            GROUP BY sick_registration_date, department.id
            ORDER BY sick_registration_date DESC, number DESC
            `
        );
    }

    // Departmanların toplam hasta sayısı
    static numberOfSickByDepartment() {
        return connection.execute(
            `SELECT    
                department.id as department_id,
                department.name as department_name,
                COUNT(sick.id) AS number
            FROM department
            LEFT JOIN doctor ON doctor.department_id = department.id
            LEFT JOIN sick ON doctor.id = sick.doctor_id
            GROUP BY department.id
            ORDER BY number DESC`
        );
    }
};
