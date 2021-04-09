<template>
    <view class="applyDetail-description">
        <view class="he-top">
            <text class="he-title">问题描述</text>
            <text class="he-help">选填</text>
        </view>
        <view class="he-bottom">
            <textarea
                :value="value"
                @input="changeText"
                placeholder-style="font-size:26rpx;font-family: PingFang SC;font-weight: 500; color: #999999; line-height:1.3;"
                class="he-textarea" placeholder="请输入问题描述" maxlength="200"></textarea>
            <view class="he-max-number">{{ value.length }}/200</view>
        </view>
    </view>
</template>

<script>
export default {
    name: "applyDetail-description",
    props:{
        value: String
    },
    methods: {
        changeText: function (e) {
            let str = e.detail.value;
            if (str.length > 200) {
                str = str.substring(0, 200);
            }
            this.$emit('input', str);
        }
    }
}
</script>

<style scoped lang="scss">

.applyDetail-description {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding:32px 24px;
    margin-bottom: 16px;
}
.he-top {
    font-family: PingFang SC;
    font-weight: 500;
    margin-bottom: 25px;
}
.he-title {
    font-size: 26px;
    color: #222222;
    margin-right: 16px;
}
.he-help {
    font-size: 24px;
    color: #999999;
}
.he-bottom {
    width: 662px;
    height: 281px;
    border: 1px solid #E5E5E5;
    border-radius: 16px;
    padding: 24px;
    position: relative;
}
.he-textarea {
    width: 614px;
    height: 200px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
}
.he-max-number {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    position: absolute;
    right: 24px;
}
</style>