function guid(str) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return str + "-" + (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

let timeout = null;
const debounce = function (func, wait = 500, immediate = false) {
    if (timeout !== null) clearTimeout(timeout);
    if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(function () {
            timeout = null;
        }, wait);
        if (callNow) typeof func === 'function' && func();
    } else {
        timeout = setTimeout(function () {
            typeof func === 'function' && func();
        }, wait);
    }
};

export {
    guid,
    debounce
}