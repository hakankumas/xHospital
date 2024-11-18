const connection = require("../database/db");

module.exports = class Department {
    static getAll() {
        return connection.execute("SELECT * FROM department");
    }

    static getById(id) {
        return connection.execute("SELECT * FROM department WHERE id =?", [id]);
    }

    static create(department) {
        return connection.execute("INSERT INTO department SET?", department);
    }

    static update(department) {
        return connection.execute("UPDATE department SET ? WHERE id =?", [
            department,
            department.id,
        ]);
    }

    static delete(id) {
        return connection.execute("DELETE FROM department WHERE id =?", [id]);
    }
};
