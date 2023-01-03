import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function getTime(time: number) {
    return dayjs(time).format("hh:mm A");
}

export {
    days,
    getTime
}