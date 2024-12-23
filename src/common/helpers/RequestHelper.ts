import axios, {Method} from "axios";
import StorageService from "../service/StorageService";
import HttpStatusCode from "../constants/HttpErrorCode";
import {toastUtil} from "../utils/ToastUtil";
import createAuthRefreshInterceptor from "axios-auth-refresh";
export interface IApiResponse {
    readonly status: number;
    readonly body: any;
    readonly headers?: any
}

export interface IBodyError {
    readonly errorCode?: number;
    readonly messageCode?: number;
    readonly message: string
}

export function clearLocalStorage() {
    // Xóa các token cụ thể
    StorageService.removeFcmToken();
    StorageService.removeToken();
    StorageService.removeRefreshToken();

    // Xóa toàn bộ local storage
    localStorage.clear();

    // Chuyển hướng đến trang đăng nhập với URL hiện tại làm tham số redirect
    const redirectTo = window.location.href
    window.location.href = `/login?redirectTo=${redirectTo}`;
}

let API_DOMAIN = process.env.REACT_APP_API_DOMAIN
let API_NOTICE = process.env.REACT_APP_API_NOTI
let apiRefreshToken = process.env.REACT_APP_API_DOMAIN + '/sso/v1/auth/refresh-token'


const refreshAuthLogic = (failedRequest: { config: { headers: any } }) => axios.post(apiRefreshToken, {
    'refreshToken': StorageService.getRefreshToken(),
    service: 'iss'
})
    .then(response => {
      let {token, claims} = response.data
        parseInt(token)
        localStorage.setItem('listRole', claims.roles)
        localStorage.setItem('name', claims.name ?? claims.username)
        localStorage.setItem('avatar', claims.avatar)
        localStorage.setItem('statusAccount', claims.status)
        StorageService.setToken(token);
        failedRequest.config.headers['Authorization'] = 'Bearer ' + token;
        return Promise.resolve();
    })
    .catch(function (error) {
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    pauseInstanceWhileRefreshing: true
});


axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + StorageService.getToken();
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url === apiRefreshToken) {
            toastUtil.error('Phiên đăng nhập hết hạn', 2);
            setTimeout(() => {
                clearLocalStorage()
            }, 600)
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await createAuthRefreshInterceptor(axios, refreshAuthLogic);
                return axios(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const responseError = (error: any, methodGet?: boolean) => {
    let bodyError: IBodyError;

    try {
        if (error && error?.status === HttpStatusCode.FORBIDDEN) {
            bodyError = {
                errorCode: HttpStatusCode.FORBIDDEN,
                message: "Không có quyền truy cập!"
            }
        }else if (error && error.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
            bodyError = {
                errorCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: "Lỗi máy chủ nội bộ, vui lòng thử lại sau!"
            }
        } else {
            bodyError = {
                errorCode: error?.data?.errorCode ?? error?.status,
                messageCode: error?.data?.messageCode,
                message: error?.data?.message
            }
        }

        if(methodGet){
            toastUtil.error(bodyError.message, 1)
        }
    } catch (e) {
        if(methodGet){
            toastUtil.error('Đã có lỗi xảy ra!', 2)
        }
        bodyError = {
            errorCode: HttpStatusCode.UNKNOW_ERROR,
            message: "Đã có lỗi xảy ra!"
        }
    }

    const apiResponse: IApiResponse = {
        status: error?.status,
        body: bodyError
    };

    return apiResponse;
}

export async function getRequest(path: string, isNotice?: boolean): Promise<IApiResponse> {
    let newHeaders: any = {'Content-Type': 'application/json'}

    if (StorageService.isTokenExits()) {
        newHeaders = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            Authorization: 'Bearer ' + StorageService.getToken()
        }
    }

    let domain = isNotice ? API_NOTICE : API_DOMAIN

    return await axios.get(domain + path, {headers: newHeaders})
        .then(
            (response) => {
                const apiResponse: IApiResponse = {
                    status: response.status,
                    body:  response.data,
                    headers: response.headers
                };
                return apiResponse;
            },
            (error) => {
                return responseError(error?.response, true)
            }
        )
}

export async function postRequest(path: string, params: object, isNotice?: boolean): Promise<IApiResponse> {
    return apiCall(path, "POST", params, isNotice);
}

export async function patchRequest(path: string, params: object): Promise<IApiResponse> {
    return apiCall(path, "PATCH", params);
}

export async function putRequest(path: string, params: object, isNotice?:boolean): Promise<IApiResponse> {
    return apiCall(path, "PUT", params, isNotice);
}

export async function deleteRequest(path: string, params: object): Promise<IApiResponse> {
    return apiCall(path, "DELETE", params);
}

export function apiCall(path: string, _method: Method = "POST", _params: object, isNotice?: boolean): Promise<IApiResponse> {
    let newHeaders: any = {'Content-Type': 'application/json'}

    if (StorageService.isTokenExits()) {
        newHeaders = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            Authorization: 'Bearer ' + StorageService.getToken()
        }
    }

    let domain = isNotice ? API_NOTICE : API_DOMAIN

    return new Promise<IApiResponse>((resolve) => {
        axios({
            data: JSON.stringify(_params),
            headers: newHeaders,
            method: _method,
            url: domain + path
        })
            .then(function (response) {
                resolve({
                    status: response.status,
                    body: response.data,
                });
            })
            .catch(function (error) {
                resolve(responseError(error?.response))
            });

    });
}

