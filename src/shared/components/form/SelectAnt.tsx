import React, {useRef, useState} from "react";

import {Button, Select, Spin, Tooltip} from "antd";
import Icon from '@ant-design/icons';
import {convertDataSelectAnt, removeDiacritics} from "../../../common/utils/Utils";

interface IProps {
    value?: any;
    width?: any;
    onChange?: any;
    isError?: any;
    options: any[];
    className?: any;
    disabled?: boolean;
    placeholder?: string;
    multiple?: boolean;
    noTextErr?: boolean;
    isShowClear?: boolean;
    callback?: any;
    isCallback?: any;
    addItem?: any,
    dataTarget?: any,
    permissionAdd?: boolean,
    noContent?: string,
    isLoadingReadMore?: boolean;
    onSearch?: any;
    isFetching?: boolean
    tagRender?: any;
    style?: any
    isShowSuffixIcon?: boolean;
    onClickSuffixIcon?: any;
    dataTargetSuffixIcon?: any;
}

const SelectAnt = (item: IProps) => {
    const selectRef = useRef<any>(null);
    const [open, setOpen] = useState(false);

    // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //     const target = e.target as HTMLDivElement;
    //     if (((target.scrollTop + target.offsetHeight) > (0.8 * target.scrollHeight)) && !item.isLoadingReadMore && item.isCallback) {
    //         item.callback();
    //     }
    // };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const nearBottom =
          target.scrollTop + target.offsetHeight >= target.scrollHeight - 10; // Sai số nhỏ
        if (nearBottom && !item.isLoadingReadMore && item.isCallback) {
          item.callback();
        }
      };
      

    const handleAddItem = () => {
        item.addItem();
        setOpen(false);
    };

    const noContent = () => {
        return (
            <div className="d-flex align-items-center justify-content-center p-4">
                {
                    item.isFetching ? <Spin className='spin_color__default' size="small" /> : <span className="fs-14 text-muted">{item.noContent ?? 'Chưa có dữ liệu'}</span>
                }
            </div>
        )
    }

    const dropdownRender = (menu: any) => {
        return (
            <>
                {menu}
                {item.addItem && item.permissionAdd && item.dataTarget &&
                <div className="d-flex p-1 justify-content-center" style={{backgroundColor: '#FAFAFA'}}>
                    <Button type="text" icon={<i className="far color_default fa-plus"/>}
                            className="btn btn-sm color_default" data-bs-toggle="modal"
                            data-bs-target={`#${item.dataTarget}`} onClick={() => {
                        handleAddItem()
                    }}>
                        Tạo mới
                    </Button>
                </div>}
            </>
        )
    }

    let dropdownStyle = {
        width: 'auto',
        maxWidth: '850px',
        whiteSpace: 'nowrap',
    }

    return (
        <div className="input-group" style={{width: item.width ? item.width : "100%", minHeight: 38}}>
            {item.multiple ? (
                <Select
                    ref={selectRef}
                    open={open}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    mode="multiple"
                    tagRender={item.tagRender}
                    allowClear={item.isShowClear}
                    value={item.value}
                    style={{...item.style, borderRadius: 4}}
                    notFoundContent={noContent()}
                    disabled={item.disabled}
                    onPopupScroll={(e: React.UIEvent<HTMLDivElement>) =>
                        handleScroll(e)
                    }
                    dropdownMatchSelectWidth={false}
                    dropdownStyle={dropdownStyle}
                    className={`${
                        (item.isError && !item.value) ||
                        (item.isError && item.value && item.value.length < 1)
                            ? "border_error"
                            : ""
                    } ${item.value && item.value.length > 0 ? "" : "no_select__multi"} ${
                        item.className
                    }`}
                    filterOption={(input: string, option: any) =>
                        removeDiacritics(option.label?.toLowerCase() ?? "").includes(removeDiacritics(input?.toLowerCase()))
                    }
                    onChange={(e: any, value: any) => item.onChange(e, value)}

                    dropdownRender={(menu) => dropdownRender(menu)}
                    showSearch
                    onSearch={item.onSearch}
                    placeholder={item.placeholder ?? "Chọn"}
                    options={convertDataSelectAnt(item.options)}
                />
            ) : (
                <Select
                    ref={selectRef}
                    open={open}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    suffixIcon={item.isShowSuffixIcon && item.value &&
                        <Tooltip className='cursor_pointer'
                                 title="Xem chi tiết">
                            <Icon component={() => <img data-bs-toggle="modal"
                                                  data-bs-target={`#${item.dataTargetSuffixIcon}`}
                                                  onClick={(e: any) => {
                                                      e.stopPropagation()
                                                  }} style={{cursor: 'pointer'}} src="/assets/ico/ep_info-filled.svg"
                                                  alt=""/> as any} size={32}/>
                        </Tooltip>
                    }
                    value={item.value}
                    allowClear={item.isShowClear}
                    style={{...item.style, borderRadius: 4}}
                    disabled={item.disabled}
                    dropdownMatchSelectWidth={false}
                    className={`${item.isError && !item.value ? "border_error" : ""} ${
                        item.className
                    }`}
                    notFoundContent={noContent()}
                    onPopupScroll={(e: React.UIEvent<HTMLDivElement>) =>
                        handleScroll(e)
                    }
                    filterOption={(input: string, option: any) =>
                        removeDiacritics(option.label?.toLowerCase() ?? "").includes(removeDiacritics(input?.toLowerCase()))
                    }
                    dropdownStyle={dropdownStyle}
                    onChange={(e: any, value: any) => item.onChange(e, value)}
                    showSearch
                    onSearch={item.onSearch}
                    placeholder={item.placeholder ?? "Chọn"}
                    options={convertDataSelectAnt(item.options)}
                    dropdownRender={(menu) => dropdownRender(menu)}
                />
            )}
            {!item.noTextErr && item.isError && !item.value && (<p className="error">{item.isError}</p>)}
            {!item.noTextErr && item.isError && item.value && item.value.length < 1 &&
            <p className="error mt-1">{item.isError}</p>}
        </div>
    )
};

export default SelectAnt;
