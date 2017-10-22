import sqlite3 = require("sqlite3");
import { promisify } from "util";
class Sqlite {
    constructor(protected db: sqlite3.Database) { }
    public all(sql: string, params?: any[]): Promise<any[]> {
        return promisify(this.db.all.bind(this.db))(sql, params);
    }
    public run(sql: string, params?: any[]): Promise<void> {
        return promisify(this.db.run.bind(this.db))(sql, params);
    }
    public close(): Promise<void> {
        return promisify(this.db.close.bind(this.db))();
    }
}
export default (pathToDatabase: string, mode?: number) => {
    return new Sqlite(new sqlite3.Database(pathToDatabase, mode));
};
