import {makeAutoObservable, toJS} from "mobx";
import {toastUtil} from "../../common/utils/ToastUtil";
import {demoService} from "./DemoService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
class DemoStore {
    params:any ={
        text_base: '',
        text_email: '',
        text_password: '',
        text_phone: '',
        selected: null,
        chooseDate: null
    }
    text_number: number | null = 0;
    text_base: string = "";
    tabActive: string = ""
    text_time: string = "";
    errors: any = {
        text_base: '',
        text_email: '',
    }
    clearError() {
        this.errors = {
            text_base: "",
            text_email: "",
        };
    }
    checkValidate = () => {
        this.clearError();
        let {text_base,text_email} = this.params;

        if (!text_base || !text_email) {
            if(!text_base || !text_base.trim()){
                this.errors.text_base = "Text không được để trống!";
                console.log("🚀 ~ DemoStore ~ this.errors.text_base:", this.errors.text_base)
            }
            if(!text_email){
                this.errors.text_email = "Email không được để trống!";
                console.log("🚀 ~ DemoStore ~ this.errors.text_email:", this.errors.text_email)
            }
            return true
        }

        return false
    }
    async login() {
        if(this.checkValidate()){
            toastUtil.warning('Vui lòng nhập đầy đủ thông tin!')
            return false;
        }
    }

    async checkDomain() { //test api
        const result = await demoService.verifyDomain('posfnb.xweb.asia', "fnb");
        if (result.status === HttpStatusCode.OK) {
            console.log(result.body)
        }
    }

    async getTables() { //test api
        const result = await demoService.getTable();
        if (result.status === HttpStatusCode.OK) {
            console.log(result.body)
        }
    }

    constructor() {
        makeAutoObservable(this); // Đảm bảo các thuộc tính được quan sát
    }
}

export const demoStore = new DemoStore();
