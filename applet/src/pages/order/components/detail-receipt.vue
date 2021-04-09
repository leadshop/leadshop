<template>
    <view class="detail-receipt flex align-center">
        <view class="he-icon iconfont iconpersonalcenter_address"></view>
        <view class="flex-sub">
            <view class="he-name-mobile">
                <text class="he-name">{{consigneeInfo.name}}</text>
                <text>{{consigneeInfo.mobile}}</text>
            </view>
            <view class="he-address">{{consigneeInfo.province}}{{consigneeInfo.city}}{{consigneeInfo.district}}{{consigneeInfo.address}}</view>
        </view>
    </view>
</template>

<script>
export default {
    name: "detail-receipt",
    props: {
        consigneeInfo: {
            type: Object,
            default: function() {
                return {
                    name: '',
                    mobile: '',
                    province: "",
                    city: "",
                    district: "",
                    address: ""
                }
            }
        }
    }
}
</script>

<style scoped>
.detail-receipt {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 36px 35px;
}
.he-icon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: RGBA(215, 215, 215, 1);
    margin-right: 21px;
}
.he-name-mobile {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 1.3;
    margin-bottom: 9px;
}
.he-name {
    margin-right:24px;
}
.he-address {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 1.3;
    margin-top: 9px;
}
</style>