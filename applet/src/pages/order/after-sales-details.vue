<template>
    <view class="he-page-content" :data-theme="theme"  :class="loading ? 'flex justify-center align-center' : ''">
        <he-loading size="50" mode="flower" v-if="loading"></he-loading>
        <template v-if="!loading">
            <view class="he-header he-box">
                <view class="he-top">{{detail.status | getStatusText(detail)}}</view>
                <view class="he-bottom" v-if="detail.status !== 100 && detail.status !== 102">{{detail.status | getStatusTime(detail)}}</view>
            </view>
            <!--退货物流-->
            <view v-if="detail.status == 122 || detail.status == 132" class="he-return-flow he-box">
                <view class="he-top">退货物流</view>
                <view class="he-body flex align-center">
                    <text class="he-company">{{detail.user_freight_info.logistics_company}}</text>
                    <text>{{detail.user_freight_info.freight_sn}}</text>
                    <button class="cu-btn he-copy" @click="copy(detail.user_freight_info.freight_sn)">复制</button>
                </view>
            </view>
            <!--退货地址-->
            <view v-if="detail.status == 121 || detail.status == 131" class="he-return-address he-box">
                <view class="he-top">退货地址</view>
                <view class="he-body">
                    <text class="he-name">{{detail.return_address.name}}</text>
                    <text>{{detail.return_address.mobile}}</text>
                </view>
                <view class="he-footer">
                    {{detail.return_address.province}}{{detail.return_address.city}}{{detail.return_address.district}}{{detail.return_address.address}}
                </view>
            </view>
            <!--发货物流-->
            <view v-if="detail.type == 2 && detail.status == 200" class="he-return-flow he-box">
                <view class="he-top">换货物流</view>
                <view class="he-body flex align-center">
                    <text class="he-company">{{detail.merchant_freight_info.type === 1  ? detail.merchant_freight_info.logistics_company : '无物流'}}</text>
                    <template v-if="detail.merchant_freight_info.type === 1">
                        <text>{{detail.merchant_freight_info.freight_sn}}</text>
                        <button class="cu-btn he-copy" @click="copy(detail.merchant_freight_info.freight_sn)">复制</button>
                    </template>
                </view>
            </view>
            <!--拒绝理由-->
            <view class="he-reason-rejection he-box" v-if="detail.status == 101">
                <view class="he-top">拒绝理由</view>
                <view class="he-bottom">{{detail.refuse_reason}}</view>
            </view>
            <!--商品信息-->
            <view class="he-product-info he-box">
                <view class="he-top">
                    商品信息
                </view>
                <view class="he-bottom flex" @click="navigateTo('/pages/goods/detail?id=' + detail.goods.goods_id)">
                    <image class="he-image" :src="detail.goods.goods_image" />
                    <view class="he-content">
                        <view class="he-name he-line-1">{{detail.goods.goods_name}}</view>
                        <view class="he-attr">{{detail.goods.show_goods_param}}</view>
                        <view class="he-number-price">
                            <text class="he-number">x{{detail.goods.goods_number}}</text>
                            <text class="he-price">¥{{detail.goods.goods_price}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <!--订单参数-->
            <view class="he-parameter he-box">
                <view class="he-item flex align-center justify-between">
                    <view class="he-item__label">售后方式</view>
                    <view class="he-item__value">{{detail.type === 0 ? '仅退款' : detail.type === 1 ? '退货退款' : detail.type === 2 ? '换货' : '' }}</view>
                </view>
                <view class="he-item flex align-center justify-between">
                    <view class="he-item__label">{{detail.type === 2 ? '换货数量' : '退款数量'}}</view>
                    <view class="he-item__value">{{detail.return_number}}</view>
                </view>
                <template  v-if="detail.type !== 2">
                    <view class="he-item flex align-center justify-between">
                        <view class="he-item__label">退款金额</view>
                        <view class="he-item__value he-price">¥{{detail.return_amount}}</view>
                    </view>
                    <view class="he-item flex align-center justify-between">
                        <view class="he-item__label">退款原因</view>
                        <view class="he-item__value">{{detail.return_reason}}</view>
                    </view>
                </template>
                <view class="he-item-other flex justify-between" v-if="detail.user_note">
                    <view class="he-item__label flex-sub">问题描述</view>
                    <view class="he-item__value flex-treble flex justify-end">
                        <text>{{detail.user_note}}</text>
                    </view>
                </view>
            </view>
            <!--凭证图片-->
            <view class="he-voucher-picture he-box" v-if="detail.images.length > 0">
                <view class="he-top">凭证图片</view>
                <view class="he-bottom flex">
                    <image class="he-image" @click="$utils.doPreviewImage(item, detail.images)" :src="item" v-for="(item, index) in detail.images" :key="index"></image>
                </view>
            </view>
            <!--订单信息-->
            <view class="he-order-info he-box">
                <view class="he-top">
                    <view class="he-item flex align-center justify-between">
                        <view class="he-item__label">售后订单号</view>
                        <view class="flex align-center">
                            <view class="he-item__value">{{detail.after_sn}}</view>
                            <button class="cu-btn he-copy" @click="copy(detail.after_sn)">复制</button>
                        </view>
                    </view>
                    <view class="he-item flex align-center justify-between">
                        <view class="he-item__label">申请时间</view>
                        <view class="he-item__value">{{detail.created_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}</view>
                    </view>
                    <view class="he-item flex align-center justify-between" v-if="detail.audit_time">
                        <view class="he-item__label">审核时间</view>
                        <view class="he-item__value">{{detail.audit_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}</view>
                    </view>
                    <view class="he-item flex align-center justify-between" v-if="detail.return_time && (detail.type === 1 || detail.type === 0)">
                        <view class="he-item__label">退款时间</view>
                        <view class="he-item__value">{{detail.return_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}</view>
                    </view>
                    <view class="he-item flex align-center justify-between" v-if="detail.exchange_time && detail.type === 2">
                        <view class="he-item__label">换货时间</view>
                        <view class="he-item__value">{{detail.exchange_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}</view>
                    </view>
                </view>
                <view class="he-bottom flex justify-between">
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
            <template v-if="isBottom">
                <!--空格-->
                <view class="safe-area-inset-bottom">
                    <view class="he-bottom-height"></view>
                </view>
                <!--操作-->
                <view class="he-bottom-btn safe-area-inset-bottom">
                    <view class="he-height flex justify-end">
                        <button class="cu-btn" v-if="detail.status === 100 || detail.status === 102" @click="isApplication = true;">撤回申请</button>
                        <button class="cu-btn" v-if="detail.status === 101" @click="reapply">再次申请</button>
                        <button class="cu-btn he-btn" v-if="detail.status === 121 || detail.status === 131" @tap="redirectTo('/pages/order/fill-return-information?id='+detail.id)">填写退货信息</button>
                    </view>
                </view>
                <after-sales-detail-application v-model="isApplication" :detail-id="detail.id" @submit="cancelAfter"></after-sales-detail-application>
            </template>
        </template>
    </view>
</template>

<script>
import afterSalesDetailApplication from "./components/afterSalesDetail-application.vue";
import heLoading from "@/components/he-loading.vue";

export default {
    name: "after-sale-details",
    components: {
        afterSalesDetailApplication,
        heLoading
    },
    data() {
        return {
            detail: {},
            isApplication: false,
            loading: true
        }
    },
    computed: {
        isBottom: function () {
            let status = this.detail.status;
            return status === 100 || status === 101 || status === 102 || status === 121 || status === 131;
        }
    },
    onLoad(options) {
        this.getDetail(parseInt(options.id), options.behavior ? {
            behavior: options.behavior
        }: {});
    },
    methods: {
        cancelAfter:function(id){
            let _this = this;
            this.$heshop.orderafter("put", {id,behavior:'cancel'}).then(function() {
                //撤回售后相当于删除,撤回后返回列表
                _this.$store.commit('after/cancelAfter', {
                    bool: true,
                    order_id: id
                });
                uni.navigateBack({
                    delta: 1
                });
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        reapply:function(){
            let _this = this;
            this.$heshop.orderafter("post", this.detail).then(function(res) {
                _this.detail.status = res.status;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        navigateTo: function(url) {
            uni.navigateTo({url: url});
        },
        getDetail: function(id, behavior) {
            let _this = this;
            this.$heshop.orderafter("get", id, behavior).then(function(res) {
                _this.detail = res;
                _this.loading = false;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        makePhoneCall: function() {
            uni.makePhoneCall({
                phoneNumber: this.storeSetting.phone
            });
        },
        copy: function(content) {
            this.uniCopy({content});
        },
        redirectTo:function (url) {
            uni.redirectTo({
                url: url
            });
        }
    },
    filters: {
        getStatusText: function (status, detail) {
            let str = "";
            let type = detail.type;
            switch(status) {
                case 100:
                    str = "待卖家审核";
                    break;
                case 101:
                    str = "卖家已拒绝售后申请";
                    break;
                case 102:
                    str = "待卖家审核";
                    break;
                case 111:
                    str = "售后申请已通过，等待退款";
                    break;
                case 121:
                    str = "售后申请已通过，请填写退货信息";
                    break;
                case 122:
                    str = "等待卖家收货且退款";
                    break;
                case 131:
                    str = "售后申请已通过，请填写退货信息";
                    break;
                case 132:
                    str = "等待卖家收货且发货";
                    break;
                case 200:
                    if (type === 2 ) {
                        str = "换货成功";
                    } else if (type === 0|| type === 1) {
                        str = "退款成功";
                    }
                    break;
                case 201:
                    str = "已完成(已拒绝)";
                    break;
            }
            return str;
        },
        getStatusTime: function(status, detail) {
            function getTime(dateTime) {
                if (!dateTime) return;
                return uni.$h.timeFormat(dateTime, 'yyyy-mm-dd hh:MM:ss');
            }
            switch (status) {
                case 101:
                    return getTime(detail.refuse_time);
                case 111:
                    return getTime(detail.audit_time);
                case 121:
                    return getTime(detail.audit_time);
                case 122:
                    return getTime(detail.salesexchange_time);
                case 131:
                    return getTime(detail.audit_time);
                case 132:
                    return getTime(detail.salesexchange_time);
                case 200:
                    return getTime(detail.finish_time);
                case 201:
                    return getTime(detail.finish_time);
            }

        }
    }
}
</script>

<style scoped lang="scss">
.he-image {
    display: block;
    border-radius: 8px;
}
.he-box {
    width: 710px;
    background-color: #FFFFFF;
    border-radius: 16px;
    margin-left: 20px;
    margin-right: 20px;
}
.he-box:not(:last-child) {
    margin-bottom: 16px;
}
.he-header {
    padding: 40px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-header .he-top {
    font-size: 32px;
    color: #222222;
    line-height: 1.3;
}
.he-header .he-bottom {
    font-size: 24px;
    color: #999999;
    line-height: 1.3;
    margin-top: 13px;
}
.he-return-flow {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    padding: 32px 24px;
}
.he-return-flow .he-top {
    margin-bottom: 21px;
}
.he-return-flow .he-company {
    margin-right: 20px;
}
.he-return-address {
    padding: 32px 20px;
    font-family: PingFang SC;
    font-size: 26px;
}
.he-return-address .he-top {
    font-weight: 500;
    color: #222222;
    margin-bottom: 21px;
}
.he-return-address .he-body {
    font-weight: bold;
    color: #222222;
    line-height: 1.3;
    margin-bottom: 13px;
}
.he-return-address .he-name {
    margin-right: 24px;
}
.he-return-address .he-footer {
    font-weight: 500;
    color: #666666;
    line-height: 1.3;
}
.he-reason-rejection {
    padding: 32px 24px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-reason-rejection .he-top {
    line-height: 1.3;
    margin-bottom: 21px;
}
.he-reason-rejection .he-bottom {
    line-height: 1.3;
}
.he-product-info {
    padding: 32px 24px;
}
.he-product-info .he-top {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-bottom: 32px;
}
.he-product-info .he-bottom {
    font-family: PingFang SC;
    font-weight: 500;
}
.he-product-info .he-image {
    width: 160px;
    height: 160px;
    margin-right: 24px;
}
.he-product-info .he-content {
    padding-top: 8px;
    width: 478px;
}
.he-product-info .he-name {
    font-size: 26px;
    color: #222222;
    line-height: 1.3;
    margin-bottom: 13px;
}
.he-product-info .he-attr {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-product-info .he-number-price {
    font-family: PingFang SC;
    font-weight: 500;
    margin-top: 13px;
}
.he-product-info .he-number {
    font-size: 22px;
    color: #999999;
}
.he-product-info .he-price {
    font-size: 24px;
    color: #222222;
    margin-left: 18px;
}
.he-parameter {
    padding: 20px 24px;
}
.he-parameter .he-item {
    font-family: PingFang SC;
    font-size: 26px;
    height: 50px;
}
.he-parameter .he-item-other {
    font-family: PingFang SC;
    font-size: 26px;
}
.he-parameter .he-item__label {
    font-weight: 500;
    color: #999999;
}
.he-parameter .he-item__value {
    font-weight: 500;
    color: #222222;
}
.he-parameter .he-price {
    font-weight: bold;
    color: #E60B30;
}
.he-voucher-picture {
    padding: 32px 24px;
}
.he-voucher-picture .he-top {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-voucher-picture .he-bottom {
    margin-top: 24px;
}
.he-voucher-picture .he-image {
    width: 150px;
    height: 150px;
}
.he-voucher-picture .he-image:not(:last-child) {
    margin-right: 20px;
}

.he-order-info .he-top {
    padding: 20px 24px 19px 24px;
}
.he-order-info .he-item {
    height: 50px;
}
.he-order-info .he-bottom {
    border-top: 1px solid #E5E5E5;
    height: 88px;
    position: relative;
}
.he-order-info .he-bottom .cu-btn {
    height: 88px;
    background: #FFFFFF;
    margin-left: 6px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #433F52;
}
.he-order-info .iconfont {
    width: 28px;
    height: 28px;
    font-size: 28px;
    margin-right: 6px;
    color: RGBA(67, 63, 82, 1);
}
.he-order-info .he-item__label {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-copy {
    height: 34px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 17px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    padding: 6px 14px;
    margin-left: 12px;
}
.he-order-info .he-item__value {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
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
.he-bottom-height {
    height: 96px;
}
.he-bottom-btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
}
.he-bottom-btn .he-height {
    height: 96px;
    padding: 20px;
}
.he-bottom-btn .cu-btn {
    height: 56px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 28px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-bottom-btn .he-btn {
    @include font_color('font_color');
    border-style: solid;
    border-width: 1px;
    @include border_color('border_color');
}
.he-bottom-btn .cu-btn:not(:last-child) {
    margin-right: 16px;
}
</style>
