import { Import } from "./import";
import createDatabase from "./Sqlite";
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
it("import test", async () => {
    await Import(__dirname + "/../__tmp__", {
        cookies: [cookie1],
        localstorages: [{
            address: "addr1",
            items: [localstorageItem1],
        }],
    });
    // check cookies
    let db = createDatabase(__dirname + "/../__tmp__/Cookies");
    const cookies = await db.all(`select * from cookies`);
    expect(cookies.length).toBe(1);
    expect(cookies[0]).toEqual(cookie1);
    await db.close();
    // check localstorages
    db = createDatabase(__dirname + "/../__tmp__/Local Storage/addr1_0.localstorage");
    const items = await db.all(`select * from ItemTable`);
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(localstorageItem1);
    await db.close();
});
