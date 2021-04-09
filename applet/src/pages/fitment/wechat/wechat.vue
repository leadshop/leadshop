<template>
    <view class="le-wechat">
        <official-account></official-account>
    </view>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    components: {
        // empty
    },
    data() {
        return {

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {

    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {

    }
};
</script>
<style lang="scss" scoped="true">
.le-wechat {
    height: 170rpx;
    width: 100%;

    .le-wechat__tips {
        color: #c5c5c5;
        font-size: 20rpx;
        padding-left: 20rpx;
    }

    .le-wechat-body {
        width: 100%;
        height: 120rpx;
        position: relative;

        .le-wechat-img {
            position: absolute;
            width: 90rpx;
            height: 90rpx;
            background-color: red;
            left: 20rpx;
            top: 20rpx;
        }

        .le-wechat-title {
            position: absolute;
            width: 800rpx;
            height: 90rpx;
            left: 130rpx;
            top: 25rpx;

            .le-wechat-h3 {
                font-size: 32rpx;
                color: #000000;
            }

            .le-wechat-p {
                font-size: 24rpx;
                color: #ababab;
                line-height: 50rpx;
            }
        }

        .le-wechat-btn {
            position: absolute;
            width: 130rpx;
            height: 60rpx;
            border-radius: 8rpx;
            color: #54c856;
            border: 2px solid #54c856;
            right: 40rpx;
            bottom: 20rpx;
            text-align: center;
            line-height: 60rpx;
            font-weight: 24rpx;
        }
    }
}
</style>