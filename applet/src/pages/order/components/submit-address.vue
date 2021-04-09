<template>
    <view class="submit-address flex flex-direction">
        <view class="he-content flex-sub flex justify-between align-center" @tap.stop.prevent="navigateTo">
            <view class="flex align-center">
                <text class="iconfont he-content__icon iconpersonalcenter_address" v-if="consigneeInfo"></text>
                <view class="he-address-add flex justify-center align-center" v-else>
                    <text class="iconfont iconbtn_add"></text>
                </view>
                <view class="he-content__address" v-if="consigneeInfo">
                    <view class="he-name-mobile">
                        <text class="he-name">{{consigneeInfo.name}}</text>
                        <text>{{consigneeInfo.mobile}}</text>
                    </view>
                    <view class="he-address">{{consigneeInfo.province}}{{consigneeInfo.city}}{{consigneeInfo.district}}{{consigneeInfo.address}}</view>
                </view>
                <view v-else class="he-content__other">新增收货地址</view>
            </view>
            <text class="iconfont he-right iconbtn_arrow"></text>
        </view>
        <image class="he-border" :src="ipAddress + '/address-background-bar.png'"></image>
    </view>
</template>

<script>
export default {
    name: "submit-address",
    props: {
        value: {
            type: Object
        }
    },
    computed: {
        consigneeInfo: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        navigateTo: function () {
            let url = '/pages/user/shipping-address?submit=1';
            if (this.consigneeInfo) url += '&id=' + this.consigneeInfo.id;
            uni.navigateTo({url});
        },
        getDetail: function() {
            let _this = this;
            this.$heshop.address('get', {
                behavior: 'default'
            }).then(function(res) {
                if (res) _this.consigneeInfo = res;
            }).catch(function(err) {
                console.error(err);
            });
        }
    },
    mounted() {
        this.getDetail();
    }
}
</script>

<style scoped>
.submit-address {
    margin: 0 20px;
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
}
.he-content {
    padding: 36px 20px 32px 32px;
}
.he-border {
    height: 4px;
    width: 100%;
}
.he-content__icon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: RGBA(215, 215, 215, 1);
    margin-right:24px;
}
.he-right {
    width: 22px;
    height: 22px;
    font-size: 22px;
    margin-left: 24px;
}
.he-content__address {
    font-size: 26px;
    font-family: PingFang SC;
}
.he-address {
    font-weight: 500;
    color: #666666;
    line-height: 1.3;
    margin-top: 12px;
}
.he-name-mobile {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
}
.he-name {
    margin-right: 24px;
}
.he-content__other {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    margin: 20px 0;
}
.he-address-add {
    width: 34px;
    height: 34px;
    background: #D7D7D7;
    border-radius: 50%;
    margin-right: 24px;
}
.iconbtn_add {
    font-size: 16px;
    color: #FFFFFF;
    height: 16px;
    width: 16px;
}
</style>