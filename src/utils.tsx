import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function getTime(time: string) {
    dayjs.extend(customParseFormat);
    return dayjs('2200','HHmm');
    // console.log(dayjs(time))
}

export {
    days,
    getTime
}