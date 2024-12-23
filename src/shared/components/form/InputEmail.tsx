import React, {useState} from 'react';
import {Input} from "antd";
import {validateEmail} from "../../../common/utils/Utils";

interface IProps{
    value: any,
    onChange: any
    isError?: any,
    type?: any,
    disabled?: any,
    placeholder?: string
}

const InputEmail = (item:IProps) => {
    const [error, setError] = useState<string>()
    return (
        <>
            <div className="input-group">
                <Input type={item.type ?? 'text'} value={item.value || ""}
                       onChange={(e: any) => {
                               item.onChange(e)
                               if(e.currentTarget.value.length > 1 && !validateEmail(e.currentTarget.value)){
                                   setError('Email chưa đúng định dạng!')
                               }else setError('')
                       }} disabled={item.disabled}
                       className={`${((item.isError && !item.value) || (item.value && !validateEmail(item.value))) && 'border_error'}`} placeholder={item.placeholder ?? ''}/>
            </div>
            {(item.isError && !item.value) && <p className="error">{item.isError ?? 'Email không được để trống!'}</p>}
            {((item.value) && !validateEmail(item.value)) && <p className="error e_2">{error ? error : 'Email chưa đúng định dạng!'}</p>}
        </>
    );
}

export default InputEmail;