import {eraseCookie, getCookie, setCookie} from "../utils/Utils";
import Constants from "../constants/Constants";

export default class StorageService {
    public static getToken(){
        return getCookie(Constants.TOKEN_NAME);
    }

    public static removeToken() {
        eraseCookie(Constants.TOKEN_NAME);
    }

    public static removeFcmToken() {
        eraseCookie('fcm_token');
    }

    public static setToken(token: any) {
        setCookie(Constants.TOKEN_NAME, token, Constants.TOKEN_EXPIRE_DAYS);
    }

    public static getRefreshToken(): string | null{
        return getCookie(Constants.REFRESH_TOKEN);
    }

    public static removeRefreshToken() {
        eraseCookie(Constants.REFRESH_TOKEN);
    }

    public static setRefreshToken(token: String) {
        setCookie(Constants.REFRESH_TOKEN, token, Constants.TOKEN_EXPIRE_DAYS);
    }

    public static isTokenExits() {
        return StorageService.getToken() !== null;
    }

    public static setLocalStore(key: any, value: any) {
        localStorage.setItem(key, value);
    }

    public static getLocalStore(key: any) {
        return localStorage.getItem(key);
    }

    public static setUUID(uuid: string) {
        const newUserId = uuid.replace("-", "");
        this.setLocalStore("uuid", newUserId);
    }

    public static getUUID() {
        return this.getLocalStore("uuid");
    }

     //Chỉ lưu nhưng kiểu mảng
    public static saveArayLS = (key: string, arr: any) => {
        localStorage.setItem(key, JSON.stringify(arr));
    };

    public static getArrayFromLS = (key: string): Array<any> => {
        let data = [];
        if (localStorage.getItem(key)) {
            try {
                const arrayLocal = localStorage.getItem(key);
                data = JSON.parse(arrayLocal ? arrayLocal : "");
            } catch (e) {
                data = [];
            }
        }
        return data;
    };

    //Chỉ lưu nhưng kiểu object
    public static setObjectStore(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static getObjectStore(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public static removeLocalStore = (key: string) => {
        localStorage.removeItem(key);
    };

}
