<template>
    <view class="detail-bottom-button safe-area-inset-bottom" :data-theme="theme">
        <view class="he-buttons flex">
            <view class="he-icon__button flex flex-direction align-center" @tap="switchTab('/pages/index/index')">
                <view class="iconfont iconnav_home_normal"></view>
                <text class="he-icon__text">首页</text>
            </view>
            <view class="he-icon__button flex flex-direction align-center" @tap="isService = !isService">
                <view class="iconfont iconproductdetails_tab_customerservice"></view>
                <text class="he-icon__text">客服</text>
            </view>
            <view class="he-icon__button flex flex-direction align-center" @tap="switchTab('/pages/cart/index')">
                <view class="iconfont iconnav_shoppingcart_normal"></view>
                <text class="he-icon__text">购物车</text>
            </view>
            <view class="flex-sub he-buy__button flex align-center" >
                <template v-if="stocks > 0">
                    <button class="cu-btn flex-sub he-button he-cart" @click="shopping('cart')">加入购物车</button>
                    <button class="cu-btn flex-sub he-button he-buy" @click="shopping('buy')">立即购买</button>
                </template>
                <button v-else class="cu-btn flex-sub he-button he-buy" disabled>商品已售罄</button>
            </view>
        </view>
        <view class="he-customer-service" v-show="isService">
            <view class="he-top flex justify-between">
                <!-- #ifndef H5 -->
                <button hover-class="" open-type="contact" show-message-card
                        :send-message-img="pic" :send-message-title="name"
                        send-message-path="/pages/goods/detail"
                        class="he-service__button he-service__btn flex flex-direction align-center justify-center">
                  <view class="iconfont iconproductdetails_tab_customerservice_online"></view>
                  <text class="he-service__text">聊天</text>
                </button>
                <!-- #endif -->
                <view class="he-service__button flex flex-direction align-center justify-center flex-sub" @click="isPhone = true;">
                    <view class="iconfont iconproductdetails_tab_customerservice_telephone"></view>
                    <text class="he-service__text">电话</text>
                </view>
            </view>
            <view class="he-bottom"></view>
        </view>
        <!--联系我们-->
        <he-tell v-model="isPhone" :phone-number="storeSetting.phone"></he-tell>
    </view>
</template>

<script>
import heTell from "@/components/he-tell.vue";

export default {
    name: "detail-bottom-button",
    props: {
        value: Boolean,
        name: String,
        slideShow: Array,
        shoppingType: String,
        stocks: Number
    },
    components: {
        heTell
    },
    computed: {
        isShopping: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        },
        pic: function () {
            return this.slideShow[0];
        }
    },
    data() {
        return {
            isService: false,
            isPhone: false
        }
    },
    methods: {
        switchTab: function(url) {
            uni.switchTab({
                url: url
            });
        },
        shopping: function(type) {
            this.$emit('update:shoppingType', type);
            this.isShopping = true;
        }
    }
}
</script>

<style scoped lang="scss">
.detail-bottom-button {
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.he-icon__button .iconfont {
    width: 38px;
    height: 38px;
    font-size: 38px;
    color: RGBA(36, 36, 36, 1);
    margin-top: 17px;
}
.he-icon__text {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-top: 6px;
}
.he-buttons {
    height: 95px;
}
.he-icon__button {
    width: 88px;
}
.he-buy__button {
    padding: 0 20px 0 4px;
}

.he-button {
    height: 72px;
    border-radius: 36px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-button:first-child {
    margin-right: 5px;
}
.he-button:last-child {
    margin-left: 5px;
}
.he-cart {
    border-style: solid;
    border-width: 2px;
    @include border_color('border_color');
    @include font_color('font_color');
    @include background_color('opacify_background_0');
}
.he-buy {
    @include background_color('background_color');
    color: #F3F5F7;
}
.he-customer-service {
    width: 188px;
    height: 100px;
    position: absolute;
    top: -112px;
    left: 39px;
}
.he-top {
    height: 96px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #FFFFFF;
    padding: 0 12px;
    position: relative;
    z-index: 1;
}
.he-service__button {
    width:80px;
    height: 96px;
}
.he-service__button .iconfont {
    width: 36px;
    height: 36px;
    font-size: 36px;
    margin-bottom: 4px;
    color: RGBA(34, 34, 34, 1);
}
.he-service__text {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-top: 4px;
}
.he-bottom {
    border-style: solid;
    border-color: #FFFFFF;
    border-width: 8px;
    position: absolute;
    border-left-color: transparent;
    border-bottom-color: transparent;
    left: 50%;
    z-index: 2;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%) rotate(135deg);
}
.he-service__btn {
    background-color: #FFFFFF;
    line-height: 1;
    padding: 0;
    margin: 0;
}
.he-service__btn:after {
    display: none;
}

.cu-btn[disabled] {
    background-color: #cccccc !important;
    opacity: 1;
    color: #FFFFFF;
}
</style>