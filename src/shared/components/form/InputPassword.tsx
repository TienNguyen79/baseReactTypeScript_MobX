import { Input } from "antd";
import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface IProps {
  value: any;
  onChange?: any;
  isError?: any;
  type?: any;
  disabled?: any;
  noTextErr?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?:number,
  onKeyDown?: () => void
}

const InputPass = (item: IProps) => {
  return (
    <>
      <div className="input-group">
        <Input.Password
          value={item.value} maxLength={item.maxLength ?? 50}
          onChange={(e: any) => item.onChange(e)}
          disabled={item.disabled}
          className={`${item.isError && !item.value ? "border_error" : ""} ${
            item.className
          }`}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              item.onKeyDown && item.onKeyDown()
            }
          }}
          placeholder={item.placeholder ?? ""}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>
      {!item.noTextErr && item.isError && !item.value && (
        <p className="error">{item.isError}</p>
      )}
    </>
  );
};

export default InputPass;
