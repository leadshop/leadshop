<template>
    <view class="index-goods-list" :data-theme="theme">
        <scroll-view v-if="!isNothing"  :style="[style]" scroll-y @scrolltolower="scrollToLower">
            <view class="he-content he-list-a" v-if="goodsShow === 0" >
                <view class="he-item" v-for="(item, index) in list" :key="index" @click="navigateTo(item.id)">
                    <he-image :width="530" :height="530" :src="item.slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2 flex-sub">{{item.name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <view class="he-item__price">{{item.price}}</view>
                        <view class="he-cart" @click.stop="shopping(item)">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="he-content flex flex-wrap he-list-b" v-else-if="goodsShow === 1">
                <view class="he-item flex flex-direction" v-for="(item, index) in list" :key="index" @click="navigateTo(item.id)">
                    <he-image :width="256" :height="256" :src="item.slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2 flex-sub">{{item.name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <view class="he-item__price">{{item.price}}</view>
                        <view class="he-cart" @click.stop="shopping(item)">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="he-content he-list-c" v-else-if="goodsShow === 2">
                <view class="he-row" v-for="(item, index) in list" :key="index" >
                    <view class="he-item he-item-one" @click="navigateTo(item[0].id)">
                        <he-image :width="530" :height="530" :src="item[0].slideshow[0]"></he-image>
                        <view class="he-item__name he-line-2 flex-sub">{{item[0].name}}</view>
                        <view class="he-item__footer flex justify-between align-center">
                            <view class="he-item__price">{{item[0].price}}</view>
                            <view class="he-cart" @click.stop="shopping(item[0])">
                                <text class="iconfont iconbtn_addtocart"></text>
                            </view>
                        </view>
                    </view>
                    <view class="he-row__bottom flex" v-if="item.length > 1">
                        <view class="he-item he-item-two" v-if="item[1]" @click="navigateTo(item[1].id)">
                            <he-image :width="256" :height="256" :src="item[1].slideshow[0]"></he-image>
                            <view class="he-item__name he-line-2 flex-sub">{{item[1].name}}</view>
                            <view class="he-item__footer flex justify-between align-center">
                                <view class="he-item__price">{{item[1].price}}</view>
                                <view class="he-cart" @click.stop="shopping(item[1])">
                                    <text class="iconfont iconbtn_addtocart"></text>
                                </view>
                            </view>
                        </view>
                        <view class="he-item he-item-two" v-if="item[2]" @click="navigateTo(item[2].id)">
                            <he-image :width="256" :height="256" :src="item[2].slideshow[0]"></he-image>
                            <view class="he-item__name he-line-2 flex-sub">{{item[2].name}}</view>
                            <view class="he-item__footer flex justify-between align-center">
                                <view class="he-item__price">{{item[2].price}}</view>
                                <view class="he-cart" @click.stop="shopping(item[2])">
                                    <text class="iconfont iconbtn_addtocart"></text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="he-content he-list-d" v-else-if="goodsShow === 3">
                <view class="he-item flex" v-for="(item, index) in list" :key="index" @click="navigateTo(item.id)">
                    <he-image :width="240" :height="240" :src="item.slideshow[0]"></he-image>
                    <view class="flex flex-direction flex-sub">
                        <view class="he-item__name he-line-2 ">{{item.name}}</view>
                        <view class="flex-sub"></view>
                        <view class="he-item__footer flex justify-between align-center">
                            <view class="he-item__price">{{item.price}}</view>
                            <view class="he-cart" @click.stop="shopping(item)">
                                <text class="iconfont iconbtn_addtocart"></text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <he-load-more v-if="list.length > 0" :status="loadStatus"></he-load-more>
        </scroll-view>
        <he-no-content-yet v-else></he-no-content-yet>
        <he-cart :show.sync="isShopping" :goods="goods" shopping-type="cart"></he-cart>
    </view>
</template>

<script>
import heLoadMore from "@/components/he-load-more.vue";
import heNoContentYet from "@/components/he-no-content-yet.vue";
import heCart from "@/components/he-cart.vue";

export default {
    name: "index-goods-list",
    components: {
        heLoadMore,
        heNoContentYet,
        heCart,
    },
    props: {
        list: Array,
        height: [Number],
        isNothing: Boolean,
        loadStatus: String,
        goodsShow: Number
    },
    computed: {
        style: function() {
            let style = {}
            style.height = 'calc(100vh - ' + this.height +'rpx)';
            return style;
        }
    },
    data() {
        return {
            isShopping: false,
            goods: {}
        }
    },
    methods: {
        scrollToLower: function() {
            this.$h.debounce(this.$emit('scrollToLower'));
        },
        navigateTo: function(id) {
            uni.navigateTo({url: '/pages/goods/detail?id=' +id});
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
.index-goods-list {
    width: 570px;
}
.he-content {
    width: 570px;
    padding: 10px 20px 0 20px;
}
.he-item {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}
.he-item__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 1.3;
    margin: 20px 20px 8px 20px;
}
.he-item__price {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    @include font_color('font_color');
}
.he-item__price:before {
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
    bottom: 16px;
    right: 16px;
    @include font_color('font_color');
}
.he-list-a {
    .he-item {
        width: 530px;
        margin-bottom: 16px;
    }
    .he-item__footer {
        padding: 0 0 0 20px;
        height: 64px;
    }
}
.he-list-b {
    .he-item {
        width: 256px;
        margin-bottom: 16px;
    }
    .he-item:nth-child(odd) {
        margin-right: 9px;
    }
    .he-item:nth-child(even) {
        margin-left: 9px;
    }
    .he-item__footer {
        padding: 0 0 0 20px;
        height: 64px;
    }
}
.he-list-c {
    overflow: hidden;
    .he-row {
        margin-bottom: 20px;
    }
    .he-item-one {
        width: 530px;
        margin-bottom: 20px;
    }
    .he-item-two {
        width: 256px;
    }
    .he-item__footer {
        padding: 0 0 0 20px;
        height: 64px;
    }
    .he-row__bottom .he-item:first-child {
        margin-right: 16px;
    }
}
.he-list-d {
    .he-item {
        width: 530px;
        margin-bottom: 20px;
    }
    .he-item__name {
        margin: 25px 25px 0 25px;
        font-size: 28px;
    }
    .he-item__footer {
        padding: 0 0 0 20px;
        height: 64px;
    }
}
</style>
