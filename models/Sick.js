const connection = require("../database/db");

module.exports = class Sick {
    static getAll() {
        return connection.execute("SELECT * FROM sick");
    }

    static countAmount() {
        return connection.execute("SELECT * FROM count_sick");
    }

    static getById(id) {
        return connection.execute("SELECT * FROM sick WHERE id =?", [id]);
    }

    static create(sick) {
        return connection.execute("INSERT INTO sick SET?", sick);
    }

    static update(sick) {
        return connection.execute("UPDATE sick SET ? WHERE id =?", [
            sick,
            sick.id,
        ]);
    }

    static delete(id) {
        return connection.execute("DELETE FROM sick WHERE id =?", [id]);
    }
};
