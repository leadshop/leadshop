import timeFormat from "./function/timeFormat.js";
import * as Export2Excel from "./function/Export2Excel.js";
import floatPrice from "./function/floatPrice";
const $h = {
    timeFormat: timeFormat,
    Export2Excel: Export2Excel,
    floatPrice
}

const install = Vue => {
    Vue.filter('timeFormat', (timestamp, format) => {
        return timeFormat(timestamp, format);
    });
    Vue.filter('floatPrice', (num) => {
        return floatPrice(num);
    });
    Vue.prototype.$h = $h;
}

export default {
    install
}