import React from 'react';


interface IProps {
    text?: string,
    onChange: any,
    className?: string
}

const ButtonImport = (item : IProps) => {

    return (
        <div className={`bt_import_data ${item.className}`} >
            <input id="import_data" placeholder="Import data"
                   type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   onChange={(e: any) => item.onChange(e)}
            />
            <button type="button" className="btn btn-sm text-white button_add">
                {/*<img className="me-1" src="/assets/ico/ico_import.png" alt=""/> */}
                <span>Nhập dữ liệu</span></button>
        </div>
    );

}

export default ButtonImport;