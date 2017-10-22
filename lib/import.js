"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
const Sqlite_1 = require("./Sqlite");
exports.CookiesTableCreationSQL = `CREATE TABLE IF NOT EXISTS cookies
    (creation_utc INTEGER NOT NULL UNIQUE PRIMARY KEY,host_key TEXT NOT NULL,name TEXT NOT NULL,
    value TEXT NOT NULL,path TEXT NOT NULL,expires_utc INTEGER NOT NULL,secure INTEGER NOT NULL,
    httponly INTEGER NOT NULL,last_access_utc INTEGER NOT NULL, has_expires INTEGER NOT NULL DEFAULT 1,
    persistent INTEGER NOT NULL DEFAULT 1,priority INTEGER NOT NULL DEFAULT 1,encrypted_value BLOB DEFAULT '',
    firstpartyonly INTEGER NOT NULL DEFAULT 0);`;
exports.LocalStorageTableCreateSQL = `CREATE TABLE ItemTable
    (key TEXT UNIQUE ON CONFLICT REPLACE, value BLOB NOT NULL ON CONFLICT FAIL)`;
exports.Import = (pathTo, data) => __awaiter(this, void 0, void 0, function* () {
    yield fs_1.createDir(pathTo);
    // clear
    const localstoragePath = pathTo + "/Local Storage";
    yield fs_1.removeDir(localstoragePath);
    yield fs_1.removeDir(pathTo + "/Cookies");
    // prepare dirs
    yield fs_1.createDir(localstoragePath);
    // Cookies
    const db = Sqlite_1.default(pathTo + "/Cookies");
    yield db.run(exports.CookiesTableCreationSQL);
    const cookiesSql = `insert into cookies values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    for (const cookie of data.cookies) {
        yield db.run(cookiesSql, [cookie.creation_utc, cookie.host_key, cookie.name, cookie.value, cookie.path, cookie.expires_utc,
            cookie.secure, cookie.httponly, cookie.last_access_utc, cookie.has_expires,
            cookie.persistent, cookie.priority, cookie.encrypted_value, cookie.firstpartyonly,
        ]);
    }
    yield db.close();
    // LocalStorages
    for (const localstorage of data.localstorages) {
        const lsDb = Sqlite_1.default(localstoragePath + "/" + localstorage.address + "_0.localstorage");
        yield lsDb.run(exports.LocalStorageTableCreateSQL);
        for (const item of localstorage.items) {
            yield lsDb.run(`insert into ItemTable values(?,?)`, [item.key, item.value]);
        }
        yield lsDb.close();
    }
});
exports.default = exports.Import;
