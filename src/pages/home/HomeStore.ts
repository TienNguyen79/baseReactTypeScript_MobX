import {makeAutoObservable} from "mobx";


class HomeStore{
    isLoading: boolean = false
    listBanner: string[] = []

    constructor() {
        makeAutoObservable(this)
    }
    async getBanner(){

    }
}

export const homeStore = new HomeStore()