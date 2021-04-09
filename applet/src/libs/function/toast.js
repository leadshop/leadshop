function toast(title, duration = 1500) {
    uni.showToast({
        title: title,
        icon: 'none',
        duration: duration,
        // #ifdef MP-WEIXIN
        mask: true
        // #endif
    })
}

export default toast;
