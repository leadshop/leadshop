<template>
    <view class="detail-order-info">
        <view class="he-body">
            <view class="he-item flex justify-between align-center">
                <text class="he-label">订单号</text>
                <view class="align-center flex">
                    <text class="he-value">{{orderSn}}</text>
                    <button class="cu-btn he-copy" @click="copy(orderSn)">复制</button>
                </view>
            </view>
            <view class="he-item  flex justify-between align-center">
                <text class="he-label flex-sub">下单时间</text>
                <text class="he-value">{{createdTime | timeFormat('yyyy-mm-dd hh:MM:ss')}}</text>
            </view>
            <view class="he-item  flex justify-between align-center" v-if="payTime">
                <text class="he-label flex-sub">付款时间</text>
                <text class="he-value">{{payTime | timeFormat('yyyy-mm-dd hh:MM:ss')}}</text>
            </view>
            <view class="he-item  flex justify-between align-center" v-if="status >= 202">
                <text class="he-label flex-sub">发货时间</text>
                <text class="he-value">{{sendTime | timeFormat('yyyy-mm-dd hh:MM:ss')}}</text>
            </view>
            <view class="he-item  flex justify-between align-center" v-if="status >= 203">
                <text class="he-label flex-sub">收货时间</text>
                <text class="he-value">{{receivedTime | timeFormat('yyyy-mm-dd hh:MM:ss')}}</text>
            </view>
            <view class="he-item  flex justify-between align-center" v-if="status === 204">
                <text class="he-label flex-sub">完成时间</text>
                <text class="he-value">{{finishTime | timeFormat('yyyy-mm-dd hh:MM:ss')}}</text>
            </view>
            <view class="he-item flex justify-between" v-if="note">
                <text class="he-label flex-sub">买家留言</text>
                <view class="he-value flex-treble flex justify-end">
                    <text class="he-value__content">
                        {{note}}
                    </text>
                </view>
            </view>
        </view>
        <view class="he-footer flex justify-between">
            <!-- #ifndef H5 -->
            <view class="he-line"></view>
            <button class="cu-btn flex-sub he-btn__left" hover-class="" open-type="contact">
                <view class="iconfont iconproductdetails_tab_customerservice_online"></view>
                <text>联系卖家</text>
            </button>
            <!-- #endif -->
            <button class="cu-btn flex-sub he-btn__right" @click.stop="makePhoneCall">
                <view class="iconfont iconproductdetails_tab_customerservice_telephone"></view>
                <text>呼叫卖家</text>
            </button>
        </view>
    </view>
</template>

<script>

export default {
    name: "detail-order-info",
    props: {
        orderSn: String,
        createdTime: Number,
        payTime: Number,
        sendTime: Number,
        receivedTime: Number,
        finishTime: Number,
        note: String,
        status: Number
    },
    methods: {
        makePhoneCall: function() {
            uni.makePhoneCall({
                phoneNumber: this.storeSetting.phone
            });
        },
        copy: function(content) {
            this.uniCopy({content});
        }
    }
}
</script>

<style scoped>
.detail-order-info {
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    margin-top: 20px;
    overflow: hidden;
}
.he-body {
    padding: 32px 24px 0 24px;
}
.he-item {
    margin-bottom: 24px;
    font-size: 26prx;
    font-family: PingFang SC;
    font-weight: 500;
}

.he-label {
    color: #999999;
}
.he-value {
    color: #222222;
}
.he-value__content {
    text-align: left;
}
.he-footer {
    border-top: 1px solid #E5E5E5;
    height: 88px;
    position: relative;
}
.he-footer .cu-btn {
    height: 88px;
    background: #FFFFFF;
    margin-left: 6px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #433F52;
}
.he-footer .iconfont {
    width: 28px;
    height: 28px;
    font-size: 28px;
    margin-right: 6px;
    color: RGBA(67, 63, 82, 1);
}
.he-line {
    position: absolute;
    width: 1px;
    height: 40px;
    border: 1px solid #D7D7D7;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.he-btn__left {
    margin-right: 2px;
}
.he-btn__right {
    margin-left: 2px;
}
</style>
