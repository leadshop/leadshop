module.exports = {
    onLoad() {
        // 设置默认的转发参数
        this.$h.mpShare = {
            title: '', // 默认为小程序名称
            path: '', // 默认为当前页面路径
            imageUrl: '' // 默认为当前页面的截图
        }
    },
    onShareAppMessage() {
        return this.$h.mpShare;
    },
    // #ifdef MP-WEIXIN
    onShareTimeline() {
        return this.$h.mpShare;
    }
    // #endif
}
