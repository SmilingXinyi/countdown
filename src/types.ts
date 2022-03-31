export type CountdownOptions = {
    requestAnimationFrame?: Function;
};

export type CountdownProps = {
    target: Date | string | number;
    onUpdate: (curr: any) => void;
    onComplete?: () => void;
    options?: CountdownOptions;
};

export type DateValue = number | string;

export type SimpleDate = {
    year?: DateValue;
    month?: DateValue;
    date?: DateValue;
    hour: DateValue;
    minute: DateValue;
    second: DateValue;
};
