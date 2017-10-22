export { Import as import } from "./import";
export { Export as export } from "./export";
export type ICookies = ICookie[];
export interface ICookie {
    creation_utc: number;
    host_key: string;
    name: string;
    value: string;
    path: string;
    expires_utc: number;
    secure: number;
    httponly: number;
    last_access_utc: number;
    has_expires: number;
    persistent: number;
    priority: number;
    encrypted_value: Buffer;
    firstpartyonly: number;
}
export type ILocalStorages = ILocalStorage[];
export interface ILocalStorage {
    address: string;
    items: Array<{
        key: string;
        value: Buffer;
    }>;
}
export interface IData {
    cookies: ICookies;
    localstorages: ILocalStorages;
}
