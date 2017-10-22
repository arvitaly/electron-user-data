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
const export_1 = require("./export");
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
    key: "experiments",
    value: new Buffer([123, 0, 125, 0]),
};
const localstorageItem2 = {
    key: "_cs_viewer",
    value: new Buffer([48, 0]),
};
it("export test", () => __awaiter(this, void 0, void 0, function* () {
    const fromPath = __dirname + "/../__fixtures__";
    const data = yield export_1.Export(fromPath);
    expect(data).toEqual({
        cookies: [cookie1],
        localstorages: [{
                address: "chrome-devtools_devtools",
                items: [localstorageItem1],
            }, {
                address: "https_www.test.com",
                items: [localstorageItem2],
            }],
    });
}));
