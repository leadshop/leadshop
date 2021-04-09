<template>
    <view class="he-page-content">
        <submit-address v-model="consigneeInfo"></submit-address>
        <submit-product :goods-data="detail.goods_data"></submit-product>
        <submit-price :goods-amount="detail.goods_amount" :freight-amount="detail.freight_amount"></submit-price>
        <submit-comments :note="note"></submit-comments>
        <view class="safe-area-inset-bottom">
            <view class="he-button-height"></view>
        </view>
        <submit-button
            @submit="submit"
            :disabled="disabled"
            :goods-number-amount="detail.goods_number_amount"
            :pay-amount="detail.pay_amount"></submit-button>
    </view>
</template>

<script>
import submitAddress from "./components/submit-address.vue";
import submitProduct from "./components/submit-product.vue";
import submitPrice from "./components/submit-price.vue";
import submitButton from "./components/submit-button.vue";
import submitComments from "./components/submit-comments.vue";

export default {
    name: "submit",
    components: {
        submitAddress,
        submitProduct,
        submitPrice,
        submitButton,
        submitComments
    },
    data() {
        return {
            detail: {
                goods_data: [],
                pay_amount: 0
            },
            goodsData:[],
            consigneeInfo: null,
            note: ''
        }
    },
    computed: {
        disabled: function() {
            let bool = false;
            this.detail.goods_data.forEach(function (item) {
                if (item.failure_reason) bool = true;
            });
            return bool;
        }
    },
    methods: {
        getPreview: function() {
            let _this = this;
            console.log('天哪')
            this.$heshop.order('post', {
                calculate: 'calculate'
            },{
                goods_data: this.goodsData,
                consignee_info: this.consigneeInfo
            }).then(function(res) {
                _this.detail = res;
            }).catch(function(err) {
               console.error(err);
            });
        },
        submit: function () {
            let _this = this;
            if (this.$h.test.isEmpty(this.consigneeInfo))
                return uni.showToast({
                    title: '收货地址不能为空',
                    icon: 'none'
                });
            this.$heshop.order('post', {
                goods_data: this.goodsData,
                consignee_info: this.consigneeInfo,
                note: this.note,
                source: 1
            }).then(function(res) {
                _this.$store.commit('cart/setCartAdd', true);
                if (res.pay_total_amount !== 0) {
                    _this.$heshop.pay({
                        order_sn: res.order_sn
                    }).then(function(data) {
                        // #ifdef MP_WEIXIN
                        uni.redirectTo({
                            url: '/pages/order/successful?order_id=' + res.order_id
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
                                uni.redirectTo({
                                    url: '/pages/order/successful?order_id=' + res.order_id
                                });
                            },
                            fail: function() {
                                _this.$toError();
                            },
                            cancel: function() {
                                uni.redirectTo({
                                    url: '/pages/order/index?tabCur=unpaid'
                                });
                            }
                        });
                        // #endif
                    }).catch(function(err) {
                        if (err.status === 403) {
                            _this.$h.toast(err.data.message);
                        }
                        if (err.errMsg === 'requestPayment:fail cancel') {
                            uni.redirectTo({url: '/pages/order/index?tabCur=unpaid'});
                        }
                    });
                } else {
                    uni.redirectTo({
                        url: '/pages/order/successful?order_id=' + res.order_id
                    });
                }
            }).catch(function(err) {
                if (err.status === 403) {
                    _this.$h.toast(err.data.message);
                    _this.$store.dispatch('setting/resetting');
                    setTimeout(function() {
                        uni.navigateBack({
                            delta: 1
                        });
                    },1000);
                } else {
                    _this.$toError();
                }
            });
        }
    },
    onLoad(options) {
        // #ifdef H5
        this.$wechat.init();
        // #endif
        this.goodsData = JSON.parse(options.data);
        this.getPreview();
    },
    onShow() {
        let address_submit = this.getStorageSync(this.$storageKey.address_submit);
        let comments_submit = this.getStorageSync(this.$storageKey.comments_submit);
        if (address_submit) {
            this.consigneeInfo = address_submit;
            this.getPreview();
            uni.removeStorageSync(this.$storageKey.address_submit);
        }
        if (comments_submit) {
            this.note = comments_submit;
            uni.removeStorageSync(this.$storageKey.comments_submit);
        }
    }
}
</script>

<style scoped>
.he-button-height {
    height: 112px;
}
</style>
