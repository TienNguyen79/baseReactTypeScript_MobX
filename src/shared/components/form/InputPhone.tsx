import React from 'react';
import {Input} from "antd";
import {numberUtil} from "../../../common/utils/NumberUtil";
interface IProps {
    value: any,
    onChange: any
    isError?: any,
    type?: any,
    disabled?: any,
    placeholder?: string,
    onKeyDown?: () => void
    iconCheck?: boolean
    maxLength?: number,
    className?: string
}
const InputPhone = (item: IProps) => {

    return (
        <>
            <div className="input-group">
                {!item.iconCheck ? <Input type={item.type ?? 'text'} value={item.value || ""} maxLength={item.maxLength ?? 10}
                                          onChange={(e: any) => {
                                              item.onChange(numberUtil.regexNumber(e))
                                          }} disabled={item.disabled} onKeyDown={(e: any) => {
                                                if (e.key === "Enter") {
                                                    item.onKeyDown && item.onKeyDown()
                                                }
                                            }}
                                          className={`${item.className} ${(item.isError && !item.value) && 'border_error'}`}
                                          placeholder={item.placeholder ?? ''}/> :
                    <Input type={item.type ?? 'text'} value={item.value || ""}  minLength={10} onKeyDown={(e: any) => {
                                if (e.key === "Enter") {
                                    item.onKeyDown && item.onKeyDown()
                                }
                            }}
                           onChange={(e: any) => {
                               item.onChange(numberUtil.regexNumber(e))
                           }} disabled={item.disabled} maxLength={item.maxLength ?? 10}
                           suffix={<img width={21} height={20} src="/assets/ico/ico_check.svg" alt=""/>}
                           className={`${item.className} ${(item.isError && !item.value) && 'border_error'}`}
                           placeholder={item.placeholder ?? ''}/>}
            </div>
            {(item.isError && !item.value) && <p className="error">{item.isError ?? 'Số điện thoại không được để trống!'}</p>}
        </>
    );

}

export default InputPhone;