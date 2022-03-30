import {DateValue, SimpleDate} from './types';

export const fixTimestamp = (timestamp: number | string): number => {
    return parseInt(timestamp.toString().padEnd(13, '0'), 10);
};

export const timestamp2Date = (target: number | string): Date => {
    return new Date(fixTimestamp(target));
};

export const timeStringify = (value: number): string => {
    return value.toString().padStart(2, '0');
};

export const timeSpilit = (
    value: number | string,
    stringify: boolean = false
): SimpleDate => {
    const d = timestamp2Date(value);
    let year: number | string = d.getFullYear();
    let month: number | string = d.getMonth() + 1;
    let date: number | string = d.getDate();
    let hour: number | string = d.getHours();
    let minute: number | string = d.getMinutes();
    let second: DateValue = d.getSeconds();
    if (stringify) {
        year = timeStringify(year);
        month = timeStringify(month);
        date = timeStringify(date);
        hour = timeStringify(hour);
        minute = timeStringify(minute);
        second = timeStringify(second);
    }
    return {
        year,
        month,
        date,
        hour,
        minute,
        second
    };
};

export const timeDiffInHours = (
    start: number | string,
    end: number | string
): SimpleDate => {
    const startDate = timestamp2Date(start);
    const endDate = timestamp2Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    // compute time difference in seconds
    const diffSeconds = Math.floor((diff / 1000) % 60);
    // compute time difference in minutes
    const diffMinutes = Math.floor((diff / (60 * 1000)) % 60);
    // compute time difference in hours
    const diffHours = Math.floor((diff / (60 * 60 * 1000)) % 24);
    return {
        hour: diffHours,
        minute: diffMinutes,
        second: diffSeconds
    };
};

export const clearMilliseconds = (timestamp: number | string): number => {
    return fixTimestamp(timestamp) - (fixTimestamp(timestamp) % 1000);
};
