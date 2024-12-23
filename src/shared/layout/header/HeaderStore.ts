import { makeAutoObservable } from "mobx";
class HeaderStore {

    constructor() {
        makeAutoObservable(this);
    }
}

export const headerStore = new HeaderStore();
