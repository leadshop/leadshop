<template>
    <view class="detail-logistics flex align-center">
        <view class="iconfont iconorderdetails_logistics"></view>
        <text class="he-text he-company">{{freight.type === 1 ? freight.logistics_company : '无需物流'}}</text>
        <template v-if="freight.type === 1">
            <text class="he-text he-number">{{freight.freight_sn}}</text>
            <button class="cu-btn he-copy" @click="copy(freight.freight_sn)">复制</button>
        </template>
    </view>
</template>

<script>
export default {
    name: "detail-logistics",
    props: {
        freight: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    methods: {
        copy: function(content) {
            this.uniCopy({content});
        }
    }
}
</script>

<style scoped>
.detail-logistics {
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    margin-bottom: 20px;
    overflow: hidden;
    padding: 32px;
}
.iconfont {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: RGBA(215, 215, 215, 1);
}
.he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-company {
    margin-left: 26px;
}
.he-number {
    margin-left: 19px;
}
</style>