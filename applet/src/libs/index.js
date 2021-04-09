import mixin from './mixin/mixin.js'

import timeFormat from "./function/timeFormat.js";
import test from "./function/test.js";
import debounce from "./function/debounce.js";
import floatPrice from "./function/floatPrice";
import addUnit from './function/addUnit.js'
import guid from './function/guid.js'
import toast from './function/toast.js';
import srcToBase64 from "./function/srcToBase64";
import MPageNavigate from "./function/MPageNavigate";
// #ifdef H5
import setTabBarItem from "./function/setTabBarItem";
// #endif
const $h = {
    timeFormat: timeFormat,
    floatPrice,
    test,
    debounce,
    addUnit,
    guid,
    toast,
    srcToBase64,
    MPageNavigate,
    // #ifdef H5
    setTabBarItem
    // #endif
}

uni.$h = $h;

const install = Vue => {
    Vue.mixin(mixin);
    Vue.filter('timeFormat', (timestamp, format) => {
        return timeFormat(timestamp, format);
    });
    Vue.filter('floatPrice', (num) => {
        return floatPrice(num);
    });
    Vue.prototype.$h = $h;
    Vue.prototype.theme = '';
}

export default {
    install
}
