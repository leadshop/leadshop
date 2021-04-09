<template>
    <view class="user-my-order ">
        <view class="he-user-top"  @click="navigateTo('/pages/order/index')">
            <text class="fl">我的订单</text>
            <text class="fr he-icon-arrow iconfont iconbtn_arrow"></text>
            <text class="fr">全部订单</text>
        </view>
        <view class="he-user-body flex">
            <view class="basis-xs flex flex-direction align-center" @click="navigateTo('/pages/order/index?tabCur=unpaid')">
                <view class="he-status-img" :style="{backgroundImage: 'url(' +ipAddress+'/user-image-unpaid.png)'}">
                    <view v-if="orderTotal.unpaid > 0" class="he-status__num">{{orderTotal.unpaid | setNum}}</view>
                </view>
                <text class="he-status-text">待付款</text>
            </view>
            <view class="basis-xs flex flex-direction align-center" @click="navigateTo('/pages/order/index?tabCur=unsent')">
                <view class="he-status-img" :style="{backgroundImage: 'url(' +ipAddress+'/user-image-unship.png)'}">
                    <view class="he-status__num" v-if="orderTotal.unsent > 0">{{orderTotal.unsent | setNum}}</view>
                </view>
                <text class="he-status-text">待发货</text>
            </view>
            <view class="basis-xs flex flex-direction align-center" @click="navigateTo('/pages/order/index?tabCur=unreceived')">
                <view class="he-status-img" :style="{backgroundImage: 'url(' +ipAddress+'/user-image-unreceipt.png)'}">
                    <view class="he-status__num" v-if="orderTotal.unreceived > 0">{{orderTotal.unreceived | setNum}}</view>
                </view>
                <text class="he-status-text">待收货</text>
            </view>
            <view class="basis-xs flex flex-direction align-center" @click="navigateTo('/pages/order/index?tabCur=noevaluate')">
                <view class="he-status-img" :style="{backgroundImage: 'url(' +ipAddress+'/user-image-evaluation.png)'}">
                    <view class="he-status__num" v-if="orderTotal.noevaluate > 0">{{orderTotal.noevaluate | setNum}}</view>
                </view>
                <text class="he-status-text">待评价</text>
            </view>
            <view class="basis-xs flex flex-direction align-center" @click="navigateTo('/pages/order/after-sales-records')">
                <view class="he-status-img" :style="{backgroundImage: 'url(' +ipAddress+'/user-image-aftersale.png)'}">
                    <view class="he-status__num" v-if="orderTotal.orderafter > 0">{{orderTotal.orderafter | setNum}}</view>
                </view>
                <text class="he-status-text">售后</text>
            </view>
        </view>
    </view>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "user-my-order",
    computed: {
        ...mapGetters({
            orderTotal: 'user/orderTotal'
        }),
    },
    methods: {
        navigateTo: function(url) {
            uni.navigateTo({url});
        }
    },
    filters: {
        setNum: function (num) {
            return num <= 99 ? num : '99+';
        }
    }
}
</script>

<style scoped lang="scss">
    .user-my-order {
        margin: -84px 20px 0 20px;
        background: #FFFFFF;
        border-radius: 16px;
        position: relative;
    }
    .he-user-top {
        height: 84px;
        line-height: 84px;
        padding: 0 24px;
    }
    .he-user-body {
        height: 158px;
    }
    .he-status-img {
        width: 64px;
        height: 64px;
        margin-top: 19px;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .he-status-text {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-top: 9px;
    }
    .he-icon-arrow {
        font-size: 22px;
    }
    .he-status__num {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #E60B30;
        border: 2px solid #FFFFFF;
        border-radius: 16px;
        font-size: 20px;
        line-height: 1;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        padding: 5px 10px;
        transform: translate(25%, -25%);
    }
</style>