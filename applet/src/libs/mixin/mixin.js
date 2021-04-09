import {mapGetters} from "vuex";

module.exports = {
    data() {
        return {
            ipAddress: 'https://qmxq.oss-cn-hangzhou.aliyuncs.com',
        }
    },
    computed: {
        // 店铺信息
        ...mapGetters('setting', {
            storeSetting: 'storeSetting',
            getBasicSetting: 'getBasicSetting',
            goodsSetting: "goodsSetting",
            theme: 'getTheme',
            tabBar: 'getTabBar'
        }),
        isLogin: function () {
            return this.$store.state.apply.is_login;
        },
        themeColor: function() {
            let theme = {
                red_theme: '#E60B30',
                purple_theme: '#8F2DF3',
                blue_theme: '#33A7FF',
                green_theme: '#1FC551',
                orange_theme: '#FF7F00',
                golden_theme: '#CAA45A'
            }
            return theme[this.theme];
        },
        isBarGoods: function() {
            if (!this.tabBar) return;
            for (let i = 0; i < this.tabBar.length; i++) {
                if (this.tabBar[i].link.path === '/pages/goods/list') {
                    return true;
                }
            }
            return false;
        }
    },
    onLoad() {
        // getRect挂载到$h上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
        this.$h.getRect = this.$hGetRect;
    },
    methods: {
        // 查询节点信息
        // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug
        // 解决办法为在组件根部再套一个没有任何作用的view元素
        $hGetRect(selector, all) {
            return new Promise(resolve => {
                uni.createSelectorQuery().
                in(this)[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect(rect => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect)
                        }
                        if (!all && rect) {
                            resolve(rect)
                        }
                    })
                    .exec();
            });
        },
        // 报错跳转页面
        $toError: function() {
            uni.redirectTo({url: "/pages/other/error"});
        },
        $shareAppMessage: function(args) {
            args = args || {
                title: this.storeSetting.name,
                path: '/pages/index/index',
                imageUrl: this.storeSetting.logo
            }
            return args;
        },
        uniCopy: function({content, success, error}) {
            if(!content) return error('the content can not be blank');
            content = typeof content === 'string' ? content : content.toString();
            // #ifndef H5
            uni.setClipboardData({
                data: content,
                success: function() {
                    success && success("Copy successfully");
                    uni.showToast({
                        title: '内容已复制',
                        icon: 'none'
                    });
                },
                fail:function(){
                    error && error("Copy failed");
                }
            });
            // #endif

            // #ifdef H5
            if (!document.queryCommandSupported('copy')) {
                error && error('Browser does not support');
            }
            let textarea = document.createElement("textarea");
            textarea.value = content;
            textarea.readOnly = "readOnly";
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, content.length);
            let result = document.execCommand("copy");
            if(result) {
                uni.showToast({
                    title: '内容已复制',
                    icon: 'none'
                });
                success&&success("Copy successfully");
            } else {
                error&&error("Copy failed");
            }
            textarea.remove();
            // #endif
        },
        // 设置缓存
        setStorageSync: function(key, data) {
            try {
                uni.setStorageSync(key,data);
            } catch (e) {
                console.error(e);
            }
        },
        // 获取缓存
        getStorageSync: function(key) {
            try {
                return uni.getStorageSync(key);
            } catch (e) {
                console.error(e);
            }
        },
        previewImage: function () {

        }
    },
    // #ifdef MP-WEIXIN
    onShareAppMessage() {
        return this.$shareAppMessage();
    },
    onAddToFavorites() {
        return {
            title: this.storeSetting.name,
            path: '/pages/index/index',
            imageUrl: this.storeSetting.logo
        }
    },
    // #endif
}
