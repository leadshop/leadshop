<template>
    <view class="submit-price">
        <view class="he-item flex justify-between align-center">
            <text>商品总额</text>
            <text>¥{{goodsAmount | floatPrice}}</text>
        </view>
        <view class="he-item flex justify-between align-center">
            <text>运费{{freightAmount === 0 ? '(包邮免运费)' : ''}}</text>
            <text>¥{{freightAmount | floatPrice}}</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "submit-price",
    props: {
        goodsAmount: {
            type: Number
        },
        freightAmount: {
            type: Number
        }
    }
}
</script>

<style scoped>
.submit-price {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px;
    margin: 16px 20px 0 20px;
}
.he-item {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    height: 64px;
}
</style>