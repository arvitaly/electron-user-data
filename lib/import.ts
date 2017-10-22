import { IData } from ".";
import { createDir, removeDir } from "./fs";
import createDatabase from "./Sqlite";
export const CookiesTableCreationSQL =
    `CREATE TABLE IF NOT EXISTS cookies
    (creation_utc INTEGER NOT NULL UNIQUE PRIMARY KEY,host_key TEXT NOT NULL,name TEXT NOT NULL,
    value TEXT NOT NULL,path TEXT NOT NULL,expires_utc INTEGER NOT NULL,secure INTEGER NOT NULL,
    httponly INTEGER NOT NULL,last_access_utc INTEGER NOT NULL, has_expires INTEGER NOT NULL DEFAULT 1,
    persistent INTEGER NOT NULL DEFAULT 1,priority INTEGER NOT NULL DEFAULT 1,encrypted_value BLOB DEFAULT '',
    firstpartyonly INTEGER NOT NULL DEFAULT 0);`;
export const LocalStorageTableCreateSQL =
    `CREATE TABLE ItemTable
    (key TEXT UNIQUE ON CONFLICT REPLACE, value BLOB NOT NULL ON CONFLICT FAIL)`;

export const Import = async (pathTo: string, data: IData) => {
    await createDir(pathTo);
    // clear
    const localstoragePath = pathTo + "/Local Storage";
    await removeDir(localstoragePath);
    await removeDir(pathTo + "/Cookies");
    // prepare dirs
    await createDir(localstoragePath);
    // Cookies
    const db = createDatabase(pathTo + "/Cookies");
    await db.run(CookiesTableCreationSQL);
    const cookiesSql = `insert into cookies values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    for (const cookie of data.cookies) {
        await db.run(cookiesSql,
            [cookie.creation_utc, cookie.host_key, cookie.name, cookie.value, cookie.path, cookie.expires_utc,
            cookie.secure, cookie.httponly, cookie.last_access_utc, cookie.has_expires,
            cookie.persistent, cookie.priority, cookie.encrypted_value, cookie.firstpartyonly,
            ]);
    }
    await db.close();
    // LocalStorages
    for (const localstorage of data.localstorages) {
        const lsDb = createDatabase(localstoragePath + "/" + localstorage.address + "_0.localstorage");
        await lsDb.run(LocalStorageTableCreateSQL);
        for (const item of localstorage.items) {
            await lsDb.run(`insert into ItemTable values(?,?)`, [item.key, item.value]);
        }
        await lsDb.close();
    }
};

export default Import;
