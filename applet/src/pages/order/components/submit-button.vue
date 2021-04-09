<template>
    <view class="submit-button safe-area-inset-bottom" :data-theme="theme">
        <view class="he-button flex justify-between align-center">
            <view class="flex align-center">
                <text class="he-number">共{{goodsNumberAmount}}件</text>
                <text class="he-text">实付金额</text>
                <text class="he-price">¥{{payAmount | floatPrice}}</text>
            </view>
            <button class="cu-btn he-submit-btn" v-if="getBasicSetting.run_status === 1" :disabled="disabled" @click.stop.once="submit">提交订单</button>
            <button class="cu-btn he-disabled" v-else-if="getBasicSetting.run_status === 0">
                已打烊
            </button>
        </view>
    </view>
</template>

<script>
export default {
    name: "submit-button",
    props: {
        goodsNumberAmount: {
            type: Number
        },
        payAmount: {
            type: Number
        },
        disabled: {
            type: Boolean
        }
    },
    methods: {
        submit: function () {
            if (this.disabled) return;
            this.$emit('submit');
        }
    }
}
</script>

<style scoped lang="scss">
.submit-button {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    background: #FFFFFF;
}
.he-button {
    height: 96px;
    padding:0 20px;
}
.he-submit-btn {
    width: 180px;
    height: 72px;
    @include background_color('background_color');
    border-radius: 36px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}
.he-submit-btn[disabled] {
    background: #CCCCCC !important;
    color: #FFFFFF;
}
.he-number {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-right: 11px;
}
.he-text {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-right: 7px;
}
.he-price {
    font-size: 32px;
    font-family: DINPro;
    font-weight: bold;
    @include font_color('font_color');
}
.he-disabled {
    width: 180px;
    height: 72px;
    background: #CCCCCC;
    border-radius: 36px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}
</style>
