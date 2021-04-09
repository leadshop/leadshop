<script>
export default {
    globalData: {
    },
    onLaunch: function(options) {
        return new Promise(() => {
            let _this = this;
            // #ifdef H5
            _this.$h.setTabBarItem();
            // #endif
            // 获取设备设置
            this.$store.dispatch('setting/getSys');
            this.$store.dispatch('setting/getTabBar');
        });
    },
    onShow: function() {
        // 获取商城设置
        this.$store.dispatch('setting/getSetting');
        // 获取主题色
        this.$store.dispatch('setting/getTheme');
        this.$store.dispatch('user/visit');
        // #ifndef H5
        this.$store.dispatch('user/authLogin');
        // #endif
    },
    onHide: function() {
    }
}
</script>
<style lang="scss">
@import "colorui/main.css";
@import "colorui/icon.css";
@import "static/css/index.css";
@import "static/css/icon.css";
// #ifdef H5
uni-page-head {
    display: none;
}
// #endif
</style>
