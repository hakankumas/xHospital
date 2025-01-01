const connection = require("../database/db");

module.exports = class Department {
    // Departmanlar
    static getAll() {
        return connection.execute(`
            SELECT
                department.id as department_id,
                department.name as department_name,
                department.metric as department_metric
            FROM department
            ORDER BY department.name ASC
        `);
    }

    // Departman Ekle
    static create(department_name) {
        return connection.execute(`INSERT INTO department (name) VALUES (?)`, [
            department_name,
        ]);
    }

    // Departman Sil
    static delete(department_id) {
        return connection.execute(`DELETE FROM department WHERE id = ?`, [
            department_id,
        ]);
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

    // Departmanların aylık hasta sayısı
    static monthlyNumberOfSickByDepartment() {
        return connection.execute(`
            SELECT    
                department.id as department_id,
                department.name as department_name,
                DATE_FORMAT(sick.registration_date, '%Y-%m') AS sick_registration_date,
                COUNT(sick.id) AS number
            FROM sick 
            LEFT JOIN doctor ON sick.doctor_id = doctor.id
            LEFT JOIN department ON doctor.department_id = department.id
            INNER JOIN (
				SELECT DATE_FORMAT(sick.registration_date, '%Y-%m') AS sick_registration_date
                FROM sick
                GROUP BY sick_registration_date
                ORDER BY sick_registration_date DESC
            ) AS recent_dates ON DATE_FORMAT(sick.registration_date, '%Y-%m') = recent_dates.sick_registration_date
            GROUP BY sick_registration_date, department.id
            ORDER BY sick_registration_date ASC, number DESC
        `);
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

    // Departmandaki Doktor Sayısı + Muayene Edilen Hasta Sayısı ve Yoğunluk
    static number_of_sick_per_doctor() {
        return connection.execute(`
            SELECT
                department_id,
                department_name,
                number_doctor,
                number_sick,
                ROUND(number_sick / number_doctor, 1) AS numbersick_perdoctor,
                department_metric
            FROM (
                SELECT
                    department.id AS department_id,
                    department.name AS department_name,
                    COUNT(DISTINCT doctor.id) AS number_doctor,
                    COUNT(DISTINCT sick.id) AS number_sick,
                    department.metric AS department_metric
                FROM department
                LEFT JOIN doctor ON doctor.department_id = department.id
                LEFT JOIN sick ON doctor.id = sick.doctor_id
                GROUP BY department.id
            ) AS subquery
            WHERE number_doctor > 0
            ORDER BY numbersick_perdoctor DESC
        `);
    }

    // Departman Yoğunluk Metriğini Güncelle
    static metric(condition) {
        const { department_id, metric } = condition;
        return connection.execute(
            `UPDATE department SET metric = ? WHERE id = ?`,
            [metric, department_id]
        );
    }
};
