import { basename } from "path";
import { IData, ILocalStorage } from ".";
import { glob } from "./fs";
import createDB, { OpenMode } from "./Sqlite";
import { getLocalStorageDirName } from "./util";
export const Export = async (pathFrom: string): Promise<IData> => {
    // cookies
    const cookiesPath = pathFrom + "/Cookies";
    const cookiesDB = createDB(cookiesPath, OpenMode.OPEN_READONLY);
    const cookies = await cookiesDB.all(`select * from cookies`);
    await cookiesDB.close();
    // localstorages
    const lsFiles = await glob(pathFrom + "/" + getLocalStorageDirName() + "/*.localstorage");
    const localstorages: { [index: string]: ILocalStorage } = {};
    for (const fileName of lsFiles) {
        const address = basename(fileName, "localstorage").replace(/_[0-9]+\.$/, "");
        if (!localstorages[address]) {
            localstorages[address] = { address, items: [] };
        }
        const db = createDB(fileName);
        const items = await db.all(`select * from ItemTable`);
        localstorages[address].items = localstorages[address].items.concat(items);
    }
    return {
        cookies,
        localstorages: Object.keys(localstorages).map((n) => localstorages[n]),
    };

};
export default Export;
