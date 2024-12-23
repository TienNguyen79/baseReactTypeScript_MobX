class NumberUtil {

    public isValidPhone(phoneNumber: any) {
        const phoneRegex = /^\+?[0-9]{1,3}?[-. ]?\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
        return phoneRegex.test(phoneNumber);
    }

    public regexNumber(e: any) {
        let value = (e.currentTarget.value + '').trim()
        value = value.replace(/[^0-9]/g, '')
        return value
    }

    public checkPhone(value: any) {
        let check = false
        check = value && value.length > 1 && !(value.startsWith('03') || value.startsWith('08') || value.startsWith('09') || value.startsWith('05') || value.startsWith('07'));
        return check
    }


    public regexPercentage(e: any) {
        let value = (e.currentTarget.value + '').trim();

        // Loại bỏ bất kỳ ký tự nào không phải là số, dấu chấm hoặc ký tự `%`
        value = value.replace(/[^0-9.%]/g, '');

        // Loại bỏ tất cả các ký tự `%` sau ký tự `%` đầu tiên (giữ lại chỉ một ký tự `%`)
        const percentIndex = value.indexOf('%');
        if (percentIndex !== -1) {
            value = value.substring(0, percentIndex + 1);
        }

        // Đảm bảo giá trị không vượt quá 100%
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue > 100) {
            value = '100';
        }

        return Number(value);
    }

    public regexVote(e: any) {
        let value = (e.currentTarget.value + '').trim();

        // Loại bỏ bất kỳ ký tự nào không phải là số, dấu chấm hoặc ký tự `%`
        value = value.replace(/[^0-9.%]/g, '');

        // Loại bỏ tất cả các ký tự `%` sau ký tự `%` đầu tiên (giữ lại chỉ một ký tự `%`)
        const percentIndex = value.indexOf('%');
        if (percentIndex !== -1) {
            value = value.substring(0, percentIndex + 1);
        }

        const numericValue = parseFloat(value);

        // Đảm bảo giá trị không nhỏ hơn 1
        if (!isNaN(numericValue) && numericValue < 1) {
            value = '';
        } else if (!isNaN(numericValue) && numericValue > 5) {
            value = '5';
        }

        return value;
    }

    public regexNumberValid(e: any, validNumber: any) {
        let value: any = (e.currentTarget.value + '').trim();
        value = value.replace(/[^0-9]/g, '')
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue > validNumber) {
            value = validNumber;
        }
        return value;
    }


    public regexNumberFormat(e: any) {
        let value = (e + '').trim();

        // Allow digits, dots, and a single leading minus sign
        value = value.replace(/[^0-9.-]/g, '');

        // Remove extra dots (allow only one dot in the number)
        value = value.replace(/\.(?=.*\.)|\.(?=[^0-9]*$)/g, '');

        // Ensure there is at most one minus sign at the beginning
        value = value.replace(/^-{2,}/, '-');

        // Replace any commas with dots for decimal separator
        value = value.replace(/,/g, '.');

        return value;
    }


    public regexNumberDecimal(e: any) {
        let value = (e.currentTarget.value + '').trim()
        value = value.replace(/[^0-9.,]/g, '')
        return value
    }

    public formatCurrency(number: number) {
        try {
            return number.toFixed(2);
        } catch (e) {
            return number;
        }
    }


    public number_format(number?: any, decimals?: any, dec_point?: any, thousands_sep?: any) {
        var n = number ? number : 0,
            c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point === undefined ? "." : dec_point;
        var t = thousands_sep === undefined ? "," : thousands_sep,
            s = n < 0 ? "-" : "";

        var formattedNumber = parseFloat(n = Math.abs(+n || 0).toFixed(c)).toLocaleString('en-US', {
            minimumFractionDigits: c,
            maximumFractionDigits: c
        });

        formattedNumber = formattedNumber.replace(new RegExp(`${d}00$`), "");

        var [integerPart, decimalPart] = formattedNumber.split(d);

        return s + integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, t) + (decimalPart ? d + decimalPart : "");
    }

    public number_format_negative(number?: any, decimals?: any, dec_point?: any, thousands_sep?: any) {
        if (number === '-')
            return "-"
        var n = number !== undefined ? number : 0; // Sử dụng giá trị mặc định nếu không có giá trị đầu vào
        var c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point === undefined ? "." : dec_point;
        var t = thousands_sep === undefined ? "," : thousands_sep;

        var negativeSign = n < 0 ? "-" : "";
        var formattedNumber = Math.abs(n).toFixed(c);
        var [integerPart, decimalPart] = formattedNumber.split('.');

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, t);

        var result = negativeSign + (integerPart === "0" ? "0" : "") + integerPart;

        // Kiểm tra và loại bỏ phần thập phân nếu nó là .00
        if (decimalPart && decimalPart !== "00") {
            result += d + decimalPart;
        }

        return result;
    }


    public number_format_type(value: number): string {
        let number = value

        if (!value) {
            number = 0
        }
        if (number < 1000) {
            return number?.toString();
        } else if (number < 1000000) {
            let formattedNumber = number / 1000;
            if (formattedNumber % 1 === 0) {
                return formattedNumber.toFixed(0) + "K";
            } else {
                return formattedNumber.toFixed(1) + "K";
            }
        } else if (number < 1000000000) {
            let formattedNumber = number / 1000000;
            if (formattedNumber % 1 === 0) {
                return formattedNumber.toFixed(0) + "M";
            } else {
                return formattedNumber.toFixed(1) + "M";
            }
        } else {
            let formattedNumber = number / 1000000000;
            if (formattedNumber % 1 === 0) {
                return formattedNumber.toFixed(0) + "B";
            } else {
                return formattedNumber.toFixed(1) + "B";
            }
        }
    }
}

export const numberUtil = new NumberUtil();
