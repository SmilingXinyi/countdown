import countdown, {
    fixTimestamp,
    timestamp2Date,
    timeStringify,
    timeSpilit,
    timeDiffInHours,
    clearMilliseconds
} from '../src';

describe('The Countdown', () => {
    test('timestamps are converted to 13-digit timestamps', () => {
        expect(fixTimestamp(1546300800000)).toBe(1546300800000);
        expect(fixTimestamp(1546300800)).toBe(1546300800000);
        expect(fixTimestamp(15463008)).toBe(1546300800000);
        expect(fixTimestamp(1546300)).toBe(1546300000000);
        expect(fixTimestamp(15463)).not.toBe(1546300800000);
        expect(fixTimestamp(1546)).toBe(1546000000000);
        expect(fixTimestamp(1546)).not.toBe('1546300000000');
    });

    test('timestamps are converted to dates', () => {
        expect(timestamp2Date(1546300800000)).toBeInstanceOf(Date);
        expect(timestamp2Date(1546300800000).getTime()).toBe(1546300800000);
        expect(timestamp2Date(1546300800)).toBeInstanceOf(Date);
        expect(timestamp2Date(1546300800).getTime()).toBe(1546300800000);
        expect(timestamp2Date(15463008)).toBeInstanceOf(Date);
        expect(timestamp2Date(15463008).getTime()).toBe(1546300800000);
        expect(timestamp2Date(1546300)).toBeInstanceOf(Date);
        expect(timestamp2Date(1546300).getTime()).toBe(1546300000000);
        expect(timestamp2Date(15463)).toBeInstanceOf(Date);
        expect(timestamp2Date(15463).getTime()).toBe(1546300000000);
        expect(timestamp2Date(1546)).toBeInstanceOf(Date);
        expect(timestamp2Date(1546).getTime()).toBe(1546000000000);
        expect(timestamp2Date('15463').getTime()).toBe(1546300000000);
    });

    test('timestamps are converted to full time string filed', () => {
        expect(timeStringify(1)).toBe('01');
        expect(timeStringify(10)).toBe('10');
        expect(timeStringify(11)).toBe('11');
        expect(timeStringify(0)).toBe('00');
    });

    test('timestams are converted to a object', () => {
        expect(timeSpilit(1648598392353, true)).toEqual({
            year: '2022',
            month: '03',
            date: '30',
            hour: '07',
            minute: '59',
            second: '52'
        });

        expect(timeSpilit(1648598392353)).toEqual({
            year: 2022,
            month: 3,
            date: 30,
            hour: 7,
            minute: 59,
            second: 52
        });
    });

    test('compute the time difference return a SimpleDate', () => {
        const now = 1648602443963;
        const endTime = 1648652744904;
        const result = timeDiffInHours(now, endTime);
        expect(result.hour).toBe(13);
        expect(result.minute).toBe(58);
        expect(result.second).toBe(20);
    });

    test('clear milliseconds', () => {
        const now = 1648602443963;
        const result = clearMilliseconds(now);
        expect(result).toBe(1648602443000);
    });

    test('countdown to 4 seconds later', done => {
        const onUpdate = (curr: any) => {
            console.log(curr);
        };

        let now = Date.now();
        let future = (now += 1000 * 4);

        const onComplete = () => {
            expect(clearMilliseconds(future)).toBe(
                clearMilliseconds(Date.now())
            );
            done();
        };

        countdown({
            target: now,
            onUpdate,
            onComplete
        });
    });
});
