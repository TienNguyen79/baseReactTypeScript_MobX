import React from 'react';
interface IProps {
    message?: string,
    height?: number
}

const NoContent = ({message, height}: IProps) => {

    return (
        <div style={{height: height ?? 350}} className='w-100 text-center'>
            <div
                 className='d-flex flex-wrap h-100 justify-content-center align-items-center'>
                <div className="d-flex w-100 justify-content-center align-items-center">
                    <img style={{maxWidth: '100%', maxHeight: height && height < 250 ? 150 : 229}} src="/assets/images/img_nocontent.svg" alt=""/>
                </div>
                <span style={{color: "#ccc", fontSize: "14px"}}>{message ?? "Chưa có dữ liệu"}
            </span>
            </div>
        </div>
    )
}

export default NoContent;
