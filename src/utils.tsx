import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function getTime(time: any) {
    return dayjs(time).format("hh:mm A");
}

function convert24To12(time: any) {
    dayjs.extend(customParseFormat);
    return dayjs(time,'HHmm').format('hh:mm A');
}

export {
    days,
    getTime,
    convert24To12
}