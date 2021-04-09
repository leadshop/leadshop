<template>
    <view class="detail-parameter">
        <view class="he-top">
            <view class="he-item flex justify-between align-center" @click="shopping">
                <view>
                    <text class="he-item__label">规格</text>
                    <text class="he-item__value" :class="select ? '' : 'he-item__value-0'">{{select ? '已选择:' + select.param_value.split('_').join('/') : '请选择'}}</text>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
            <view class="he-item flex justify-between align-center" @click="isSd = true;">
                <view>
                    <text class="he-item__label">运费</text>
                    <text class="he-item__value" :class="shipping ? '' : 'he-item__value-0'">{{shipping ? '送至' + shipping : '请先选择配送地址'}}</text>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
            <view class="he-item flex justify-between align-center" @click="isFreeShip = true;" v-if="package.name">
                <view>
                    <text class="he-item__label">包邮</text>
                    <text class="he-item__value">{{package.name}}</text>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
        </view>
        <view class="he-bottom" v-if="services.length > 0">
            <view class="flex justify-between align-center" @click="isService = true;">
                <view class="flex flex-wrap he-bottom__item">
                    <view v-for="(item, index) in services" class="he-service" :key="index" >
                        <text class="iconfont iconproductdetails_goodsservices"></text>
                        <text class="he-item__label he-serve__value">{{item.title}}</text>
                    </view>
                </view>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
        </view>
        <detail-free-shipping v-model="isFreeShip" :unit="unit" :package="package"></detail-free-shipping>
        <detail-service v-model="isService" :list="services"></detail-service>
        <he-select-address v-model="isAddress" @select="setSelect"></he-select-address>
        <detail-shipping-address @select="selectAddress" v-model="isSd" :is-address.sync="isAddress"></detail-shipping-address>
    </view>
</template>

<script>
import detailFreeShipping from "./detail-free-shipping.vue";
import detailService from "./detail-service.vue";
import heSelectAddress from "../../../components/he-select-address.vue";
import detailShippingAddress from "./detail-shipping-address.vue";

export default {
    name: "detail-parameter",
    components: {
        detailFreeShipping,
        detailService,
        heSelectAddress,
        detailShippingAddress
    },
    props: {
        services: {
            type: Array,
            default: []
        },
        select: {
            type: Object,
            default: null
        },
        package: {
            type: Object,
            default: {}
        },
        unit: {
            type: String,
        },
        goodsId: {
            type: Number
        }
    },
    data() {
        return {
            isFreeShip: false,
            isService: false,
            isShipping: false,
            isAddress: false,
            isSd: false,
            shipping: ''
        }
    },
    methods: {
        shopping: function() {
            this.$emit('shopping');
        },
        setSelect: function(data) {
            let _this = this;
            this.$heshop.goods('get', this.goodsId, {
                "address[province]": data[0].name,
                "address[city]": data[1].name,
                "address[district]" : data[2].name
            }).then(function(res) {
                _this.shipping = data[0].name + data[1].name + data[2].name+ ' ￥' + res.freight_price;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        selectAddress: function(item) {
            let _this = this;
            this.$heshop.goods('get', this.goodsId, {
                "address[province]": item.province,
                "address[city]": item.city,
                "address[district]" : item.district
            }).then(function(res) {
                _this.shipping = item.province + item.city + item.district + ' ￥' + res.freight_price;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        }
    }
}
</script>

<style scoped>
.detail-parameter {
    margin: 20px 20px 0 20px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px 8px 24px;
}
.he-bottom {
    border-top: 1px solid #E5E5E5;
}
.iconbtn_arrow {
    font-size: 22px;
    width: 22px;
    height: 22px;
    color: RGBA(190, 190, 190, 1);
}
.he-item {
    height: 72px;
}
.he-item__label {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-item__value {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 20px;
}
.he-item__value-0 {
    color: #999999;
}
.iconproductdetails_goodsservices {
    font-size: 22px;
    color: RGBA(162, 162, 162, 1);
}
.he-serve__value {
    font-size: 22px;
    margin: 0 0 0 7px;
}
.he-service {
    margin: 10px 31px 10px 0;
    padding: 8px 0;
}
</style>