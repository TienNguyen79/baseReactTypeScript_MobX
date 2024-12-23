import StorageService from "../service/StorageService";
// import {profileStore} from "../../modules/auth/profileStore";


export function sttPage(page: number, index: any, size?: any) {
    let start = 1
    if (page > 0) {
        start = page * (size ?? 10) + index + 1
    } else {
        start = start + index
    }
    return start
}

export function checkLength(arr: any[], length?: number) {
    let num = length ?? 0
    let check = false
    if (arr && arr.length > num) {
        check = true
    }
    return check
}
export function deepClone(obj: any) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const arrCopy: any[] = [];
        obj.forEach((_, i) => {
            arrCopy[i] = deepClone(obj[i]);
        });
        return arrCopy;
    }

    const objCopy = {};
    Object.keys(obj).forEach((key) => {
        // @ts-ignore
        objCopy[key] = deepClone(obj[key]);
    });
    return objCopy;
}

export function urlImage(url: any) {
    return process.env.REACT_APP_API_VIEWIMG + url
}


export function urlImageSSO(url: any) {
    return process.env.REACT_APP_VIEWIMG_SSO + url
}


export function uniqueArrObject(arr: any[]) {
    return arr.reduce((acc, curr) => {
        if (!acc.some((item: any) => item?.id === curr?.id)) {
            acc.push(curr);
        }
        return acc;
    }, [])
}

export function handleClickHtml(event: any){
    if (event.target.tagName === 'A') {
        event.target.setAttribute('target', '_blank');
    }
}
export function convertDataSelectAnt(arr: any[]) {
    let arrNew: any = []
    arr && arr.map((val) => {
        arrNew.push({label: val?.name ?? val?.code, value: val?.id})
    });
    return arrNew
}
export function displayDeadlineWarning(deadlineTimestamp: number): {daysRemaining: number, warningColor: string, backgroundWarningColor: string} | null {
    if(!deadlineTimestamp) return null
    const currentDate = new Date();
    const deadline = new Date(deadlineTimestamp);
    deadline.setHours(23, 59, 59); //Đánh dấu là cuối ngày deadline
    currentDate.setHours(0, 0, 0); //Đánh dấu là cuối ngày deadline
    const timeRemaining =((deadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = timeRemaining >= 0 ? Math.ceil(timeRemaining) : Math.floor(timeRemaining);
    let warningColor = '';
    let backgroundWarningColor = '';

    switch (true) {
        case daysRemaining > 10:
            warningColor = '#2ecc71';
            backgroundWarningColor = 'rgba(46,204,113,0.1)';
            break;
        case daysRemaining > 5:
            warningColor = '#f1c40f';
            backgroundWarningColor = 'rgba(241,196,15,0.1)';
            break;
        case daysRemaining > 3:
            warningColor = '#e67e22';
            backgroundWarningColor = 'rgba(230,126,34,0.1)';
            break;
        case daysRemaining > 0:
            warningColor = '#FF424F';
            backgroundWarningColor = 'rgba(255,66,79,0.1)';
            break;
        case daysRemaining < 0:
            warningColor = '#FF424F';
            backgroundWarningColor = 'rgba(255,66,79,0.1)';
            break;
        default:
            warningColor = '#8e44ad';
            backgroundWarningColor = 'rgba(142,68,173,0.1)';
            break;
    }

    return {
        daysRemaining,
        backgroundWarningColor,
        warningColor
    };
}


export function checkWebsite(link: string) {
    try {
        const url = new URL(link);
        return !!url.protocol && !!url.host
    } catch (error) {
        return false
    }
}
export const currencyFormatter = (amount: number) => {
    const type0 = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín"
    ];

    const type1 = ["", "mươi", "trăm"];

    const type2 = ["", "nghìn", "triệu", "tỷ"];

    let value = Math.trunc(amount).toString();
    let result = "";
    const strs = [];
    for (let i = value.length - 1; i > -1; i -= 3) {
        let tmp = value[i];
        if (value[i - 1]) tmp = value[i - 1] + tmp;
        if (value[i - 2]) tmp = value[i - 2] + tmp;
        strs.push(tmp);
    }
    strs.forEach((v, index) => {
        if (index > type2.length) return "The number is too big";
        if (parseInt(v, 10) === 0) return;
        let count = 0;
        for (let i = v.length - 1; i > -1; i--) {
            if (i === v.length - 1) result = type2[index] + " " + result;
            if (v[i] !== "0")
                result = type0[parseInt(v[i], 10)] + " " + type1[count] + " " + result;
            count++;
        }
    });

    result = result.replaceAll("mươi năm", "mươi lăm");
    result = result.replaceAll("mươi một", "mươi mốt");
    result = result.replaceAll("một mươi", "mười");

    if (parseInt(strs[0], 10) === 0) return result + " đồng chẵn";
    return capitalizeFirstLetter(result) + " đồng";
};

export function getCurrentDateInVietnameseFormat(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng ngày với số có 2 chữ số
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthStr = month < 10 ? `0${month}` : `${month}`;

    return `Ngày ${dayStr} tháng ${monthStr} năm ${year}`;
}

export const countDays = (startDate: any, endDate: any) => {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let timeDifference = end.getTime() - start.getTime();

    let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference + " ngày";
}

export function validateEmail(email: any) {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return pattern.test(email.trim(''))
}

export function invalidCharsRegex (text:any) {
    const pattern = /[~!@#$%^&*()_+:"?><{}[\]|\\]/;
    return pattern.test(text.trim(''))
}

export function checkPhoneNumber(phoneNumber: any) {
    const phoneRegex = /^(0?)(3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    return phoneRegex.test(phoneNumber)
}


export function getPathName(index?: any) {
    return window.location.pathname?.split('/')[index ?? 1];
}

export function getUrlParameter(name: any) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ''));
}

export function getUrlExtenstion(item: any) {
    const parts = item?.split(".");
    if(checkLength(parts)){
        const extension = parts[parts.length - 1];
        switch (extension) {
            case "pdf":
                return `/assets/ico/file/pdf.svg`;
            case "xlsx" || "xls":
                return `/assets/ico/action/excel.svg`;
            case "doc" || "docx":
                return `/assets/ico/file/doc.svg`;
            default :
                return `/assets/ico/ico_upfile.svg`;
        }
    }
}

export const downloadFile = (fileUrl: string, fileName?: string) => {
    // Create a link element
    const link = document.createElement('a');
    link.href = fileUrl;
    
    // Set the download attribute to specify the filename
    link.download = fileName ? fileName : fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
};
export function formatAddress(address: any) {
    return [
        address?.detail && `${address?.detail}`,
        address?.ward?.name && `, ${address.ward.name}`,
        address?.district?.name && `, ${address.district.name}`,
        address?.province?.name && `, ${address.province.name}`,
    ]
        .filter(Boolean)
        .join('');
}

export function getLinkFileView(item: any){
    if (item) {
        const parts = String(item).split(".");
        const extension = parts[parts.length - 1];
        const supportedExtensions = ['xlsx', 'xls', 'doc', 'docx'];
        if (supportedExtensions.includes(extension.toLocaleLowerCase())) {
            return `https://view.officeapps.live.com/op/view.aspx?src=${urlImage(item)}`;
        } else {
            return urlImage(item);
        }
    }
    else return null
}
export function removeDiacritics(str: string) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    return str
}
export function getIDParameter(index?: any) {
    return window.location.pathname.split('/')[index ?? 3] as any;
}
export function setToStartOfDay(date: string | number | Date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate.getTime();
}

export function setToEndOfDay(date: string | number | Date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate.getTime();
}
export function adjustTimestampByTimeZone(timestamp: number) {
    // Lấy múi giờ hiện tại của hệ thống
    // Tính toán số giờ cần trừ đi dựa trên múi giờ hiện tại
    // const hoursToAdjust = new Date().getTimezoneOffset() / 60;
    // const millisecondsToAdjust = hoursToAdjust * 60 * 60 * 1000;
    // return timestamp + millisecondsToAdjust;
    return timestamp
}
export function mergeArrays(X: any, Y: any){
    const newX = X
    Y?.forEach((itemY: any) => {
        const found = newX?.some((itemX: any) => itemX === itemY);
        if (!found) {
            newX?.push(itemY);
        }
    });
    return newX;
}

export function unique_arr(arr: any) {
    return Array.from(new Set(arr))
}
export function unique_arr_object(arr: any) {
    if (!arr) return []
    else return arr.filter((obj: any, index: any, self: any) =>
        index === self.findIndex((o: any) => o?.id === obj?.id)
    );
}

export function setCookie(name: string, value: any, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name: string) {
    setCookie(name, "", -1);
}


export function goBack() {
    window.history.back();
}

export function slug(value: string) {
    var str = value ? value : 'slug'
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}

export function regexNameEmail(e: string){
    let str = e
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/[^a-zA-Z0-9]/g, '');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/(\s+)/g, '');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str
}

export const checkPermission = (permissionCode: any) => {
    let result = false;
    let listRole: any = localStorage.getItem('listRole')
    if (checkLength(listRole)) {
        let listPermission: any = listRole.split(',');

        if (listPermission && listPermission.length > 0) {
            if (listPermission.includes(permissionCode)) {
                result = true
            }
            if (listPermission.includes("owner")) {
                result = true
            }
        }
    }

    if(localStorage.getItem('owner') == 'true'){
        result = true
    }

    return result;
}



export function formatNumberPhone(number_phone: string) {
    return number_phone.replace(
        /(^(?:\d{2}))?(\d{3})(?=(?:\d{5})+$)/g,
        '$1.$2.'
    );
}

// Hàm viết hoa chữ cái đầu của từ
export const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getCommonIds = (listMemberAvailable: any[], memberIds: number[]) => {
    const availableIds = listMemberAvailable.map((member: any) => member.id);
    return memberIds.filter(id => availableIds.includes(id));
}


// export async function parseJwt(token_?: any) {
//     if (token_ || StorageService.getToken()) {
//         let token: any = token_ ?? StorageService.getToken()
//         let base64Url = token.split('.')[1];
//         let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
//         if (JSON.parse(jsonPayload)['enterprise-id']) {
//             localStorage.setItem('issId', JSON.parse(jsonPayload)['enterprise-id'])
//         }
//         if (JSON.parse(jsonPayload)['status']) {
//             localStorage.setItem('statusAccount', JSON.parse(jsonPayload)['status'])
//         }
//
//         localStorage.setItem('owner', JSON.parse(jsonPayload).owner)
//         profileStore.dataInfo.id = JSON.parse(jsonPayload)['enterprise-user-id']
//         profileStore.dataInfo.ssoId = JSON.parse(jsonPayload)['user-id']
//         profileStore.dataInfo.phone = JSON.parse(jsonPayload).username
//         profileStore.dataInfo.status = JSON.parse(jsonPayload).status
//         profileStore.dataInfo.owner = JSON.parse(jsonPayload).owner
//         profileStore.dataInfo.issId = JSON.parse(jsonPayload)['enterprise-id']
//         profileStore.dataInfo.name = localStorage.getItem('name') ?? JSON.parse(jsonPayload).name
//         profileStore.dataInfo.avatar = localStorage.getItem('avatar') ?? JSON.parse(jsonPayload).avatar
//     }
// }