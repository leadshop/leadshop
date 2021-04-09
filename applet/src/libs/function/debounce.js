let timeout = null;

function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null) clearTimeout(timeout);
    if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(function() {
            timeout = null;
        }, wait);
        if (callNow) typeof func === 'function' && func();
    } else {
        timeout = setTimeout(function() {
            typeof func === 'function' && func();
        }, wait);
    }
}

export default debounce;
