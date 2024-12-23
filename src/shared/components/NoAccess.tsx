import React from 'react';
// import {registerStore} from "../auth/register/RegisterStore";
interface IProps {
    isNoPadding?: boolean
}
const NoAccess = ({isNoPadding}: IProps) => {

    return (
        <div className="w-100 vh-75 bg-white" style={!isNoPadding ? {padding: `100px 0 120px`} : {}}>
            <div className="d-flex justify-content-center">
                <img src="/assets/images/no_access.svg" alt=""/>
            </div>
            <div className="d-flex fw-semibold mt-4 justify-content-center">KHÔNG CÓ QUYỀN TRUY CẬP!</div>
            <div className="d-flex text-center mt-2 justify-content-center" style={{color: '#626C70'}}>Vui lòng liên hệ
                với ban quản trị để được<br/>cấp quyền truy cập và sử dụng.
            </div>
            <div className="d-flex justify-content-center mt-4">
                {/*<button className="send-request" onClick={() => registerStore.getToken()}><img className="me-1"*/}
                {/*                                                                               src="/assets/ico/ico_reload.svg"*/}
                {/*                                                                               alt=""/> Tải lại trang*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default NoAccess;