import {timestamp2Date, timeDiffInHours} from './utils';
import {CountdownProps} from './types';
import isEqual from 'lodash.isequal';

const countdown = (params: CountdownProps) => {
    const {
        target,
        onUpdate,
        onComplete,
    } = params;

    let targetDate: Date = target instanceof Date ? target : timestamp2Date(target);

    let latest: any;

    const update = () => {
        const now = new Date();
        const targetTime = targetDate.getTime();
        const nowTime = now.getTime();
        const diff = targetTime - nowTime;

        requestAnimationFrame(() => {
            if (diff > 0) {
                const diffObj = timeDiffInHours(nowTime, targetTime);
                if (isEqual(diffObj, latest)) {
                    latest = diffObj;
                    onUpdate(diffObj);
                }
                update();
            } else if (onComplete) {
                onComplete();
            }
        });
    };

    update();
};

export default countdown;
