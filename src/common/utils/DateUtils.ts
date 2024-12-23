import moment, {Moment} from "moment";
import {FORMAT_DATE} from "../constants/Constants";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";


class DateUtils {

    public convertTime(date: Moment): number | null {
        if (!date) return null
        else return date.set({hour: 0, minute: 0, second: 0}).unix() * 1000;
    }

    public formatTSDateTimeAtTZ(timeSecond: number, localeFormat: string = "en-US") {
        return new Date(timeSecond * 1000).toLocaleString(localeFormat);
    }


    public formatISODateTimeAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if (lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleString(localeFormat);
    }


    public formatISODateAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if (lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleDateString(localeFormat);
    }


    public formatISOTimeAtTZ(isoDate: string, localeFormat: string = "vi-VN") {
        let lastChar: string = isoDate.substr(isoDate.length - 1);
        if (lastChar !== "Z") {
            isoDate += "Z"
        }
        return new Date(isoDate).toLocaleTimeString(localeFormat);
    }

    public formatDate(timeSecond: number | null, format?: any) {
        return timeSecond ? moment(timeSecond).format(format ?? 'DD/MM/YYYY') : '';
    }

    public convertTimeLog = (time: any) => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - time;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        if (minutesDifference >= 10 * 24 * 60) {
            return `${dateUtils.formatDate(time)}`;
        } else if (minutesDifference >= 60 * 24) {
            const dayDifference = Math.floor(minutesDifference / (60 * 24));
            return `${dayDifference} ngày trước`;
        } else if (minutesDifference >= 60) {
            const hoursDifference = Math.floor(minutesDifference / 60);
            return `${hoursDifference} giờ trước`;
        } else if (minutesDifference > 0) {
            return `${minutesDifference} phút trước`;
        } else {
            return `Vừa xong`;
        }
    };


    public getLocalDateTime(_date: number | string, format: "dd_mm_yyyy" | "dd/mm/yyyy" | "dd-mm-yyyy" | "dd-mm-yyyy, hh:m_m:ss" | "dd/mm/yyyy, hh:m_m" | "yyyy-mm-dd hh:m_m:ss" | "yyyy-mm-dd" | "yyyy/mm/dd") {
        const date = new Date(_date);
        const D = date.getDate();
        const hh = date.getHours();
        const m_m = date.getMinutes();
        const ss = date.getSeconds();

        const M = date.getMonth() + 1;
        const dd = D < 10 ? "0" + D : D;
        const mm = M < 10 ? "0" + M : M;
        const min = m_m < 10 ? "0" + m_m : m_m;
        const yyyy = date.getFullYear();

        let result: string = format;
        result = result.replace("D", D.toString());
        result = result.replace("M", M.toString());
        result = result.replace("dd", dd.toString());
        result = result.replace("mm", mm.toString());
        result = result.replace("yyyy", yyyy.toString());
        result = result.replace("hh", hh.toString());
        result = result.replace("m_m", min.toString());
        result = result.replace("ss", ss.toString());

        return _date ? result : ''
    }


    public convertTimestamp(date?: Moment, isEndDate?: boolean): number {
        if (!date) return 0;

        const clonedDate = date.clone();

        if (isEndDate) {
            return clonedDate.endOf('day').unix() * 1000;
        } else {
            return clonedDate.startOf('day').unix() * 1000;
        }
    }

    public convertTimestampToTime = (timestamp: any) => {
        return format(new Date(timestamp), FORMAT_DATE.HH_mm);
    };

    public convertFormatDate = (timestamp: any, type: string = FORMAT_DATE.DD_MM_YYYY) => {
        return timestamp? moment(new Date(timestamp)).format(type) : null;
    };

    public formatMomentInOut = (value: any, inType: string = FORMAT_DATE.DD_MM_YYYY, outType: string = FORMAT_DATE.DD_MM_YYYY) => {
        return value ? moment(value, inType).format(outType) : null
    };

    //check disableTimePicker

    public checkRangePickerTime = (minDate: dayjs.Dayjs | null, maxDate: dayjs.Dayjs | null) => {
        return {
            disabledHours: () => {
                if (maxDate && minDate && maxDate.isSame(minDate, 'day')) {
                    return Array.from({length: 24}, (_, i) => i).filter(h => h < minDate.hour() || h > maxDate.hour());
                }
                if (maxDate) {
                    return Array.from({length: 24}, (_, i) => i).filter(h => h > maxDate.hour());
                }
                if (minDate) {
                    return Array.from({length: 24}, (_, i) => i).filter(h => h < minDate.hour());
                }
                return [];
            },
            disabledMinutes: (hour: number) => {
                if (minDate && maxDate && hour === minDate.hour() && hour === maxDate.hour()) {
                    return Array.from({length: 60}, (_, i) => i).filter(m => m < minDate.minute() || m > maxDate.minute());
                }
                if (minDate && hour === minDate.hour()) {
                    return Array.from({length: 60}, (_, i) => i).filter(m => m < minDate.minute());
                }
                if (maxDate && hour === maxDate.hour()) {
                    return Array.from({length: 60}, (_, i) => i).filter(m => m > maxDate.minute());
                }
                return [];
            },
            disabledSeconds: (hour: number, minute: number) => {
                if (maxDate && minDate && hour === maxDate.hour() && minute === maxDate.minute() && hour === minDate.hour() && minute === minDate.minute()) {
                    return Array.from({length: 60}, (_, i) => i).filter(s => s < minDate.second() || s > maxDate.second());
                }
                if (minDate && hour === minDate.hour() && minute === minDate.minute()) {
                    return Array.from({length: 60}, (_, i) => i).filter(s => s < minDate.second());
                }
                if (maxDate && hour === maxDate.hour() && minute === maxDate.minute()) {
                    return Array.from({length: 60}, (_, i) => i).filter(s => s > maxDate.second());
                }
                return [];
            }
        }
    }

    public convertMaxTime(date: Moment): number | null {
        if (!date) return null
        else return date.set({ hour: 23, minute: 59, second: 59 }).unix() * 1000;
    }

    public convertMaxTimeDayjs(date: Dayjs): number | null {
        if (!date) return null
        else return dayjs(date).set('hour', 23).set('minute', 59).set('second', 59).unix() * 1000;
    }
}

export const dateUtils = new DateUtils();