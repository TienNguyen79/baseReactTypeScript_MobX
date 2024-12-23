import { Input } from "antd";
import React, { useState } from "react";
import { invalidCharsRegex } from "../../../common/utils/Utils";
interface IProps {
  value: any;
  onChange?: any;
  isBorderError?: any;
  isError?: any;
  type?: any;
  disabled?: any;
  noTextErr?: boolean;
  placeholder?: string;
  className?: string;
  handleBlur?: any
  onKeyPress?: any,
  maxLength?:number,
  showCount?: boolean,
  onKeyDown?: () => void,
  suffix?: string,
  loadingAction?: boolean
  style?: any
  isCharsRegex?: boolean

}
const InputForm = (item: IProps) => {
  const [error,setError] = useState<string>();
  return (
    <>
      <div className="input-group">
        <Input
          type={item.type ?? "text"}
          value={item.value || ""}
          maxLength={item.maxLength ?? 200}
          onChange={(e: any) => {
              item.onChange(e)
              if (item.isCharsRegex && e.currentTarget.value.length > 1 && invalidCharsRegex(e.currentTarget.value)) {
                setError("Vui lòng không nhập ký tự đặc biệt!")
              }
            }
          }
          disabled={item.disabled}
          className={`${((item.isError && !item.value?.trim()) || item.isBorderError) ? "border_error" : ""} ${
            item.className
          }`}
          style={{...item.style}}
          showCount={item.showCount} // showCount là một thuộc tính thường được sử dụng trong các ô nhập liệu để hiển thị số ký tự mà người dùng đã nhập vào hoặc số ký tự còn lại (trong trường hợp có giới hạn độ dài).
          onKeyDown={(e: any) => { //onKeyDown thường được sử dụng để xử lý logic ngay khi phím được nhấn xuống, trước khi nó được thả ra (ngược lại với onKeyUp, là sự kiện khi phím được nhả ra)
              if (e.key === "Enter" && !item.loadingAction) {
                item.onKeyDown && item.onKeyDown()
              }
            }}
          onKeyPress={item.onKeyPress} //onKeyPress là một sự kiện bàn phím được kích hoạt khi người dùng nhấn xuống và giữ một phím
          placeholder={item.placeholder ?? ""}
          onBlur={() => item?.handleBlur && item?.handleBlur()} //Nó được kích hoạt khi người dùng rời khỏi (click ra ngoài) một phần tử tương tác như ô nhập liệu
        />
      </div>
      {!item.noTextErr && item.isError && !item.value.trim() && (<p className="error">{item.isError}</p>)}
      {item.isCharsRegex && ((item.value) && invalidCharsRegex(item.value)) && !item.noTextErr && <p className="error e_2">{error ? error : 'Vui lòng không nhập ký tự đặc biệt!'}</p>}
    </>
  );
};

export default InputForm;
