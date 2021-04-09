<template>
    <view class="he-page-content" :data-theme="theme">
        <view class="he-header ">
           <view class="flex justify-center he-header__top">
               <image class="he-image" :src="ipAddress + '/success-image-order.png'"></image>
               <view class="flex flex-direction justify-center he-text">
                   <view class="he-title">订单支付成功</view>
                   <view class="he-total">￥{{totalAmount}}</view>
               </view>
           </view>
            <view class="he-header__bottom flex justify-center">
                <button class="cu-btn" @click="switchTab">返回首页</button>
                <button class="cu-btn" @click="redirectTo">查看详情</button>
            </view>
        </view>
        <view class="he-goods-list" v-if="goodsSetting.recommend_showpage.pay_success.value">
            <he-products-featured></he-products-featured>
        </view>
    </view>
</template>

<script>
import heProductsFeatured from "@/components/he-products-featured.vue";
import {mapGetters} from "vuex";

export default {
    name: "successful",
    components: {
        heProductsFeatured
    },
    data() {
        return {
            totalAmount: 0,
            orderId: null
        }
    },
    computed: {
        ...mapGetters('setting', {
            goodsSetting: 'goodsSetting'
        }),
    },
    onLoad(options) {
        this.orderId = options.order_id;
        this.getOrder(parseInt(options.order_id));
    },
    methods: {
        switchTab: function() {
            uni.switchTab({
                url: '/pages/index/index'
            });
        },
        redirectTo: function() {
            uni.redirectTo({
                url: '/pages/order/detail?id=' + this.orderId
            });
        },
        getOrder: function(id) {
            let _this = this;
            this.$heshop.order('get', id).then(function(res) {
                _this.totalAmount = res.pay_amount;
            });
        }
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    background-color: #FFFFFF;
}
.he-header {
    width: 750px;
    height: 380px;
    background: #FFFFFF;
    overflow: hidden;
}
.he-image {
    width: 156px;
    height: 156px;
    display: block;
    margin-right: 24px;
}
.he-text {
    margin-left: 24px;
}
.he-title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
    margin-bottom: 5px;
}
.he-total {
    font-size: 32px;
    font-family: DINPro;
    font-weight: bold;
    @include font_color('font_color');
    line-height: 1.3;
    margin-top: 5px;
}
.he-header__top {
    margin-top: 56px;
}
.he-header__bottom {
    margin-top: 48px;
}
.cu-btn{
    width: 190px;
    height: 64px;
    border-radius: 32px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    background-color: #FFFFFF;
}
.cu-btn:first-child {
    border: 1px solid #CCCCCC;
    color: #222222;
    margin-right: 20px;
}
.cu-btn:last-child {
    border-style: solid;
    border-width: 1px;
    @include font_color('font_color');
    @include border_color('border_color');
    margin-left: 20px;
}
.he-goods-list {
    border-radius: 16px 16px 0 0;
    background-color: #F5F5F5;
    overflow: hidden;
}
</style>