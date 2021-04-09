<template>
    <view class="he-page-content">
        <image class="he-errImage" :src="ipAddress + '/error-background.png'"></image>
        <!--#ifdef MP-->
        <view>小程序出错了，即将跳回首页({{num}}s)</view>
        <!--#endif-->
        <!--#ifdef H5-->
        <view>应用出错了，即将跳回首页({{num}}s)</view>
        <!--#endif-->
    </view>
</template>
<script>
export default {
    name: 'error',
    data() {
        return {
            num: 3
        }
    },
    mounted() {
        this.setTime();
    },
    methods: {
        setTime: function() {
            let _this = this;
            setTimeout(function() {
                _this.num = _this.num - 1;
                if (_this.num > 0) {
                    _this.setTime();
                } else {
                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }, 1000);
        }
    }
}
</script>
<style scoped>
.he-page-content {
    padding-top:378px;
    font-family: PingFang SC;
    font-size: 26px;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    text-align: center;
}
.he-errImage {
    width: 320px;
    height: 320px;
}
</style>