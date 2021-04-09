<template>
    <view class="index-list" :data-theme="theme">
        <view class="he-item" v-for="(item, index) in list" :key="index"
              @click="navigateTo('/pages/order/detail?id=' + item.id)">
            <view class="he-item__header flex align-center justify-between">
                <text class="he-order__number">订单号 {{item.order_sn}}</text>
                <text class="he-order__status">{{item.status | getStatus}}</text>
            </view>
            <view class="he-item__body flex">
                <template v-if="item.goods.length > 1">
                    <scroll-view :scroll-x="true" class="he-order__scroll">
                        <view class="he-order__image" v-for="(good, goodIndex) in item.goods" :key="goodIndex">
                            <he-image
                                :image-style="{
                                    borderRadius: '8rpx'
                                }" :src="good.goods_image" :width="160" :height="160" ></he-image>
                            <view class="he-order__after" v-if="good.after_sales === 1">{{good.after | afterStatus}}</view>
                        </view>
                    </scroll-view>
                    <view class="flex-sub flex flex-direction justify-center align-center">
                        <view class="he-order__total">共{{item.goods.length}}件</view>
                        <view class="flex he-view">
                            <text class="he-order__all">全部</text>
                            <view class="iconfont iconbtn_arrow"></view>
                        </view>
                    </view>
                </template>
                <template v-else>
                    <view class="he-order__image">
                        <he-image
                              :image-style="{
                                borderRadius: '8rpx'
                            }" :src="item.goods[0].goods_image" :width="160" :height="160" ></he-image>
                        <view class="he-order__after" v-if="item.goods[0].after_sales === 1">{{item.goods[0].after | afterStatus}}</view>
                    </view>
                    <view class="flex-sub he-order__info">
                        <view class="he-order__name he-line-1">{{item.goods[0].goods_name}}</view>
                        <view class="he-order__attr he-line-2">{{item.goods[0].show_goods_param}}</view>
                        <view class="he-goods__buy">
                            <text class="he-goods__number">{{item.goods[0].goods_number}}</text>
                            <text class="he-goods__price">¥{{item.goods[0].goods_price}}</text>
                        </view>
                    </view>
                </template>
            </view>
            <view class="he-item__footer">
                <view class="he-order__price">
                    <view class="fr">
                        <text class="he-total he-light__text">合计</text>
                        <text class="he-price">¥{{item.pay_amount}}</text>
                        <text class="he-light__text">(含运费¥{{item.freight_amount}})</text>
                    </view>
                </view>
                <view class="he-order__button" v-if="(item.status === 203 && item.is_evaluate === 0) || item.status === 202 || item.status === 100">
                    <view class="fr">
                        <template v-if="item.status === 100">
                            <button class="cu-btn he-btn he-btn-0" @click.stop="setOrder(item, 'cancel')">取消订单</button>
                            <button class="cu-btn he-btn he-btn-1" v-if="getBasicSetting.run_status === 1" @click.stop="onPay(item)">立即支付</button>
                            <button class="cu-btn he-btn he-btn-3" v-else>已打样</button>
                        </template>
                        <button class="cu-btn he-btn he-btn-1" v-else-if="item.status === 202" @click.stop="setOrder(item, 'receipt')">确认收货</button>
                        <button class="cu-btn he-btn he-btn-1"
                                v-else-if="item.status === 203 && item.is_evaluate === 0"
                                @click.stop="navigateTo('/pages/order/evaluation?id=' + item.id)">评价晒单</button>
                    </view>
                </view>
            </view>
        </view>
        <after-receipt v-model="isAfterReceipt" :order-id="setItem && setItem.id"></after-receipt>
        <he-empty-popup :empty-style="{height: '146rpx', lineHeight: '146rpx'}" v-model="cancel" title="确认要取消这个订单吗？" :item="setItem" @confirm="cancelConfirm"></he-empty-popup>
        <he-empty-popup :empty-style="{height: '146rpx', lineHeight: '146rpx'}" v-model="receipt" title="确认收到货了吗？" :item="setItem" @confirm="receiptConfirm"></he-empty-popup>
    </view>
</template>

<script>
import heEmptyPopup from "../../../components/he-empty-popup.vue";
import afterReceipt from "./after-receipt.vue";

export default {
    name: "index-list",
    components: {
        heEmptyPopup,
        afterReceipt
    },
    data() {
        return {
            receipt: false,
            cancel: false,
            setItem: {},
            isAfterReceipt: false
        }
    },
    props: {
        value: {
            type: Array,
            default: function () {
                return [];
            }
        },
        tabCur: {
            type: String
        }
    },
    computed: {
        list: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        navigateTo: function(url) {
            uni.navigateTo({url});
        },
        onPay: function(value){
            let _this = this;
            this.$heshop.pay({
                order_sn:value.order_sn
            }).then(function(data){
                // #ifdef MP_WEIXIN
                value.status = 201;
                uni.navigateTo({
                    url: '/pages/order/successful?order_id=' + value.id
                });
                // #endif
                // #ifdef H5
                _this.$wechat.chooseWXPay({
                    nonceStr: data.nonceStr,
                    packAge: data.package,
                    paySign: data.paySign,
                    signType: data.signType,
                    timestamp: data.timeStamp,
                    success: function() {
                        value.status = 201;
                        uni.navigateTo({
                            url: '/pages/order/successful?order_id=' + value.id
                        });
                    },
                    fail: function() {
                        _this.$toError();
                    },
                    cancel: function() {
                    }
                });
                // #endif
            }).catch(function(err){
                if (err.status === 403) {
                    _this.$h.toast(err.data.message);
                    _this.$store.dispatch('setting/resetting');
                    setTimeout(function() {
                        uni.navigateBack({
                            delta: 1
                        });
                    },1000);
                }
            });
        },
        setOrder: function(item, key) {
            this[key] = true;
            this.setItem = item;
        },
        // 取消订单操作
        cancelConfirm: function (data) {
            let _this = this;
            this.$heshop.order('put',{
                id: data.id,
                behavior: 'cancel'
            }).then(function() {
               for (let i = 0; i < _this.list.length; i++) {
                   if (_this.list[i].id === data.id) _this.list[i].status = 101;
               }
               _this.navigateTo('/pages/order/detail?id=' + data.id);
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        // 收货订单操作
        receiptConfirm: function(data) {
            let _this = this;
            this.$heshop.order('put', {
                id: data.id,
                behavior: 'received'
            }).then(function() {
                _this.isAfterReceipt = true;
                _this.setItem = data;
                // 确认收货 unreceived 待收货栏 203 确认收货
                if (_this.tabCur === 'unreceived') {
                    for (let i = 0; i < _this.list.length; i++) {
                        if (_this.list[i].id === data.id) {
                            _this.$delete(_this.list, i);
                        }
                    }
                } else {
                    data.status = 203;
                }
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        }
    },
    filters: {
        getStatus: function (status) {
            switch (status) {
                case 100:
                    return "待买家付款";
                case 101:
                    return "已关闭";
                case 102:
                    return "已关闭";
                case 103:
                    return "已关闭";
                case 201:
                    return "待卖家发货";
                case 202:
                    return "卖家已发货";
                case 203:
                    return "交易成功";
                case 204:
                    return "已完成";
                default:
            }
        },
        afterStatus: function(after) {
            if (after.status === 200) {
                if (after.type === 0) {
                    return "已退款";
                } else if (after.type === 1) {
                    return "已退款";
                } else if (after.type === 2) {
                    return "已换货";
                }
            } else if (after.status === 101) {
                return "已拒绝";
            } else if (after.status === 201) {
                return "已拒绝";
            } else {
                return "售后中";
            }
        }
    }
}
</script>

<style scoped lang="scss">
.index-list {
    padding: 0 20px;
    margin-top: 114px;
}
.he-item {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 15px 24px 23px 24px;
    margin-bottom: 16px;
}
.he-item__header {
    height: 55px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-order__number {
    color: #666666;
}
.he-order__status {
    @include font_color('font_color');
}
.he-item__body {
    padding: 16px 0;
}
.he-order__scroll {
    width: 546px;
    height: 160px;
    white-space: nowrap;
}
.he-order__image {
    display: inline-block;
    margin-right: 12px;
    width: 160px;
    height: 160px;
    position: relative;
    .he-order__after {
        position: absolute;
        bottom: 0;
        width: 160px;
        height: 40px;
        border-radius:0 0 8px 8px;
        @include background_color("background_color");
        line-height: 40px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
    }
}
.he-order__info {
    margin-left: 12px;
    width: 478px;
}
.he-order__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
    margin-top: 9px;
}
.he-order__attr {
    font-size: 22px;
    color: #999999;
    margin-top: 12px;
}
.he-goods__buy {
    font-family: PingFang SC;
    font-weight: 500;
    margin-top:13px;
}
.he-goods__number {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-goods__number:before {
    content: "×";
}
.he-goods__price {
    font-size: 24px;
    color: #222222;
    margin-left: 22px;
}
.he-order__all {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
}
.iconbtn_arrow {
    width: 23px;
    height: 23px;
    font-size: 23px;
    line-height: 1.3;
    color: RGBA(208, 208, 208, 1);
}
.he-order__total {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #262626;
    line-height: 1.3;
    margin-bottom: 8px;
}
.he-view {
    margin-top: 8px;
}
.he-order__price {
    height: 69px;
    line-height: 69px;
    font-size: 24px;
    font-family: PingFang SC;
}
.he-total {
    display: inline-block;
    margin-right: 4px;
}
.he-price {
    font-weight: bold;
    color: #222222;
    display: inline-block;
    margin-right: 3px;
}
.he-light__text {
    font-weight: 500;
    color: #999999;
}
.he-order__button {
    height: 74px;
    line-height: 74px;
}
.he-btn {
    height: 56px;
    background: #FFFFFF;
    border-radius: 28px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    margin-left: 16px;
}
.he-btn-0 {
    border: 1px solid #CCCCCC;
    color: #222222;
}
.he-btn-1 {
    border-style: solid;
    border-width: 1px;
    @include border_color('border_color');
    @include font_color('font_color');
}
.he-btn-3 {
    width: 142px;
    height: 56px;
    background: #CCCCCC;
    border-radius: 28px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
}
</style>
