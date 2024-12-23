import React from 'react';


interface IProps{
    colSpan: number,
    height?: number
}

const LoadingTable = ({ colSpan, height }: IProps) => {

    return (
        <tr className="w-100">
            <td style={{height: height ?? 350}} colSpan={colSpan} className='text-center w-100 fw-500'>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="dot-opacity-loader my-5">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default LoadingTable;
