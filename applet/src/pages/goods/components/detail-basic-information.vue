<template>
    <view :data-theme="theme">
        <view class="detail-basic-information" >
            <view class="he-top flex align-center justify-between">
                <view>
                    <text class="he-price">{{price}}</text>
                    <text class="he-old-price">¥{{linePrice}}</text>
                </view>
                <text class="fr he-sale">已售{{sales+virtual_sales}}{{unit}}</text>
            </view>
            <view class="he-bottom flex justify-between">
                <text class="he-name he-line-2">{{name}}</text>
                <view class="he-share flex flex-direction align-center justify-between" @click="show = true">
                    <view class="iconfont iconproductdetails_share"></view>
                    <text class="he-share__text" >分享</text>
                </view>
            </view>
        </view>
        <he-share v-model="show" :goods="goods" :goods-id="goodsId"></he-share>
    </view>
</template>

<script>
import heShare from "../../../components/he-share.vue";

export default {
    name: "detail-basic-information",
    components: {
        heShare,
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: ''
        },
        linePrice: {
            type: String,
            default: ''
        },
        sales: {
            type: Number,
            default: 0
        },
        virtual_sales: {
            type: Number,
            default: 0
        },
        goodsId: {
            type: Number,
            default: function() {
                return 0;
            }
        },
        goods: {
            type: Object
        }
    },
    data() {
        return {
            show: false,
            list: []
        }
    },
    methods: {

    },

}
</script>

<style scoped lang="scss">
.detail-basic-information {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 24px 28px 24px;
    margin: 20px 20px 0 20px;
}
.he-top {
    margin-bottom: 17px;
}
.he-price {
    font-size: 40px;
    font-family: DINPro;
    font-weight: bold;
    @include font_color('font_color');
}
.he-price:before {
    content: '￥';
    font-size: 30px;
}
.he-old-price {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    text-decoration: line-through;
    color: #999999;
    margin-left: 17px;
}
.he-sale {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-name {
    font-size: 28px;
    font-family: DINPro;
    font-weight: bold;
    color: #222222;
    line-height: 36px;
    width:545px;
}
.he-share {
    width: 70px;
    //height: 64px;
}
.he-share__text {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.iconproductdetails_share {
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: RGBA(153, 153, 153, 1);
}
</style>
