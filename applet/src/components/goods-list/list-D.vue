<template>
    <view class="list-D" :data-theme="theme">
        <view class="he-item flex" v-for="(item) in list" :key="item.id" @tap="navigateTo(item)">
            <he-image :width="240" :height="240" :src="item.slideshow[0]"></he-image>
            <view class="he-item__body flex flex-direction flex-sub">
                <view class="he-item__name  he-line-2">{{item.name}}</view>
                <view class="flex-sub"></view>
                <view class="he-item__footer flex justify-between align-center">
                    <text class="he-item__price">{{item.price}}</text>
                    <view class="he-cart" @click.stop="shopping(item)">
                        <text class="iconfont iconbtn_addtocart"></text>
                    </view>
                </view>
            </view>
        </view>
        <he-cart :show.sync="isShopping" :goods="goods" shopping-type="cart"></he-cart>
    </view>
</template>

<script>

import heCart from "@/components/he-cart.vue";

export default {
    name: "list-D",
    components: {
        heCart
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            isShopping: false,
            goods: {}
        }
    },
    methods: {
        navigateTo: function(item) {
            this.$emit('navigateTo', item);
        },
        shopping: function (item) {
            let _this = this;
            this.$heshop.goods('get', item.id, {
                type: 'param'
            }).then(function(res) {
                _this.goods = Object.assign(item, res);
                _this.isShopping = true;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        }
    }
}
</script>

<style scoped lang="scss">
.list-D {
    margin-top: 17px;
    padding: 0 20px;
}
.he-item {
    width: 710px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
}
.he-item__body {
    padding-bottom: 32px;
    height: 240px;
}
.he-item__name {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #353535;
    line-height: 1.3;
    margin: 31px 25px 0 25px
}
.he-item__footer {
    padding: 0 17px 0 25px;
}
.he-item__price {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    @include font_color('font_color');
    line-height: 1.6;
}
.he-item__price:before {
    content: "￥";
    font-size: 24px;
}
.he-cart {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 0;
    right: 0;
}
.iconbtn_addtocart {
    font-size: 36px;
    position: absolute;
    bottom: 30px;
    right: 24px;
    @include font_color('font_color');
}
</style>
