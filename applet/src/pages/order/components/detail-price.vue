<template>
    <view class="detail-price" :data-theme="theme">
        <view class="he-item flex justify-between">
            <text class="he-label">商品总额</text>
            <text class="he-value">¥{{goodsAmount}}</text>
        </view>
        <view class="he-item flex justify-between">
            <text class="he-label">运费</text>
            <text class="he-value">¥{{freightAmount}}</text>
        </view>
        <view class="he-item flex justify-between">
            <text class="he-value">实付金额</text>
            <text class="he-value he-pay">¥{{payAmount}}</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "detail-price",
    props: {
        goodsAmount: {
            type: String,
            default: function() {
                return "";
            }
        },
        freightAmount: {
            type: String,
            default: function() {
                return "";
            }
        },
        payAmount: {
            type: String,
            default: function() {
                return "";
            }
        }
    }
}
</script>

<style scoped lang="scss">
.detail-price {
    margin-top: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 24px 8px 24px;
}
.he-item {
    font-family: PingFang SC;
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 24px;
}
.he-label {
    color: #999999;
}
.he-value {
    color: #222222;
}
.he-pay {
    font-weight: bold;
    @include font_color('font_color');
}
</style>