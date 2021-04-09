<template>
    <view class="submit-product">
        <view class="he-header">商品信息</view>
        <view class="he-product-list">
            <view class="he-item flex" v-for="(item, index) in goodsData" :key="index">
                <view class="he-item__image__box">
                    <image class="he-item__image" :src="item.goods_image"></image>
                    <view class="he-item__fail" v-if="item.failure_reason">
                        <view class="he-item__text">失效</view>
                    </view>
                </view>
                <view class="he-item__content">
                    <view class="he-item__name he-line-1">{{item.goods_name}}</view>
                    <view class="he-item__attr">{{item.show_goods_param}}</view>
                    <view class="he-item__numberPrice">
                        <text class="he-item__number">x{{item.goods_number}}</text>
                        <text class="he-item__price">¥{{item.goods_price}}</text>
                    </view>
                    <view class="he-item__fail-text">{{item.failure_reason | getFail(item.failure_number)}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "submit-product",
    props: {
        goodsData: {
            type: Array,
            default: []
        }
    },
    filters: {
        getFail: function(reason, number) {
            switch (reason) {
                case "limit":
                    return "商品限购" + number + "件";
            }
        }
    }
}
</script>

<style scoped>
.submit-product {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 24px;
    margin: 16px 20px 0 20px;
}
.he-header {
    font-family: PingFang SC;
    font-size: 26px;
    font-weight: 500;
    color: #222222;
}
.he-product-list {
    margin-top: 32px;
}
.he-item:not(:last-child) {
    margin-bottom: 32px;
}
.he-item__image {
    width: 160px;
    height: 160px;
    display: block;
}
.he-item__image__box {
    width: 160px;
    height: 160px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}
.he-item__fail {
    width: 160px;
    height: 160px;
    opacity: 0.6;
    position: absolute;
    top: 0;
    background-color: #FFFFFF;
}
.he-item__fail .he-item__text {
    width: 88px;
    height: 88px;
    background: #000000;
    opacity: 0.5;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 88px;
    text-align: center;
}
.he-item__fail-text {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #E60B30;
}
.he-item__content {
    margin-left: 24px;
    width: 478px;
}
.he-item__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
    margin-top: 8px;
}
.he-item__attr {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    white-space: normal;
    word-break:break-all;
    word-wrap: break-word;
    margin-top: 10px;
}
.he-item__numberPrice {
    margin-top: 10px;
    font-weight: 500;
    font-family: PingFang SC;
}
.he-item__number {
    font-size: 22px;
    color: #999999;
    margin-right: 22px;
}
.he-item__price {
    font-size: 24px;
    color: #222222;
}
</style>