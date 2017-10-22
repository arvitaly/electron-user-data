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
const path_1 = require("path");
const fs_1 = require("./fs");
const Sqlite_1 = require("./Sqlite");
const util_1 = require("./util");
exports.Export = (pathFrom) => __awaiter(this, void 0, void 0, function* () {
    // cookies
    const cookiesPath = pathFrom + "/Cookies";
    const cookiesDB = Sqlite_1.default(cookiesPath, Sqlite_1.OpenMode.OPEN_READONLY);
    const cookies = yield cookiesDB.all(`select * from cookies`);
    yield cookiesDB.close();
    // localstorages
    const lsFiles = yield fs_1.glob(pathFrom + "/" + util_1.getLocalStorageDirName() + "/*.localstorage");
    const localstorages = {};
    for (const fileName of lsFiles) {
        const address = path_1.basename(fileName, "localstorage").replace(/_[0-9]+\.$/, "");
        if (!localstorages[address]) {
            localstorages[address] = { address, items: [] };
        }
        const db = Sqlite_1.default(fileName);
        const items = yield db.all(`select * from ItemTable`);
        localstorages[address].items = localstorages[address].items.concat(items);
    }
    return {
        cookies,
        localstorages: Object.keys(localstorages).map((n) => localstorages[n]),
    };
});
exports.default = exports.Export;
