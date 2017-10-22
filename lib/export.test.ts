import { Export } from "./export";
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
it("export test", async () => {
    const fromPath = __dirname + "/../__fixtures__";
    const data = await Export(fromPath);
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
});
