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
const import_1 = require("./import");
const Sqlite_1 = require("./Sqlite");
const cookie1 = {
    creation_utc: 1,
    encrypted_value: new Buffer(1),
    expires_utc: 1,
    firstpartyonly: 1,
    has_expires: 1,
    host_key: "1",
    httponly: 1,
    last_access_utc: 1,
    name: "1",
    path: "1",
    persistent: 1,
    priority: 1,
    secure: 1,
    value: "1",
};
const localstorageItem1 = {
    key: "key1",
    value: new Buffer("Val1"),
};
it("import test", () => __awaiter(this, void 0, void 0, function* () {
    yield import_1.Import(__dirname + "/../tmp", {
        cookes: [cookie1],
        localstorages: [{
                address: "addr1",
                items: [localstorageItem1],
            }],
    });
    // check cookies
    let db = Sqlite_1.default(__dirname + "/../tmp/Cookies");
    const cookies = yield db.all(`select * from cookies`);
    expect(cookies.length).toBe(1);
    expect(cookies[0]).toEqual(cookie1);
    yield db.close();
    // check localstorages
    db = Sqlite_1.default(__dirname + "/../tmp/Local Storage/addr1_0.localstorage");
    const items = yield db.all(`select * from ItemTable`);
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(localstorageItem1);
    yield db.close();
}));
