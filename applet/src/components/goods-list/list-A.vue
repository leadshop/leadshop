<template>
    <view class="list-a" :data-theme="theme">
        <view class="he-item" v-for="(item) in list" :key="item.id" @tap="navigateTo(item)">
            <he-image :width="710" :height="710" :src="item.slideshow[0]"></he-image>
            <view class="he-item__name he-line-1">{{item.name}}</view>
            <view class="flex justify-between he-footer align-center">
                <text class="he-price">{{item.price}}</text>
                <view class="he-cart" @click.stop="shopping(item)">
                    <text class="iconfont iconbtn_addtocart"></text>
                </view>
            </view>
        </view>
        <he-cart :show.sync="isShopping" :goods="goods" shopping-type="cart"></he-cart>
    </view>
</template>

<script>
import heCart from "@/components/he-cart.vue";

export default {
    name: "list-A",
    components: {
        heCart
    },
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
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
        shopping: function(item) {
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
.list-a {
    margin-top:20px;
    padding: 0 20px;
}
.he-item {
    width: 710px;
    background-color: #FFFFFF;
    margin-bottom: 13px;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
}
.he-item__name {
    width: 100%;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #353535;
    line-height: 1.3;
    padding: 0 26px;
    margin: 20px 0;
}
.he-footer {
    padding: 0 18px 0 26px;
    margin-bottom: 12px;
}
.he-price {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    @include font_color('font_color');
    line-height: 1.6;
}
.he-price:before {
    content: '￥';
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
    right: 24px;
    bottom: 18px;
    @include font_color('font_color');
}
</style>
