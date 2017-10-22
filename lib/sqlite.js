"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require("sqlite3");
const util_1 = require("util");
class Sqlite {
    constructor(db) {
        this.db = db;
    }
    all(sql, params) {
        return util_1.promisify(this.db.all.bind(this.db))(sql, params);
    }
    run(sql, params) {
        return util_1.promisify(this.db.run.bind(this.db))(sql, params);
    }
    close() {
        return util_1.promisify(this.db.close.bind(this.db))();
    }
}
exports.default = (pathToDatabase, mode) => {
    return new Sqlite(new sqlite3.Database(pathToDatabase, mode));
};
