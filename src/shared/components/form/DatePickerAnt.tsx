import React from "react";
import {ConfigProvider, DatePicker} from "antd";
import dayjs from "dayjs";
import viVN from "antd/locale/vi_VN";
import 'dayjs/locale/vi';
dayjs.locale('vi'); // Thiết lập ngôn ngữ dayjs là tiếng Việt


interface IProps {
    value: any,
    onChange?: any
    isError?: any,
    format?: string,
    minDate?: any,
    maxDate?: any,
    showTime?: string,
    placeholder?: string,
    className?: string,
    noTextErr?: boolean,
    isVie?:boolean,
}


const DatePickerAnt = (item: IProps) => {

    return (
        <>
            {   
                item.isVie ? item.showTime ? 
                    <ConfigProvider locale={viVN}> 
                        <DatePicker 
                        className={!item.value && item.isError ? 'border_error' : ''}
                        disabledDate={item.minDate} showTime={{format: item.showTime}} placeholder={item.placeholder ?? "Chọn"}
                        value={item.value ? dayjs(item.value) : null}
                        format={item.format ?? 'DD/MM/YYYY'} onChange={(e: any) => item.onChange(e)}/>
                    </ConfigProvider> : <ConfigProvider locale={viVN}>
                        <DatePicker
                        className={!item.value && item.isError ? 'border_error' : ''}
                        disabledDate={item.minDate} placeholder={item.placeholder ? item.placeholder : "Chọn" }
                        value={item.value ? dayjs(item.value) : null}
                        format={item.format ?? 'DD/MM/YYYY'} onChange={(e: any) => item.onChange(e)}/>
                    </ConfigProvider>
                : item.showTime ? <DatePicker
                    className={!item.value && item.isError ? 'border_error' : ''}
                    disabledDate={item.minDate} showTime={{format: item.showTime}} placeholder={item.placeholder ?? "Chọn"}
                    value={item.value ? dayjs(item.value) : null}
                    format={item.format ?? 'DD/MM/YYYY'} onChange={(e: any) => item.onChange(e)}/> : <DatePicker
                    className={!item.value && item.isError ? 'border_error' : ''}
                    disabledDate={item.minDate} placeholder={item.placeholder ? item.placeholder : "Chọn" }
                    value={item.value ? dayjs(item.value) : null}
                    format={item.format ?? 'DD/MM/YYYY'} onChange={(e: any) => item.onChange(e)}/>
            }
            {(item.isError && !item.value) && !item.noTextErr && <p className="error">{item.isError}</p>}
        </>
    );
}

export default DatePickerAnt;