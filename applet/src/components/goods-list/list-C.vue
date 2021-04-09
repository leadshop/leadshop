<template>
    <view class="list-C" :data-theme="theme" v-if="newList.length > 0">
        <view class="he-group" v-for="(item, index) in newList"  :key="index">
            <view class="he-item he-item__1" @click="navigateTo(item[0])" >
                <he-image :height="710" :width="710" :src="item[0].slideshow[0]"></he-image>
                <view class="he-item__name he-line-1">{{item[0].name}}</view>
                <view class="he-item__footer flex justify-between align-center">
                    <text class="he-item__price">{{item[0].price}}</text>
                    <view class="he-cart"  @click.stop="shopping(item[0])">
                        <text class="iconfont iconbtn_addtocart"></text>
                    </view>
                </view>
            </view>
            <view class="he-bottom flex justify-start" v-if="item.length > 1">
                <view class="he-item he-item__2  flex flex-direction" v-if="item[1]"  @click="navigateTo(item[1])">
                    <he-image :height="347" :width="347" :src="item[1].slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2">{{item[1].name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <text class="he-item__price">{{item[1].price}}</text>
                        <view class="he-cart" @click.stop="shopping(item[1])">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
                    </view>
                </view>
                <view class="he-item he-item__2 flex flex-direction" v-if="item[2]"  @click="navigateTo(item[2])">
                    <he-image :height="347" :width="347" :src="item[2].slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2 flex-sub">{{item[2].name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <text class="he-item__price">{{item[2].price}}</text>
                        <view class="he-cart" @click.stop="shopping(item[2])">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
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
    name: "list-C",
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
            oldList: [],
            newList: [],
            isShopping: false,
            goods: {}
        }
    },
    methods: {
        sliceArray: function(array) {
            this.newList.push(array.splice(0, 3));
            if (this.oldList.length > 0) {
                this.sliceArray(this.oldList);
            }
        },
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
    },
    watch: {
        list: {
            handler(newVal) {
                this.oldList = JSON.parse(JSON.stringify(newVal));
                this.newList = [];
                this.sliceArray(this.oldList);
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">
.list-C {
    padding: 0 20px;
}
.he-group {
    margin-top: 17px;
}
.he-bottom {
    margin-top: 20px;
}
.he-item {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
}
.he-item__1 {
    width: 710px;
}
.he-item__2 {
    width: 347px;
}
.he-bottom .he-item:first-child {
    margin-right: 16px;
}
.he-item__name {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #353535;
    line-height: 1.3;
    margin: 19px 26px 20px 26px;
}
.he-item__footer {
    padding: 0 18px 0 26px;
    margin-bottom: 12px;
}
.he-cart {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 0;
    bottom: 0;
}
.iconbtn_addtocart {
    font-size: 36px;
    position: absolute;
    bottom: 18px;
    right: 24px;
    @include font_color('font_color');
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
</style>
