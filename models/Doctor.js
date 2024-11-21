const connection = require("../database/db");

module.exports = class Doctor {
    static getAll() {
        return connection.execute("SELECT * FROM doctor");
    }

    static countAmount() {
        return connection.execute("SELECT * FROM count_doctor");
    }

    static getById(id) {
        return connection.execute("SELECT * FROM doctor WHERE id =?", [id]);
    }

    static create(doctor) {
        return connection.execute("INSERT INTO doctor SET?", doctor);
    }

    static update(doctor) {
        return connection.execute("UPDATE doctor SET ? WHERE id =?", [
            doctor,
            doctor.id,
        ]);
    }

    static delete(id) {
        return connection.execute("DELETE FROM doctor WHERE id =?", [id]);
    }
};
