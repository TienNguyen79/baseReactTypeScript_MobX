import {getRequest, postRequest} from "../../common/helpers/RequestHelper";


class DemoService {
    apiVerifyDomain = `/api/v1/domain/verify`;
    apiGetInforTable = `/api/v1/pos/fnb/get_info_table/68`
    apiTagProduct = `/api/v1/categorytags`;
    public verifyDomain(domain_name: string, source_type: string) {
        const params = { domain_name,source_type };
        return postRequest(this.apiVerifyDomain, params);
    }

    public getTable() {
        return getRequest(this.apiGetInforTable);
    }

    public tagProduct() {
        return getRequest(this.apiTagProduct);
    }
}

export const demoService = new DemoService();
