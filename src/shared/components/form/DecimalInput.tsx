import React from 'react';
import { Input } from 'antd';

type DecimalInputProps = {
    value: any;
    step?: number;
    min?: number;
    max?: number;
    decimal?: number
    isError?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: number | string) => void;
};

const DecimalInput: React.FC<DecimalInputProps> = ({ value, onChange, className, disabled, isError, decimal= 2, step = 0.01, min = 0, max, placeholder }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        if (newValue.includes('.')) {
            const parts = newValue.split('.');
            if (parts[1].length > decimal) {
                newValue = `${parts[0]}.${parts[1].slice(0, decimal)}`;
            }
        }
        const parsedValue = parseFloat(newValue);
        if (!isNaN(parsedValue)) {
            onChange(newValue || "");
        } else {
            onChange("")
        }
    };

    return (
        <Input
            type="number"
            value={value} disabled={disabled}
            className={`${(isError && !value) ? "border_error" : ""} ${className}`}
            onChange={handleChange}
            step={step}
            min={min} max={max}
            placeholder={placeholder}
        />
    );
};

export default DecimalInput;